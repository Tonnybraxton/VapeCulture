(function() {
  // const BASE_URL = 'https://avada-boost-sales-staging.firebaseapp.com/scripttag'; // cdn url
  // const BASE_URL = 'https://avada-boost-sales-custom.firebaseapp.com/scripttag';
  const BASE_URL = 'https://aov-boost-sales.pages.dev/scripttag';
  const scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.async = !0;
  scriptElement.src = BASE_URL + `/avada-badgev2-main.min.js?v=${new Date().getTime()}`;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})();
