angular
  .module('UpstartSales', [
    'ngRoute',
    'templates',
    'UpstartSales.directives',
    'sessionService',
    'abilityService',
    'alertService'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { templateUrl: 'sales/sales.html', controller: 'SalesCtrl' })
      .when('/users/login', {templateUrl:'users/login.html', controller:'UsersCtrl'})
      .when('/settings', {templateUrl:'users/settings.html', controller:'SettingsCtrl'})
      .when('/admin', {templateUrl:'admin/admin.html', controller:'AdminCtrl'})
      .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }])
  .config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.interceptors.push(['$q', '$location', 'Alert', function ($q, $location, Alert) {
      return {
        'response': function (response) {
          return response;
        },
        'responseError': function (response) {
            if(response.status === 403) {
              if (response.data == "not authorized") {
                Alert.add('danger', 'sorry, you are not authorized to view this page', 8000)
                $location.path('/');
              } else if (response.data == 'sign in') {
                Alert.add('danger', 'Please sign in.', 8000)
                $location.path('/users/login');
              }
              return $q.reject(response);
            }
            if(response.status === 500 && response.data.error == "You are not authorized to access this page.") {
              Alert.add('danger', 'sorry, you are not authorized to view this page', 4000)
              $location.path('/');
              return response
            }
            return $q.reject(response);
        }
      };
    }]);

  }])
  .controller('AppCtrl', ['$scope','$route','$location', 'Ability', function($scope, $route, $location, Ability) {
    $scope.$on("authLoginSuccess",function(){
      Ability.currentAbility = null;
      Ability.currentRoles = null;
      Ability.requestCurrentAbility();
    });

    $scope.canCan = function(action, subject){
      return Ability.canCan(action, subject)
    }

    $scope.hasRole = function(role){
      return Ability.hasRole(role)
    };
  }])