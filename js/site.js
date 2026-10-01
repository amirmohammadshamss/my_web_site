/*
 * Site behaviour: section router, sticky header, mobile menu, subtitle
 * rotation and the portfolio lightbox.
 *
 * Replaces jQuery, Modernizr, Bootstrap JS, Owl Carousel, Magnific Popup,
 * jquery.hoverdir and pages-switcher.js. No dependencies.
 */

(function () {
  'use strict';

  var doc = document;

  function $(selector, context) {
    return (context || doc).querySelector(selector);
  }

  function $$(selector, context) {
    return Array.prototype.slice.call((context || doc).querySelectorAll(selector));
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


  /* ===========================================================================
   * Section router
   *
   * .pt-page sections are absolutely positioned and only .pt-page-current is
   * visible, so .subpages needs an explicit height. Transitions use the View
   * Transitions API where available and swap instantly everywhere else.
   * ======================================================================== */

  var DEFAULT_PAGE = 'home';
  var PAGE_BOTTOM_MARGIN = 50; /* .pt-page padding-bottom in main.css */

  var subpages = $('.subpages');
  var pages = $$('.pt-page');
  var navLinks = $$('.pt-trigger');
  var pageObserver = null;

  function pageById(id) {
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].dataset.id === id) {
        return pages[i];
      }
    }
    return null;
  }

  function currentPageId() {
    return (location.hash || '').replace(/^#/, '').split('/')[0];
  }

  function syncHeight() {
    var current = $('.pt-page-current');
    if (current && subpages) {
      subpages.style.height = (current.offsetHeight + PAGE_BOTTOM_MARGIN) + 'px';
    }
  }

  /* Keep the height correct as lazy images arrive or the viewport changes. */
  function observeCurrentPage() {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    if (!pageObserver) {
      pageObserver = new ResizeObserver(syncHeight);
    }
    pageObserver.disconnect();
    var current = $('.pt-page-current');
    if (current) {
      pageObserver.observe(current);
    }
  }

  function markActiveLink(id) {
    navLinks.forEach(function (link) {
      var item = link.parentElement;
      if (item) {
        item.classList.toggle('active', link.getAttribute('href') === '#' + id);
      }
    });
  }

  function swapTo(id) {
    pages.forEach(function (page) {
      page.classList.toggle('pt-page-current', page.dataset.id === id);
    });
    markActiveLink(id);
    window.scrollTo(0, 0);
    syncHeight();
    observeCurrentPage();
  }

  function goTo(id, push) {
    var target = pageById(id);
    if (!target) {
      id = DEFAULT_PAGE;
      target = pageById(id);
      if (!target) {
        return;
      }
    }

    /* Don't stack a history entry for the section we are already on. */
    if (push && currentPageId() !== id) {
      history.pushState({ page: id }, '', '#' + id);
    }

    if (target.classList.contains('pt-page-current')) {
      markActiveLink(id);
      return;
    }

    if (doc.startViewTransition && !reduceMotion.matches) {
      doc.startViewTransition(function () {
        swapTo(id);
      });
    } else {
      swapTo(id);
    }
  }

  function initRouter() {
    if (!pages.length) {
      return;
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        goTo((link.getAttribute('href') || '').replace(/^#/, ''), true);
        hideMobileMenu();
      });
    });

    window.addEventListener('popstate', function () {
      goTo(currentPageId(), false);
    });

    goTo(currentPageId(), false);
  }


  /* ===========================================================================
   * Sticky header
   * ======================================================================== */

  function initStickyHeader() {
    var header = $('.header');
    if (!header) {
      return;
    }

    var update = function () {
      header.classList.toggle('sticked', window.pageYOffset >= 20);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }


  /* ===========================================================================
   * Mobile menu
   * ======================================================================== */

  var siteHeader = $('#site_header');
  var menuToggle = $('.menu-toggle');

  function setMenuOpen(open) {
    if (!siteHeader) {
      return;
    }
    siteHeader.classList.toggle('mobile-menu-hide', !open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(open));
    }
  }

  function hideMobileMenu() {
    if (window.innerWidth < 1024) {
      setMenuOpen(false);
    }
  }

  function initMobileMenu() {
    if (!menuToggle || !siteHeader) {
      return;
    }

    menuToggle.addEventListener('click', function (event) {
      event.preventDefault();
      setMenuOpen(siteHeader.classList.contains('mobile-menu-hide'));
    });

    menuToggle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMenuOpen(siteHeader.classList.contains('mobile-menu-hide'));
      }
    });
  }


  /* ===========================================================================
   * Rotating subtitle
   * ======================================================================== */

  function initTextRotation() {
    var rotator = $('.text-rotation');
    if (!rotator) {
      return;
    }

    var items = $$('.item', rotator);
    if (!items.length) {
      return;
    }

    items.forEach(function (item, index) {
      item.classList.toggle('is-active', index === 0);
    });

    if (items.length < 2 || reduceMotion.matches) {
      return;
    }

    var index = 0;
    setInterval(function () {
      items[index].classList.remove('is-active');
      index = (index + 1) % items.length;
      items[index].classList.add('is-active');
    }, 3800);
  }


  /* ===========================================================================
   * Portfolio lightbox (native <dialog>)
   * ======================================================================== */

  function initLightbox() {
    var links = $$('a.lightbox');
    if (!links.length || typeof HTMLDialogElement === 'undefined') {
      return;
    }

    var dialog = doc.createElement('dialog');
    dialog.className = 'lightbox-dialog';
    dialog.setAttribute('aria-label', 'Portfolio image viewer');
    dialog.innerHTML =
      '<div class="lightbox-inner">' +
        '<figure class="lightbox-figure">' +
          '<img class="lightbox-image" alt="">' +
          '<figcaption class="lightbox-caption"></figcaption>' +
        '</figure>' +
      '</div>' +
      '<button type="button" class="lightbox-button lightbox-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-button lightbox-prev" aria-label="Previous image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>' +
      '</button>' +
      '<button type="button" class="lightbox-button lightbox-next" aria-label="Next image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
      '</button>';
    doc.body.appendChild(dialog);

    var image = $('.lightbox-image', dialog);
    var caption = $('.lightbox-caption', dialog);
    var index = 0;

    function render() {
      var link = links[index];
      var thumb = $('img', link);

      image.src = link.getAttribute('href');
      image.alt = thumb ? thumb.getAttribute('alt') || '' : '';
      caption.textContent = link.getAttribute('title') || '';
      caption.hidden = !caption.textContent;
    }

    function step(delta) {
      index = (index + delta + links.length) % links.length;
      render();
    }

    links.forEach(function (link, position) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        index = position;
        render();
        dialog.showModal();
      });
    });

    $('.lightbox-prev', dialog).addEventListener('click', function () {
      step(-1);
    });

    $('.lightbox-next', dialog).addEventListener('click', function () {
      step(1);
    });

    $('.lightbox-close', dialog).addEventListener('click', function () {
      dialog.close();
    });

    /* Click the backdrop (anything that is not the figure or a button). */
    dialog.addEventListener('click', function (event) {
      if (!event.target.closest('.lightbox-figure, .lightbox-button')) {
        dialog.close();
      }
    });

    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    });
  }


  /* ===========================================================================
   * Boot
   * ======================================================================== */

  initRouter();
  initStickyHeader();
  initMobileMenu();
  initTextRotation();
  initLightbox();

  window.addEventListener('resize', function () {
    hideMobileMenu();
    syncHeight();
  });

  window.addEventListener('load', function () {
    var preloader = $('.preloader');
    if (preloader) {
      preloader.classList.add('is-hidden');
      setTimeout(function () {
        preloader.remove();
      }, 600);
    }
    syncHeight();
  });
})();
