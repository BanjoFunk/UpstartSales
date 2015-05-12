angular.module('UpstartSales')
  .controller('CommunicationsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    self.communicationTable = {}
    $scope.newCommunicationInfo = {}
    self.showCommunicationForm = false
    $scope.editCommunicationInfo = {}
    self.showEditCommunicationForm = false


    self.dtOptionsCommunications = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
      .withOption('fnDrawCallback', function(settings) {
        if (angular.element('.edit-communication').length > 0){
          angular.element('.edit-communication').on('click', function(e){
            $scope.showEditCommunication(e)
          });
          angular.element('.delete-communication').on('click', function(e){
            $scope.deleteCommunication(e)
          });
        }
      });
    self.dtColumnsCommunications = [
      DTColumnBuilder.newColumn('type_html').withTitle('how').withClass('communication_type'),
      DTColumnBuilder.newColumn('communicated_with').withTitle('who').withClass('communicated_with'),
      DTColumnBuilder.newColumn('notes').withTitle('notes').withClass('notes').withOption('bSortable', false),
      DTColumnBuilder.newColumn('actions').withTitle('actions').withClass('text-center').renderWith(function(data, type, communication) {
            return "<a href='#' communication_id=" + communication.id + " class='edit-communication'><span style='font-size:18px;' class='glyphicon glyphicon-pencil'></span></a>" +
                   "<span style='font-size:18px;' >&nbsp;&nbsp;|&nbsp;&nbsp;</span>" +
                   "<a href='#' communication_id=" + communication.id + " class='delete-communication'><span style='font-size:18px;' class='glyphicon glyphicon-remove'></span></a>"
        }).withOption('bSortable', false)
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
        setTimeout(function(){ $("#new_communication_type").focus() }, 200);
      } else {
        setTimeout(function(){ $("#communication-add").focus() }, 200);
      }
    };

    self.toggleEditCommunicationForm = function() {
      self.showEditCommunicationForm = !self.showEditCommunicationForm
      if(self.showEditCommunicationForm == true){
        setTimeout(function(){ $("#edit_communication_type").focus() }, 200);
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

    $scope.editCommunication = function(communication) {
      $http.put('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications/' + $scope.editCommunicationInfo.id, {
        customer_communication: communication
      }).
        success(function(data, status, headers, config) {
          $scope.editCommunicationInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            communicationsDT = dtInstances['communications-table'];
            communicationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

    $scope.showEditCommunication = function(e){
      $scope.editCommunicationInfo.id = $(e.target).parents('tr').attr('id')
      $scope.editCommunicationInfo.communication_type = $(e.target).parents('tr').children('.communication_type').text();
      $scope.editCommunicationInfo.communicated_with = $(e.target).parents('tr').children('.communicated_with').text();
      $scope.editCommunicationInfo.notes = $(e.target).parents('tr').children('.notes').text();
      $scope.$apply(function(){
        self.showEditCommunicationForm = !self.showEditCommunicationForm
        setTimeout(function(){ $("#edit_communication_type").focus() }, 200);
      })
    }

    $scope.deleteCommunication = function(e){
      if ( window.confirm("is it okay to delete this communication?") ) {
        $http.delete('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications/' + $(e.target).parents('tr').attr('id'), {
        }).
          success(function(data, status, headers, config) {
            DTInstances.getList().then(function(dtInstances) {
              communicationsDT = dtInstances['communications-table'];
              communicationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_communications');
            });
          }).
          error(function(data, status, headers, config) {
            Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
          });
      }
    }

  }]);
