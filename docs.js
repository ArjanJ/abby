(function(window, document) {

  var header = document.querySelector('.docs-header');
  var spacer = document.querySelector('.docs-header-spacer');

  var originalOffsetTop = undefined;

  document.addEventListener('DOMContentLoaded', handleLoad);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleLoad);

  header.addEventListener('click', function() {
    console.log(originalOffsetTop);
  });

  function handleScroll() {

    var scrolled = window.pageYOffset;

    if (scrolled < originalOffsetTop && header.classList.contains('docs-header--fixed')) {
      header.classList.remove('docs-header--fixed');
      spacer.classList.remove('docs-header-spacer--active');
    }

    if (scrolled >= (originalOffsetTop) && !(header.classList.contains('docs-header--fixed'))) {
      header.classList.add('docs-header--fixed');
      spacer.classList.add('docs-header-spacer--active');
    }
  }

  function handleLoad() {
    var headerOffset = header.getBoundingClientRect();

    if (!header.classList.contains('docs-header--fixed'))
      originalOffsetTop = headerOffset.top;

    if (window.pageYOffset < originalOffsetTop && header.classList.contains('docs-header--fixed')) {
      header.classList.remove('docs-header--fixed');
      spacer.classList.remove('docs-header-spacer--active');
    }
  }

}(window, document));