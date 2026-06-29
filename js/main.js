/**
 * 黄斌工作室 - 全局脚本
 * 功能：导航栏滚动效果、移动端菜单、高亮当前页面、滚动渐显动画（错峰延迟）
 */
(function () {
  'use strict';

  /* ===== 导航栏滚动阴影 ===== */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ===== 移动端菜单 ===== */
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== 高亮当前导航链接 ===== */
  (function () {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    var links = document.querySelectorAll('.nav-links a, .nav-mobile a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page || (page === 'index.html' && (href === './' || href === '/' || href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  })();

  /* ===== 滚动渐显动画（错峰延迟） ===== */
  var observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // 读取元素上的 data-delay 属性（毫秒），默认 0
        var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
        var el = entry.target;

        setTimeout(function () {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // 观察所有带 animate-on-scroll 的元素
  document.querySelectorAll('.animate-on-scroll').forEach(function (el, index) {
    // 如果元素没有显式设置 data-delay，按顺序自动错峰
    if (!el.hasAttribute('data-delay')) {
      el.setAttribute('data-delay', index * 100);
    }
    observer.observe(el);
  });
})();
