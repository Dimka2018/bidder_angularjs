(function () {
    angular.module("routeApp").config(($stateProvider, $urlRouterProvider) => {

        $urlRouterProvider.otherwise('/welcome');

        $stateProvider
            .state('welcome', {
                url: "/welcome",
                templateUrl: "welcome.html",
                controller: "WelcomeController"
            })
            .state('bid', {
                url: "/bid",
                templateUrl: "bid.html",
                controller: "BidController"
            })

    });
}());