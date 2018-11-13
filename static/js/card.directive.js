(function(){
    'use strict'; //putting js interpreter in strict mode
    angular.module('scrumboard.demo')  // retrieving module only
        .directive('scrumboardCard', CardDirective); // to add new directive

        function CardDirective(){
            return{
                templateUrl: '/static/html/card.html',
                restrict: 'E',  // using this directive as an HTML element
                controller: ['$scope', '$http', function($scope, $http){   // to auto save
                    var url='/scrumboard/cards/' + $scope.card.id +'/';  // contains the url for specific cards

                    $scope.destList = $scope.list;
                    $scope.update = function(){
                        return $http.put( // using put to update existing resource returns the value it got from http.put
                        url,
                        $scope.card
                        )
                    }

                    function removeFromCardList(card, list){  // removing card from current list
                        var cards = list.cards;
                        cards.splice(
                            cards.indexOf(card),
                            1
                        );
                    }

                    $scope.delete =function(){
                        $http.delete(url).then(
                            function(){
                                removeFromCardList($scope.card, $scope.list);
                            }
                        )
                    }
                    $scope.modelOptions = {
                        debounce : 500 //http method can cause lot of traffic debounce tells to wait for 500 ms before making another http request
                    };

                    $scope.move = function(){
                        if($scope.destList === undefined){ // if user has selected anything
                            return;
                        }
                        $scope.card.list = $scope.destList.id; // takes the id of the selected list
                        $scope.update().then(function(){ // update function wil save the card to the server
                            {
                                removeFromCardList($scope.card, $scope.list);
                                $scope.destList.cards.push($scope.card);
                            }
                        })
                    }

                }]
            };
        }
})()