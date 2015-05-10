angular.module('UpstartSales')
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
  .directive('customerNavigation', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.focus(function() {
          $(".customer-navigation-stop").first().focus();
        });
      }
    }
  })
  .directive('customerNavigationStop', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        var updateSort = function(){
          var idea = $('#idea-sort').sortable('toArray');
          var contacted = $('#contacted-sort').sortable('toArray');
          var negotiation = $('#negotiation-sort').sortable('toArray');
          var active = $('#active-sort').sortable('toArray');
          var sort = {"idea":idea, "contacted":contacted, "negotiation":negotiation, "active":active}
          scope.postSort(sort)
        }

        element.on('click', function(e){
          element.focus();
        })
        element.keydown(function (e) {

          if (e.ctrlKey) {
            if (e.keyCode == 39) {  //right
              e.preventDefault();
              e.stopPropagation();

              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').next().find('.customer-navigation-stop')
              var newIdx = nextColumn.length > index ? index : nextColumn.length - 1

              if(nextColumn.length <= index){
                element.insertAfter(nextColumn[newIdx]);
              } else {
                element.insertBefore(nextColumn[newIdx]);
              }
              element.focus();
              updateSort()
            }
            if (e.keyCode == 37) {  //left
              e.preventDefault();
              e.stopPropagation();

              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').prev().find('.customer-navigation-stop')
              var newIdx = nextColumn.length > index ? index : nextColumn.length - 1
              element.insertBefore(nextColumn[newIdx]);
              element.focus();
              updateSort()
            }

            if (e.keyCode == 38) {  //up
              e.preventDefault();
              element.insertBefore(element.prev());
              element.focus()
              updateSort()
            }
            if (e.keyCode == 40) {  //down
              e.preventDefault();
              element.insertAfter(element.next());
              element.focus()
              updateSort()
            }

          } else {

            if (e.keyCode == 38) {  //up
              e.preventDefault();
              element.prev().focus();
            }
            if (e.keyCode == 40) {  //down
              e.preventDefault();
              element.next().focus();
            }
            if (e.keyCode == 37) {  //left
              e.preventDefault();
              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').prev().find('.customer-navigation-stop')
              var newIdx = nextColumn.length > index ? index : nextColumn.length - 1
              $(nextColumn[newIdx]).focus()
            }
            if (e.keyCode == 39) {  //right
              e.preventDefault();
              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').next().find('.customer-navigation-stop')
              var newIdx = nextColumn.length > index ? index : nextColumn.length - 1
              $(nextColumn[newIdx]).focus()
            }

            if (e.keyCode == 32) {  //space
              e.preventDefault();
              element.find('.toggle-accordion').click();
            }

            if (e.keyCode == 13) {  //enter
              e.preventDefault();
              element.find('.panel-title').click();
            }

          }

        });

      }
    }
  })
  .directive('customerTabsContainer', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 37) {  //left
            $('li.active').prev().click();
          }
          if (e.keyCode == 39) {  //right
            $('li.active').next().click();
          }
        });
      }
    }
  })
  .directive('customerTabStop', function() {
    return {
      restrict: 'C',
      scope: true,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 37) {  //left
            element.closest('li').prev().find('.customer-tab-stop').focus().click();
          }
          if (e.keyCode == 39) {  //right
            element.closest('li').next().find('.customer-tab-stop').focus().click();
          }
         });
      }
    }
  })

