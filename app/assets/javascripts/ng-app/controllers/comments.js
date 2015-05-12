angular.module('UpstartSales')
  .controller('CommentsCtrl', ['$scope', '$location', 'Session', 'Ability', '$http', 'Alert', function ($scope, $location, Session, Ability, $http, Alert) {

    $scope.$watch('details_category', function(newValue, oldValue) {
      if(newValue == "comments"){
        $http.get('/api/customers/' + $scope.selectedCustomer.id + '/comments')
          .success(function(data, status, headers, config) {
            $scope.selectedCustomer.comments = data;
          })
      }
    });

    $scope.newComment = function(comment, batch) {
      $http.put('/api/customers/' + batch.id + '/add_comment', {
        text: comment.text,
        id: batch.id
      }).
        success(function(data, status, headers, config) {
          batch.comments.push(data)
          $('.chat-input').val("").focus()
          return true
        }).
        error(function(data, status, headers, config) {
          Alert.add("danger", 'sorry, you are not authorized to add a comment', 4000);
        });
    };

  }]);
