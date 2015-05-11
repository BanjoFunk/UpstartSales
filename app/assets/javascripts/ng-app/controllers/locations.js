angular.module('UpstartSales')
  .controller('LocationsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {

    var self = this
    self.locationTable = {}
    $scope.newLocationInfo = {}
    self.showLocationForm = false

    self.dtOptionsLocations = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
    self.dtColumnsLocations = [
      DTColumnBuilder.newColumn('short_name').withTitle('short_name'),
      DTColumnBuilder.newColumn('address_1').withTitle('address_1'),
      DTColumnBuilder.newColumn('address_2').withTitle('address_2'),
      DTColumnBuilder.newColumn('city').withTitle('city'),
      DTColumnBuilder.newColumn('state').withTitle('state'),
      DTColumnBuilder.newColumn('zip').withTitle('zip')
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

  }]);
