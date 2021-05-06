window.dataLayer = window.dataLayer || [];

var patchedTrack =  function(type, data, eventId) {
    if (type === 'Viewed Product' || type === 'Added Product') {
        var dataLayerData = data;

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
            });
        }

        window.ShopifyAnalytics.lib.track = patchedTrack;
    }
}

patchTrack();
setTimeout(patchTrack, 0);
document.patchInterval = setInterval(patchTrack , 100);
document.addEventListener("DOMContentLoaded", patchTrack);
