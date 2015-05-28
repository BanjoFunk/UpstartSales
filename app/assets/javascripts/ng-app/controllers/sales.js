angular.module('UpstartSales')
  .controller('SalesCtrl', ['$scope', '$http', 'Ability', 'Alert', '$timeout', function ($scope, $http, Ability, Alert, $timeout) {
    $scope.errors = [];
    $scope.selectedCustomer = {id: 1, contacts: []};
    $scope.customerFocus = {}

    $http.get('/api/customers')
      .success(function(data, status, headers, config) {
        $scope.states = data
      })

    $scope.setFocus = function(customer){
      $scope.customerFocus = customer
    }

    $scope.postSort = function(sort){
      $http.post('/api/customers/sort', { sort: sort }).
        success(function(data, status, headers, config) {
          $scope.states = data
          setTimeout(function(){ $('#' + $scope.customerFocus.id).focus() }, 100)
          return true
        }).
        error(function(data, status, headers, config) {
          Alert.add("error", 'sorry, unable to change account status', 4000);
        });
    }

    $scope.newCustomerName = ""

    $scope.addCustomer = function(){
      $http.post('/api/customers', {
          name: $scope.newCustomerName
        }).
        success(function(data, status, headers, config) {
          $scope.states.idea = $scope.states.idea || []
          $scope.states.idea.push(data)
          $scope.newCustomerName = ""
          $('.hidden-cust-form').toggle("slide");
          $("#show-customer-form").focus()
          return true
        }).
        error(function(data, status, headers, config) {
          Alert.add("error", 'sorry, you cannot create customers at this time. ask josh.', 4000);
        });
    }

    $scope.editCustomer = function(){
      $http.put('/api/customers/' + $scope.selectedCustomer.id, {
          name: $scope.selectedCustomer.name
        }).
        success(function(data, status, headers, config) {
          $('.header-customer-name').toggle();
          $('.hidden-cust-edit-form').toggle();
          return true
        }).
        error(function(data, status, headers, config) {
          Alert.add("error", 'sorry, you cannot create customers at this time. ask josh.', 4000);
        });
    }

    $scope.deleteCustomer = function(e){
      if ( window.confirm("is it okay to delete this customer?") ) {
        $http.delete('/api/customers/' + $scope.selectedCustomer.id, {
        }).
          success(function(data, status, headers, config) {
            $scope.states[$scope.selectedCustomer.state_name].pop($scope.selectedCustomer)
            $scope.showModal = false;
            Alert.add("success", $scope.selectedCustomer.name + ' has been deleted', 4000);
          }).
          error(function(data, status, headers, config) {
            Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
          });
      }
    }

    $scope.showModal = false;
    $scope.toggleModal = function(customer){
      $scope.selectedCustomer = customer
      $scope.details_category = "contacts";
      $scope.showModal = !$scope.showModal;
    };
    $scope.hideModal = function() {
      $scope.details_category = "";
      $scope.showModal = false;
      $('#' + $scope.selectedCustomer.id).focus()
    }

    $scope.detailsNav = function(category) {
      $scope.details_category = category
    }


  }]);
