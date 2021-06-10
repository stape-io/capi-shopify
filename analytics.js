window.dataLayer = window.dataLayer || [];

var patchedTrack =  function(type, data, eventId) {    
    if (!eventId) {
        eventId = Math.random().toString(36).substr(2, 9) + '_' + Math.random().toString(36).substr(2, 9) +'_' + Math.random().toString(36).substr(2, 9);
    }
    
    if (type === 'Viewed Product' || type === 'Added Product') {
        var dataLayerData = data;  

        dataLayerData.content_type = data.productId ? 'product_group' : 'product';
        dataLayerData.event_id = eventId;
        dataLayerData.event = type;

        dataLayer.push(dataLayerData);
    }

    window.ShopifyAnalytics.lib.track2(type, data, eventId);
};

function patchTrack() {
    if (window.ShopifyAnalytics &&
        window.ShopifyAnalytics.lib &&
        window.ShopifyAnalytics.meta &&
        window.ShopifyAnalytics.lib.track != patchedTrack) {

        if (typeof(window.ShopifyAnalytics.lib.track2) === 'undefined') {
            window.ShopifyAnalytics.lib.track2 = window.ShopifyAnalytics.lib.track;

            dataLayer.push({
                'event': 'page_view_gtm',
                'event_id': window.ShopifyAnalytics.meta.page_view_event_id,
                'currency': window.ShopifyAnalytics.meta.currency,
                'page_type': window.ShopifyAnalytics.meta.page ? window.ShopifyAnalytics.meta.page.pageType : '',
                'customer_id': ShopifyAnalytics.meta.page.customerId ? ShopifyAnalytics.meta.page.customerId : '',
            });
        }

        window.ShopifyAnalytics.lib.track = patchedTrack;
    }
}

patchTrack();
setTimeout(patchTrack, 0);
document.patchInterval = setInterval(patchTrack , 100);
document.addEventListener("DOMContentLoaded", patchTrack);
