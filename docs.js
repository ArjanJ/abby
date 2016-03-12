(function(window, document) {

  var header = document.querySelector('.docs-header');

  var target = header.clientHeight;

  var breakpoint = 768;

  window.addEventListener('scroll', handleScroll);

  function handleScroll() {

    if (window.innerWidth > breakpoint) {
      var scrolled = window.pageYOffset;

      if (scrolled >= target && !(header.classList.contains('docs-header--fixed'))) {
        header.classList.add('docs-header--fixed');
      }

      if (scrolled < target && header.classList.contains('docs-header--fixed')) {
        header.classList.remove('docs-header--fixed');
      }
    }    
  }

}(window, document));

(function(window, document) {

  var hamburger = document.querySelector('.hamburger');
  var header = document.querySelector('.docs-header');
  var headerLinks = header.querySelectorAll('a');

  hamburger.addEventListener('click', hamburgerClick);
  [].slice.call(headerLinks).forEach(function(link) {
    link.addEventListener('click', closeMenu);
  })

  function hamburgerClick() {
    header.classList.toggle('docs-header--active');
  }

  function closeMenu(e) {
    if (header.classList.contains('docs-header--active')) {
      header.classList.remove('docs-header--active');
    }
  }

}(window, document));

(function() {

  'use strict';

  // Feature Test
  if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {

    // Function to animate the scroll
    var smoothScroll = function(anchor, duration) {

      // Calculate how far and how fast to scroll
      var startLocation = window.pageYOffset;
      var endLocation = anchor.offsetTop;
      var distance = endLocation - startLocation;
      var increments = distance / (duration / 16);
      var stopAnimation;

      // Scroll the page by an increment, and check if it's time to stop
      var animateScroll = function() {
        window.scrollBy(0, increments);
        stopAnimation();
      };

      // If scrolling down
      if (increments >= 0) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function() {
          var travelled = window.pageYOffset;
          if ((travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight)) {
            clearInterval(runAnimation);
          }
        };
      }
      // If scrolling up
      else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function() {
          var travelled = window.pageYOffset;
          if (travelled <= (endLocation || 0)) {
            clearInterval(runAnimation);
          }
        };
      }

      // Loop the animation function
      var runAnimation = setInterval(animateScroll, 16);

    };

    // Define smooth scroll links
    var scrollToggle = document.querySelectorAll('.scroll');

    // For each smooth scroll link
    [].forEach.call(scrollToggle, function(toggle) {

      // When the smooth scroll link is clicked
      toggle.addEventListener('click', function(e) {

        // Prevent the default link behavior
        e.preventDefault();

        // Get anchor link and calculate distance from the top
        var dataID = toggle.getAttribute('href');
        var dataTarget = document.querySelector(dataID);
        var dataSpeed = toggle.getAttribute('data-speed');

        // If the anchor exists
        if (dataTarget) {
          // Scroll to the anchor
          smoothScroll(dataTarget, dataSpeed || 500);
        }

      }, false);

    });

  }

})();