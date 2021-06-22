window.dataLayer = window.dataLayer || [];

OriginalImage = Image;
Image = function () {
    let oi = new OriginalImage();
    oi.onload = function () {
        function getJsonFromUrl(url) {
            var query = url.substr(1);
            var result = {};
            query.split("&").forEach(function (part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        }

        if (this.src.indexOf('facebook.com/tr/') != -1) {

            var data = getJsonFromUrl(this.src);
            var type = data.ev;
            var eventId = data.eid;

            if (type === 'PageView') {
                dataLayer.push({
                    'event': 'page_view_gtm',
                    'event_id': eventId,
                    'currency': window.ShopifyAnalytics.meta.currency,
                    'page_type': window.ShopifyAnalytics.meta.page ? window.ShopifyAnalytics.meta.page.pageType : '',
                    'customer_id': ShopifyAnalytics.meta.page.customerId ? ShopifyAnalytics.meta.page.customerId : '',
                    'product': window.ShopifyAnalytics.meta.product ? window.ShopifyAnalytics.meta.product : {},
                });
            }

            if (type === 'ViewContent' || type === 'AddToCart') {
                dataLayer.push({
                    'event': type === 'ViewContent' ? 'Viewed Product' : 'Added Product',
                    'event_id': eventId,
                    'category': data['cd[content_category]'],
                    'product_name': data['cd[content_name]'],
                    'product_price': parseInt(data['cd[value]']),
                    'product_id': data['cd[content_ids]'],
                    'currency': data['cd[currency]'],
                    'content_type': data['cd[content_type]'],
                    'customer_id': ShopifyAnalytics.meta.page.customerId ? ShopifyAnalytics.meta.page.customerId : '',
                });
            }
        }
    };
    return oi;
};
