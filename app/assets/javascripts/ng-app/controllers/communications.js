angular.module('UpstartSales')
  .controller('CommunicationsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    self.communicationTable = {}
    $scope.newCommunicationInfo = {}
    self.showCommunicationForm = false

    self.dtOptionsCommunications = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
    self.dtColumnsCommunications = [
      DTColumnBuilder.newColumn('communication_type').withTitle('communication_type'),
      DTColumnBuilder.newColumn('communicated_with').withTitle('communicated_with'),
      DTColumnBuilder.newColumn('notes').withTitle('notes'),
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "communications"){
        DTInstances.getList().then(function(dtInstances) {
          communicationsDT = dtInstances['communications-table'];
          communicationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications');
        });
      }
    });

    self.toggleCommunicationForm = function() {
      self.showCommunicationForm = !self.showCommunicationForm
      if(self.showCommunicationForm == true){
        setTimeout(function(){ $("#ncomCommunicationType").focus() }, 200);
      } else {
        setTimeout(function(){ $("#communication-add").focus() }, 200);
      }
    };

    $scope.clearCommunicationForm = function() {
      $scope.newCommunicationInfo = {}
    };

    $scope.newCommunication = function(communication) {
      $http.post('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications', {
        customer_communication: communication
      }).
        success(function(data, status, headers, config) {
          $scope.newCommunicationInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            communicationsDT = dtInstances['communications-table'];
            communicationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

  }]);
