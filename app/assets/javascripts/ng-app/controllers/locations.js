angular.module('UpstartSales')
  .controller('LocationsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    self.locationTable = {}
    $scope.newLocationInfo = {}
    self.showLocationForm = false
    $scope.editLocationInfo = {}
    self.showEditLocationForm = false

    self.dtOptionsLocations = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
      .withOption('fnDrawCallback', function(settings) {
        if (angular.element('.edit-location').length > 0){
          angular.element('.edit-location').on('click', function(e){
            $scope.showEditLocation(e)
          });
          angular.element('.delete-location').on('click', function(e){
            $scope.deleteLocation(e)
          });
        }
      });
    self.dtColumnsLocations = [
      DTColumnBuilder.newColumn('short_name').withTitle('short_name'),
      DTColumnBuilder.newColumn('address_1').withTitle('address_1'),
      DTColumnBuilder.newColumn('address_2').withTitle('address_2'),
      DTColumnBuilder.newColumn('city').withTitle('city'),
      DTColumnBuilder.newColumn('state').withTitle('state'),
      DTColumnBuilder.newColumn('zip').withTitle('zip'),
      DTColumnBuilder.newColumn('actions').withTitle('actions').withClass('text-center').renderWith(function(data, type, location) {
            return "<a href='#' location_id=" + location.id + " class='edit-location'><span style='font-size:18px;' class='glyphicon glyphicon-pencil'></span></a>" +
                   "<span style='font-size:18px;' >&nbsp;&nbsp;|&nbsp;&nbsp;</span>" +
                   "<a href='#' location_id=" + location.id + " class='delete-location'><span style='font-size:18px;' class='glyphicon glyphicon-remove'></span></a>"
        }).withOption('bSortable', false)
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "locations"){

        DTInstances.getList().then(function(dtInstances) {
          locationsDT = dtInstances['locations-table'];
          locationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations');
        });

      }
    });

    self.toggleLocationForm = function() {
      self.showLocationForm = !self.showLocationForm
      console.log(self.showLocationForm)
      if(self.showLocationForm == true){
        setTimeout(function(){ $("#nlShortName").focus() }, 200);
      } else {
        setTimeout(function(){ $("#location-add").focus() }, 200);
      }
    };

    self.toggleEditLocationForm = function() {
      self.showEditLocationForm = !self.showEditLocationForm
      if(self.showEditLocationForm == true){
        setTimeout(function(){ $("#nlShortName").focus() }, 200);
      } else {
        setTimeout(function(){ $("#location-add").focus() }, 200);
      }
    };

    $scope.clearLocationForm = function() {
      $scope.newLocationInfo = {}
    };

    $scope.newLocation = function(location) {
      $http.post('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations', {
        customer_location: location
      }).
        success(function(data, status, headers, config) {
          $scope.newLocationInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            locationsDT = dtInstances['locations-table'];
            locationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

    $scope.editLocation = function(location) {
      $http.put('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations/' + $scope.editLocationInfo.id, {
        customer_location: location
      }).
        success(function(data, status, headers, config) {
          $scope.editLocationInfo = {}
          DTInstances.getList().then(function(dtInstances) {
            locationsDT = dtInstances['locations-table'];
            locationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations');
          });
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
        });
    };

    $scope.showEditLocation = function(e){
      var locationId = parseInt($(e.target).parents('tr').attr('id'))
      $scope.editLocationInfo = $.grep(locationsDT.DataTable.data(), function(e){ return e.DT_RowId == locationId; })[0];

      $scope.$apply(function(){
        self.showEditLocationForm = !self.showEditLocationForm
        setTimeout(function(){ $("#nlShortName").focus() }, 200);
      })
    }

    $scope.deleteLocation = function(e){
      if ( window.confirm("is it okay to delete this location?") ) {
        $http.delete('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations/' + $(e.target).parents('tr').attr('id'), {
        }).
          success(function(data, status, headers, config) {
            DTInstances.getList().then(function(dtInstances) {
              locationsDT = dtInstances['locations-table'];
              locationsDT.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations');
            });
          }).
          error(function(data, status, headers, config) {
            Alert.add("danger", 'sorry, something went wrong. ask josh.', 4000);
          });
      }
    }


  }]);
