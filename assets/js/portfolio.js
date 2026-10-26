(function () {
  'use strict';

  var menuButton = document.querySelector('.editorial-nav__toggle');
  var menu = document.querySelector('.editorial-nav__links');

  if (!menuButton || !menu) return;

  var sectionLinks = menu.querySelectorAll('[data-section] a');

  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.setAttribute('aria-expanded', 'false');

  menuButton.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      menu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }
  });

  if (!sectionLinks.length) return;

  var sections = Array.prototype.map.call(sectionLinks, function (link) {
    return document.getElementById(link.closest('[data-section]').getAttribute('data-section'));
  }).filter(Boolean);

  var setActiveSection = function (sectionId) {
    Array.prototype.forEach.call(sectionLinks, function (link) {
      var item = link.closest('[data-section]');
      var isActive = item.getAttribute('data-section') === sectionId;
      item.classList.toggle('selected', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  var ticking = false;
  var updateActiveSection = function () {
    var current = sections[0].id;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 230) current = section.id;
    });
    setActiveSection(current);
    ticking = false;
  };

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveSection);
      ticking = true;
    }
  }, { passive: true });

  updateActiveSection();
}());
