angular.module('UpstartSales')
  .controller('ContactsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var vm = this;
    vm.dtOptions = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
    vm.dtColumns = [
      DTColumnBuilder.newColumn('first_name').withTitle('First name'),
      DTColumnBuilder.newColumn('last_name').withTitle('Last name'),
      DTColumnBuilder.newColumn('position').withTitle('position'),
      DTColumnBuilder.newColumn('phone').withTitle('phone'),
      DTColumnBuilder.newColumn('email').withTitle('email')
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "contacts"){
        $scope.newContactInfo = {}
        DTInstances.getLast().then(function(dtInstance) {
          dtInstance.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');
        });
      }
    });

    $scope.newContact = function(contact) {
      $http.post('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts', {
        customer_contact: contact
      }).
        success(function(data, status, headers, config) {
          $scope.newContactInfo = {}
          DTInstances.getLast().then(function(dtInstance) {
            dtInstance.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

  }]);
