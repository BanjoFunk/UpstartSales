angular.module('UpstartSales')
  .directive('navbarTabsContainer', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.focus(function() {
          $(".navbar-tab-stop").first().focus();
        });
      }
    }
  })
  .directive('navbarTabStop', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {

          if (e.keyCode == 37) {  //left
            e.preventDefault();
            var idx = $.inArray(element[0], $('.navbar-tab-stop'))
            var newFocus = idx > 0 ? $('.navbar-tab-stop')[idx - 1] : $('.navbar-tab-stop')[idx]
            newFocus.focus();
          }
          if (e.keyCode == 39) {  //right
            e.preventDefault();
            var idx = $.inArray(element[0], $('.navbar-tab-stop'))
            var newFocus = idx < ($('.navbar-tab-stop').length - 1) ? $('.navbar-tab-stop')[idx + 1] : $('.navbar-tab-stop')[idx]
            newFocus.focus();
          }

         });
      }
    }
  })