angular.module('UpstartSales')
  .controller('ContactsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', function ($scope, $location, Session, Ability, $http, Alert) {

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "contacts"){
        $http.get('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts')
          .success(function(data, status, headers, config) {
            $scope.selectedCustomer.contacts = data;
            $scope.newContactInfo = {}
          })
      }
    });

    $scope.newContact = function(contact) {
      $http.post('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts', {
        customer_contact: contact
      }).
        success(function(data, status, headers, config) {
          $scope.selectedCustomer.contacts.push(data)
          $scope.newContactInfo = {}
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

  }]);
