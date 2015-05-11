angular.module('UpstartSales')
  .directive('locationToggle', function() {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs){
        element.click(function(){
          scope.$apply(attrs.locationToggle);
        });
      }
    }
  })
  .directive('locationFormEscape', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 27) {  //escape
            e.stopPropagation();
            $("#location-cancel").click()
          }
        });
      }
    }
  })
