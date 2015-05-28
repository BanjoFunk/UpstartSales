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
  .directive('editCustomerFormToggle', function() {
    return {
      restrict: 'C',
      link: function(scope, element, attrs){
        element.click(function(){
          $('.header-customer-name').toggle();
          $('.hidden-cust-edit-form').toggle();
          $('#edit-customer-name').focus();
        });
      }
    }
  })
  .directive('customerNameEscape', function() {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 27) {  //escape
            $("#cancel-customer-name").click()
            $("#show-customer-form").focus()
          }
          if (e.keyCode == 13) {  //enter
            $("#new-customer-submit").click()
          }
        });
      }
    }
  })
  .directive('editCustomerNameEscape', function() {
    return {
      restrict: 'A',
      scope: false,
      link: function(scope, element, attrs){
        element.keydown(function (e) {
          if (e.keyCode == 27) {  //escape
            e.stopPropagation();
            $("#cancel-edit-customer-name").click()
            $("#customer-actions-drop").focus()
          }
          if (e.keyCode == 13) {  //enter
            e.stopPropagation();
            $("#edit-customer-submit").click()
          }
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
          $(element).siblings('.toggle-accordion').toggle();
          $(element).toggle();

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
        var shouldPostSort = false
        var ctrlKeyFired = false

        element.on('click', function(e){
          element.focus();
        })
        element.keydown(function (e) {
          if (e.ctrlKey){
            element.addClass('active-customer-nav')
            ctrlKeyFired = true
          }
        })
        element.keyup(function (e) {
          if ((ctrlKeyFired == true) && (e.ctrlKey == false)){
            ctrlKeyFired = false
            element.removeClass('active-customer-nav')
            if(shouldPostSort == true){
              updateSort()
              shouldPostSort = false
            }
          }
        })
        element.keydown(function (e) {

          if (e.ctrlKey) { // WITH THE CONTROL KEY HELD
            if (e.keyCode == 39) {  //right
              e.preventDefault();
              e.stopPropagation();

              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').next()
              var nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
              var newIdx = nextColumnCustomers.length > index ? index : nextColumnCustomers.length - 1

              if (nextColumnCustomers.length == 0) {
                nextColumn.children('.connected-sortable').append(element)
              } else if(nextColumnCustomers.length <= index){
                element.insertAfter(nextColumnCustomers[newIdx]);
              } else {
                element.insertBefore(nextColumnCustomers[newIdx]);
              }
              element.focus();
              shouldPostSort = true
            }
            if (e.keyCode == 37) {  //left
              e.preventDefault();
              e.stopPropagation();

              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').prev()
              var nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
              var newIdx = nextColumnCustomers.length > index ? index : nextColumnCustomers.length - 1


              if (nextColumnCustomers.length == 0) {
                nextColumn.children('.connected-sortable').append(element)
              } else if(nextColumnCustomers.length <= index){
                element.insertAfter(nextColumnCustomers[newIdx]);
              } else {
                element.insertBefore(nextColumnCustomers[newIdx]);
              }
              element.focus();
              shouldPostSort = true
            }

            if (e.keyCode == 38) {  //up
              e.preventDefault();
              element.insertBefore(element.prev());
              element.focus()
              shouldPostSort = true
            }
            if (e.keyCode == 40) {  //down
              e.preventDefault();
              element.insertAfter(element.next());
              element.focus()
              shouldPostSort = true
            }

          } else {  // WITHOUT A MODIFIER KEY

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
              var nextColumn = element.closest('.equal-column').prev()
              if(nextColumn.length){
                var nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
                while(nextColumnCustomers.length == 0) {
                  nextColumn = nextColumn.prev()
                  nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
                }
                var newIdx = nextColumnCustomers.length > index ? index : nextColumnCustomers.length - 1
                $(nextColumnCustomers[newIdx]).focus()
              }
            }
            if (e.keyCode == 39) {  //right
              e.preventDefault();
              var index = $.inArray(element[0], element.parent().children('.customer-navigation-stop'))
              var nextColumn = element.closest('.equal-column').next()
              if(nextColumn.length){
                var nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
                while(nextColumnCustomers.length == 0) {
                  nextColumn = nextColumn.next()
                  nextColumnCustomers = nextColumn.find('.customer-navigation-stop')
                }
                var newIdx = nextColumnCustomers.length > index ? index : nextColumnCustomers.length - 1
                $(nextColumnCustomers[newIdx]).focus()
              }
            }

            if (e.keyCode == 32) {  //space
              e.preventDefault();
              element.find('.toggle-accordion').first().click();
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

