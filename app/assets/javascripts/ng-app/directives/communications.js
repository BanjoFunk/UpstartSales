angular.module('UpstartSales')
  .directive('communicationToggle', function() {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs){
        element.click(function(){
          scope.$apply(attrs.communicationToggle);
        });
      }
    }
  })
  .directive('communicationFormEscape', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 27) {  //escape
            e.stopPropagation();
            $("#communication-cancel").click()
          }
        });
      }
    }
  })
