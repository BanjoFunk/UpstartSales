angular.module('UpstartSales')
  .directive('contactToggle', function() {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs){
        element.click(function(){
          scope.$apply(attrs.contactToggle);
        });
      }
    }
  })

