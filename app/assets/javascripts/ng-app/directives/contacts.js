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
  .directive('formEscape', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 27) {  //escape
            e.stopPropagation();
            $("#contact-cancel").click()
          }
        });
      }
    }
  })

