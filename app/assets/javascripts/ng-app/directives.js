/*
 jQuery UI Sortable plugin wrapper
 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('UpstartSales.directives', [])
  .directive('toggleContactForm', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs){
        element.click(function(){
          $('.new-contact-form').toggle("slide")
          $('.button-transform').toggle("fade")
        });
      }
    }
  })
  .directive('customerFormToggle', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs){
        element.click(function(){
          scope.newCustomerName = ""
          scope.diguest
          $('.hidden-cust-form').toggle("slide");
          $('#new-customer-name').focus();
        });
      }
    }
  })
  .directive('toggleAccordion', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs){
        element.click(function(){
          $(element).parents('.panel-heading').siblings('.panel-body').slideToggle(300);
        });
      }
    }
  })
  .directive('uiSortable', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs){
        element.sortable({
          connectWith: ".connectedSortable",
          grid: [ 3, 3 ],
          update: function(event, ui){
            var idea = $('#idea-sort').sortable('toArray');
            var contacted = $('#contacted-sort').sortable('toArray');
            var negotiation = $('#negotiation-sort').sortable('toArray');
            var active = $('#active-sort').sortable('toArray');
            var sort = {"idea":idea, "contacted":contacted, "negotiation":negotiation, "active":active}
            scope.postSort(sort)
          }
        })
      }
    }
  })
  .directive('toggleEdit', [
    function(){
      return {
        restrict: 'C',
        link: function (scope, element, attr) {
          element.bind('click',function (event) {
            $(event.target).parents('.toggle-container').find('.edit-toggle').toggle();
            $(event.target).parents('.toggle-container').find('.show-toggle').toggle();
          });
        }
      };
  }])
  .directive('fadeIn', ['$timeout',
    function($timeout){
      return {
        restrict: 'C',
        link: function (scope, element, attr) {

          scope.$watch('details_category', function(value){
            $(element).hide();
            $timeout( function(){
              $(element).fadeIn(200);
            }, 100);
          });

        }
      };
  }])
  .directive('alerts', [
    function(){
      return {
        restrict: 'E',
        template: "<div class='alert alert-{{alert.type}} text-center' role='alert' ng-repeat='alert in alerts' type='alert.type'>" +
        "{{alert.msg}}" +

        "<span class='glyphicon glyphicon-remove pull-right' style='cursor: pointer;' ng-click='alert.close()'></span></div>"
      };
  }])
  .directive('modal', function () {
    return {
      template: '<div class="modal fade">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content" ng-transclude>' +
            '</div>' +
          '</div>' +
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true){
            $(element).modal('show');
          } else {
            $(element).modal('hide');
          }
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
            $('.modal .modal-body').css('overflow-y', 'auto');
            $('.modal .modal-body').css('max-height', $(window).height() * 0.8);
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
            scope.hideModal();
          });
        });
      }
    };
  })
  .directive('ngConfirmClick', [
    function(){
      return {
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
              scope.$eval(clickAction)
            }
          });
        }
      };
  }])
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
});

