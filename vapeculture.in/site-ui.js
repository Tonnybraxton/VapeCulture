(function () {
  'use strict';

  var CART_KEY = 'vapecultureke-demo-cart';

  function readCart() {
    try {
      var value = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount(items);
  }

  function updateCartCount(items) {
    var count = items.reduce(function (total, item) {
      return total + Number(item.quantity || 1);
    }, 0);
    document.querySelectorAll('#cart-icon-bubble').forEach(function (bubble) {
      var badge = bubble.querySelector('.cart-count-bubble');
      if (!badge && count) {
        badge = document.createElement('div');
        badge.className = 'cart-count-bubble';
        badge.innerHTML = '<span aria-hidden="true"></span><span class="visually-hidden"></span>';
        bubble.appendChild(badge);
      }
      if (!badge) return;
      badge.querySelector('[aria-hidden="true"]').textContent = String(count);
      badge.querySelector('.visually-hidden').textContent = count + (count === 1 ? ' item' : ' items');
      badge.hidden = count === 0;
    });
  }

  function numberFromPrice(text) {
    var parsed = Number(String(text || '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function productFromPage(form) {
    var title = document.querySelector('.product__title h1, .product__title, main h1');
    var salePrice = document.querySelector('.price__sale .price-item--sale, .price-item--sale');
    var regularPrice = document.querySelector('.price__regular .price-item, .price-item--regular');
    var selected = document.querySelector('variant-selects select, .product-form__input select');
    var quantity = form.querySelector('input[name="quantity"]') || document.querySelector('input[name="quantity"]');
    var image = document.querySelector('.product__media-list img, .product__media img');
    var priceText = (salePrice || regularPrice || {}).textContent || '';

    return {
      id: location.pathname + '::' + (selected ? selected.value : 'default'),
      title: title ? title.textContent.trim() : document.title.split('–')[0].trim(),
      variant: selected ? selected.value : '',
      priceText: priceText.trim(),
      price: numberFromPrice(priceText),
      quantity: Math.max(1, Number(quantity ? quantity.value : 1) || 1),
      image: image ? image.currentSrc || image.src : '',
      url: location.pathname + location.search
    };
  }

  function showCartNotice(message) {
    var notice = document.querySelector('#vc-cart-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'vc-cart-notice';
      notice.className = 'vc-cart-notice';
      notice.setAttribute('role', 'status');
      var productInfo = document.querySelector('.product__info-container') || document.querySelector('main');
      productInfo.appendChild(notice);
    }
    notice.textContent = message;
  }

  function enableLocalCart() {
    function storeProduct(form, event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (form.dataset.vcAdding === 'true') return;
      form.dataset.vcAdding = 'true';
      var product = productFromPage(form);
      var cart = readCart();
      var existing = cart.find(function (item) { return item.id === product.id; });
      if (existing) existing.quantity += product.quantity;
      else cart.push(product);
      writeCart(cart);
      showCartNotice(product.title + ' added to your demo cart.');
      window.setTimeout(function () { delete form.dataset.vcAdding; }, 250);
    }

    if (document.documentElement.dataset.vcCartDelegated !== 'true') {
      document.documentElement.dataset.vcCartDelegated = 'true';
      document.addEventListener('click', function (event) {
        var button = event.target.closest('button[name="add"], .product-form__submit');
        if (!button) return;
        var form = button.closest('form');
        if (form) storeProduct(form, event);
      }, true);
    }

    document.querySelectorAll('form[action*="/cart/add"]').forEach(function (form) {
      if (form.dataset.vcCartReady === 'true') return;
      form.dataset.vcCartReady = 'true';
      function addProduct(event) {
        storeProduct(form, event);
      }
      form.addEventListener('submit', addProduct, true);
      var originalButton = form.querySelector('button[name="add"], .product-form__submit');
      if (originalButton) {
        var localButton = originalButton.cloneNode(true);
        localButton.type = 'button';
        originalButton.replaceWith(localButton);
        localButton.addEventListener('click', function (event) {
          storeProduct(form, event);
        }, true);
      }
    });
  }

  function formatMoney(value) {
    return 'KSh ' + Number(value || 0).toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function renderCartPage() {
    if (!/\/cart(?:\.html)?$/.test(location.pathname)) return;
    var main = document.querySelector('main, #MainContent');
    if (!main) return;
    var cart = readCart();
    if (!cart.length) return;

    var original = main.querySelector('.cart__warnings, .is-empty');
    if (original) original.hidden = true;
    var shell = document.createElement('section');
    shell.className = 'vc-cart-shell page-width';
    shell.innerHTML = '<div class="vc-cart-panel"><div class="vc-cart-heading"><div><p class="vc-eyebrow">YOUR SELECTION</p><h1>Your cart</h1></div><a href="collections/all.html" class="vc-text-link">Continue shopping</a></div><div class="vc-cart-items"></div><div class="vc-cart-summary"><div><span>Subtotal</span><strong class="vc-cart-total"></strong></div><p>Taxes and delivery are calculated later.</p><a class="button vc-checkout-button" href="checkout.html">Review checkout</a></div></div>';
    var list = shell.querySelector('.vc-cart-items');

    cart.forEach(function (item, index) {
      var row = document.createElement('article');
      row.className = 'vc-cart-row';
      row.innerHTML = '<a class="vc-cart-image" href="#"><img alt=""></a><div class="vc-cart-copy"><a class="vc-cart-title" href="#"></a><p class="vc-cart-variant"></p><p class="vc-cart-price"></p></div><label class="vc-cart-quantity">Quantity<input type="number" min="1" inputmode="numeric"></label><button class="vc-remove-item" type="button">Remove</button>';
      var productLink = row.querySelector('.vc-cart-title');
      var imageLink = row.querySelector('.vc-cart-image');
      productLink.href = item.url;
      imageLink.href = item.url;
      productLink.textContent = item.title;
      row.querySelector('.vc-cart-variant').textContent = item.variant;
      row.querySelector('.vc-cart-price').textContent = item.priceText || formatMoney(item.price);
      var image = row.querySelector('img');
      image.src = item.image;
      image.alt = item.title;
      var input = row.querySelector('input');
      input.value = item.quantity;
      input.setAttribute('aria-label', 'Quantity for ' + item.title);
      input.addEventListener('change', function () {
        cart[index].quantity = Math.max(1, Number(input.value) || 1);
        writeCart(cart);
        location.reload();
      });
      row.querySelector('.vc-remove-item').addEventListener('click', function () {
        cart.splice(index, 1);
        writeCart(cart);
        location.reload();
      });
      list.appendChild(row);
    });

    var total = cart.reduce(function (sum, item) {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
    shell.querySelector('.vc-cart-total').textContent = formatMoney(total);
    main.prepend(shell);
  }

  function renderCheckoutPage() {
    var list = document.querySelector('[data-vc-checkout-items]');
    if (!list) return;
    var cart = readCart();
    var total = 0;
    if (!cart.length) {
      list.innerHTML = '<div class="vc-empty-state"><p>Your demo cart is empty.</p><a class="button" href="collections/all.html">Browse products</a></div>';
      return;
    }
    cart.forEach(function (item) {
      total += Number(item.price || 0) * Number(item.quantity || 1);
      var row = document.createElement('div');
      row.className = 'vc-checkout-row';
      row.innerHTML = '<div><strong></strong><span></span></div><b></b>';
      row.querySelector('strong').textContent = item.title;
      row.querySelector('span').textContent = (item.variant ? item.variant + ' · ' : '') + 'Qty ' + item.quantity;
      row.querySelector('b').textContent = formatMoney(Number(item.price || 0) * Number(item.quantity || 1));
      list.appendChild(row);
    });
    var totalElement = document.querySelector('[data-vc-checkout-total]');
    if (totalElement) totalElement.textContent = formatMoney(total);
  }

  function makeCardsClickable() {
    document.querySelectorAll('.card-wrapper').forEach(function (card) {
      var link = card.querySelector('a.full-unstyled-link, .card__heading a, a[href*="/products/"]');
      if (!link || card.dataset.vcClickable === 'true') return;

      card.dataset.vcClickable = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', (link.textContent || link.getAttribute('aria-label') || 'View product').trim());

      card.addEventListener('click', function (event) {
        if (event.target.closest('a, button, input, select, textarea, summary')) return;
        link.click();
      });

      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') link.click();
      });
    });
  }

  function guardImages() {
    document.querySelectorAll('img').forEach(function (image) {
      var sourceSet = image.getAttribute('srcset') || '';
      if (/\[YOUR DOMAIN\]|vapecultureke\.com|myshopify\.com/i.test(sourceSet)) {
        image.removeAttribute('srcset');
      }

      image.addEventListener('error', function handleError() {
        if (image.dataset.vcRetried !== 'true' && image.getAttribute('srcset')) {
          image.dataset.vcRetried = 'true';
          image.removeAttribute('srcset');
          return;
        }
        image.classList.add('vc-image-missing');
        if (image.parentElement) image.parentElement.classList.add('vc-image-placeholder');
      });
    });
  }

  function enableSlimHeader() {
    var header = document.querySelector('.section-header');
    if (!header) return;
    header.classList.add('vc-slim-header');
    var lastY = Math.max(0, window.scrollY);
    var travel = 0;
    var pending = false;

    function reveal() {
      header.classList.remove('vc-header-hidden');
    }

    function update() {
      var y = Math.max(0, window.scrollY);
      var delta = y - lastY;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      var inUse = header.querySelector('details[open]') || header.contains(document.activeElement);
      if (y <= header.offsetHeight || inUse) reveal();
      else if (Math.abs(travel) >= 8) header.classList.toggle('vc-header-hidden', travel > 0);
      lastY = y;
      pending = false;
    }

    window.addEventListener('scroll', function () {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    header.addEventListener('focusin', reveal);
    header.addEventListener('toggle', function (event) {
      if (event.target.open) reveal();
    }, true);
    var observer = new ResizeObserver(function () {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    });
    observer.observe(header);
  }

  function initialise() {
    document.body.classList.add('vc-ready');
    enableSlimHeader();
    makeCardsClickable();
    guardImages();
    updateCartCount(readCart());
    enableLocalCart();
    renderCartPage();
    renderCheckoutPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
