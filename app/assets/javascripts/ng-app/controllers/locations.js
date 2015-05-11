angular.module('UpstartSales')
  .controller('LocationsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTInstances',
    function ($scope, $location, Session, Ability, $http, Alert, DTOptionsBuilder, DTColumnBuilder, DTInstances) {


    var self = this
    self.locationTable = {}

    self.dtOptionsLocations = DTOptionsBuilder
      .fromSource('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations')
      .withBootstrap()
      .withDisplayLength(6)
      .withOption("bLengthChange", false)
    self.dtColumnsLocations = [
      DTColumnBuilder.newColumn('customer_id').withTitle('customer_id'),
      DTColumnBuilder.newColumn('short_name').withTitle('short_name'),
      DTColumnBuilder.newColumn('address_1').withTitle('address_1'),
      DTColumnBuilder.newColumn('address_2').withTitle('address_2'),
      DTColumnBuilder.newColumn('city').withTitle('city'),
      DTColumnBuilder.newColumn('state').withTitle('state'),
      DTColumnBuilder.newColumn('zip').withTitle('zip')
    ];

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "locations"){
        DTInstances.getLast().then(function(dtInstance) {
          dtInstance.changeData('/api/customers/' + $scope.selectedCustomer.id + '/customer_locations');
        });
      }
    });

  }]);
