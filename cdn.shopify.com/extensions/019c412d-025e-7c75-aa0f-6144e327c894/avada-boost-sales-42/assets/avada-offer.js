(function() {
  try {
    const scripts = [
      {
        baseUrl: 'https://aov-boost-sales.pages.dev/scripttag',
        // const BASE_URL = 'https://avada-boost-sales-staging.firebaseapp.com/scripttag'; // cdn url
        // const BASE_URL = 'https://avada-boost-sales-custom.firebaseapp.com/scripttag';
        file: 'avada-offer-main.min.js'
      },
      {
        baseUrl: 'https://aov-utils.pages.dev',
        file: 'aov-util.min.js'
      }
    ];

    scripts.forEach(({baseUrl, file}) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `${baseUrl}/${file}?v=${Date.now()}`;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  } catch (error) {
    console.log(error);
  }
})();
