/**
 * 黄斌工作室 - 全局脚本
 * 功能：导航栏滚动效果、移动端菜单、高亮当前页面、滚动动画
 */
(function () {
  'use strict';

  /* ===== 导航栏滚动阴影 ===== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初始检查
  }

  /* ===== 移动端菜单 ===== */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // 点击菜单链接后自动关闭
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ===== 高亮当前页面对应的导航链接 ===== */
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

  /* ===== 滚动渐显动画 ===== */
  var observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });
})();
