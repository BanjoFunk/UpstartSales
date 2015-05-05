angular.module('UpstartSales')
  .controller('SalesCtrl', ['$scope', '$http', 'Ability', 'Alert', '$timeout', function ($scope, $http, Ability, Alert, $timeout) {
    $scope.errors = [];
    $scope.selectedCustomer = "";

    $http.get('/api/customers')
      .success(function(data, status, headers, config) {
        $scope.states = data
      })

    $scope.postSort = function(sort){
      $http.post('/api/customers/sort', { sort: sort }).
        success(function(data, status, headers, config) {
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
          return true
        }).
        error(function(data, status, headers, config) {
          Alert.add("error", 'sorry, you cannot create customers at this time. ask josh.', 4000);
        });
    }

    $scope.showModal = false;
    $scope.toggleModal = function(customer){
      $scope.selectedCustomer = customer
      $scope.details_category = "overview";
      $scope.showModal = !$scope.showModal;
    };
    $scope.hideModal = function() {
      $scope.showModal = false;
    }

    $scope.detailsNav = function(category) {
      $scope.details_category = category
    }


  }]);
