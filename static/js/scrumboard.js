(function () {
    'use strict';

    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController',
            ['$scope', '$http', 'Login', ScrumboardController]);  //dependencies

    function ScrumboardController($scope, $http, Login) {
        $scope.add = function (list, title) {
            var card = {
                list: list.id,  // adding a foreign key in js
                title: title
            };

            $http.post('/scrumboard/cards/', card)
                .then(function (response) {
                    list.cards.push(response.data);
                },
                function(){
                    alert('Could not create card');
                }
            );

        };

        $scope.data = [];
        $http.get('/scrumboard/lists/').then(
            function (response) {
                $scope.data = response.data;
            }
        );

        Login.redirectIfNotLoggedIn(); // redirecting if not logged in
        $scope.logout = Login.logout; // passing logout method from service to logout local method
        $scope.sortBy = 'story_points';
        // setting initial values for filter variables
        $scope.reverse = true;
        $scope.showFilters = false;
    }

}());