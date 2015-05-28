angular.module('UpstartSales')
  .controller('ContactsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    self.contactTable = {}
    $scope.newContactInfo = {}
    self.showContactForm = false
    $scope.editContactInfo = {}
    self.showEditContactForm = false



    self.dtOptionsContacts = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
      .withOption('fnDrawCallback', function(settings) {
        if (angular.element('.edit-contact').length > 0){
          angular.element('.edit-contact').on('click', function(e){
            $scope.showEditContact(e)
          });
          angular.element('.delete-contact').on('click', function(e){
            $scope.deleteContact(e)
          });
        }
      });
    self.dtColumnsContacts = [
      DTColumnBuilder.newColumn('first_name').withTitle('first name'),
      DTColumnBuilder.newColumn('last_name').withTitle('last name'),
      DTColumnBuilder.newColumn('position').withTitle('position'),
      DTColumnBuilder.newColumn('phone').withTitle('phone'),
      DTColumnBuilder.newColumn('email').withTitle('email'),
      DTColumnBuilder.newColumn('actions').withTitle('actions').withClass('text-center').renderWith(function(data, type, contact) {
            return "<a href='#' contact_id=" + contact.id + " class='edit-contact'><span style='font-size:18px;' class='glyphicon glyphicon-pencil'></span></a>" +
                   "<span style='font-size:18px;' >&nbsp;&nbsp;|&nbsp;&nbsp;</span>" +
                   "<a href='#' contact_id=" + contact.id + " class='delete-contact'><span style='font-size:18px;' class='glyphicon glyphicon-remove'></span></a>"
        }).withOption('bSortable', false)
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "contacts"){

        DTInstances.getList().then(function(dtInstances) {
          contactsDT = dtInstances['contacts-table'];
          contactsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');

        });

      }
    });

    self.toggleContactForm = function() {
      self.showContactForm = !self.showContactForm
      if(self.showContactForm == true){
        setTimeout(function(){ $("#ncFirstName").focus() }, 200);
      } else {
        setTimeout(function(){ $("#contact-add").focus() }, 200);
      }
    };

    self.toggleEditContactForm = function() {
      self.showEditContactForm = !self.showEditContactForm
      if(self.showEditContactForm == true){
        setTimeout(function(){ $("#edit_contact_type").focus() }, 200);
      } else {
        setTimeout(function(){ $("#contact-add").focus() }, 200);
      }
    };

    $scope.clearContactForm = function() {
      $scope.newContactInfo = {}
    };

    $scope.newContact = function(contact) {
      $http.post('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts', {
        customer_contact: contact
      }).
        success(function(data, status, headers, config) {
          $scope.newContactInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            contactsDT = dtInstances['contacts-table'];
            contactsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');

          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

    $scope.editContact = function(contact) {
      $http.put('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts/' + $scope.editContactInfo.id, {
        customer_contact: contact
      }).
        success(function(data, status, headers, config) {
          $scope.editContactInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            contactsDT = dtInstances['contacts-table'];
            contactsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

    $scope.showEditContact = function(e){
      var contactId = parseInt($(e.target).parents('tr').attr('id'))
      $scope.editContactInfo = $.grep(contactsDT.DataTable.data(), function(e){ return e.DT_RowId == contactId; })[0];

      $scope.$apply(function(){
        self.showEditContactForm = !self.showEditContactForm
        setTimeout(function(){ $("#edit_contact_type").focus() }, 200);
      })
    }

    $scope.deleteContact = function(e){
      if ( window.confirm("is it okay to delete this contact?") ) {
        $http.delete('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts/' + $(e.target).parents('tr').attr('id'), {
        }).
          success(function(data, status, headers, config) {
            DTInstances.getList().then(function(dtInstances) {
              contactsDT = dtInstances['contacts-table'];
              contactsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_contacts');
            });
          }).
          error(function(data, status, headers, config) {
            Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
          });
      }
    }

  }]);
