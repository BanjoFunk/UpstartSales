angular.module('UpstartSales')
  .controller('ContactsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    $scope.newContactInfo = {}
    self.showContactForm = false

    self.toggleContactForm = function() {
      self.showContactForm = !self.showContactForm
    };

    self.dtOptions = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
    self.dtColumns = [
      DTColumnBuilder.newColumn('first_name').withTitle('first name'),
      DTColumnBuilder.newColumn('last_name').withTitle('last name'),
      DTColumnBuilder.newColumn('position').withTitle('position'),
      DTColumnBuilder.newColumn('phone').withTitle('phone'),
      DTColumnBuilder.newColumn('email').withTitle('email')
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "contacts"){
        DTInstances.getLast().then(function(dtInstance) {
          dtInstance.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');
        });
      }
    });

    $scope.clearContactForm = function() {
      $scope.newContactInfo = {}
    };

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
