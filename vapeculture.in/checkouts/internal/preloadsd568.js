
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.LxWgrnBi.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.CsrHvZjq.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.DJI1KlpU.js","/cdn/shopifycloud/checkout-web/assets/c1/browser-legacy.Q-b4gwTc.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts-legacy.DJCXF9b_.js","/cdn/shopifycloud/checkout-web/assets/c1/types-ModalOrigin-legacy.qszXsL7e.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.DgxAMH3z.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useReplaceShopPayInHistory-legacy.Cr2gNPgg.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-shared-legacy.8CEMozXm.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared-legacy.BHTxncio.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors-legacy.Dycmp9f_.js","/cdn/shopifycloud/checkout-web/assets/c1/FullScreenBackground-legacy.BKWi9APR.js","/cdn/shopifycloud/checkout-web/assets/c1/events-shared-legacy.Ql-axC5Z.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon-legacy.Bfupgm8k.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon-legacy.BbBFqdfu.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.DjJwG1ZM.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.CTCMQSqg.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer-legacy.DeE8GFFv.js","/cdn/shopifycloud/checkout-web/assets/c1/CrossBorderConsolidation-legacy.CMaGoXvq.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSubscribeMessenger-legacy.CSiD9ZbK.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy.NYfFgW2J.js","/cdn/shopifycloud/checkout-web/assets/c1/AmazonPayButton-legacy.BA_hIN4i.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad-legacy.B75p9L2v.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.C4GLC-7M.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.G8eyomdn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine-legacy.DUWnPbos.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.DwoW24L6.js","/cdn/shopifycloud/checkout-web/assets/c1/PickupPointCarrierLogo-legacy.CM0nTbTU.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.Cdg55SOc.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.rQlMIWyX.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress-legacy.emrEQ6dk.js","/cdn/shopifycloud/checkout-web/assets/c1/paypal-express-usePayPalPaymentErrorHandler-legacy.BPIHShXj.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText-legacy.CYZqL_qT.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.CROtWoiA.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer-legacy.D8S3mYqw.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.Cv-86aij.js","/cdn/shopifycloud/checkout-web/assets/c1/OrderEditVaultedDelivery-legacy.BZA5bzPq.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice-legacy.CC6DLUug.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayInstallmentsUkHoldoutExperiment-legacy.rJaqwY4U.js","/cdn/shopifycloud/checkout-web/assets/c1/Page-legacy.BAKN4PwT.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants-legacy.CqyodSdt.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.cn2vVRw9.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.CJ1kNb6f.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocationFullDetour-legacy.KCxG2l8m.js","/cdn/shopifycloud/checkout-web/assets/c1/OffsitePaymentFailed-legacy.BMgr_--b.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons-legacy.B90PdSB4.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.CteApkfQ.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions-legacy.Cvz1RwSM.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.tVru7TLY.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.lhxUW0n9.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options-legacy.lhL1-oR_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.xs_316LJ.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.BbmKx42U.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocation-legacy.1KOhiGqV.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension-legacy.FCErmckH.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions-legacy.CRLSaNIm.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets-legacy.BnQ5lpVy.js","/cdn/shopifycloud/checkout-web/assets/c1/esm-browser-v4-legacy.On_frbc2.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner-legacy.Dt-N9l93.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0599/6799/5959/files/new_logo.png"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  




