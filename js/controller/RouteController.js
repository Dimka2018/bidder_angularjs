(function () {
    angular.module("routeApp").controller("routeCtrl", ($rootScope, $state) => {
        $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
            if (toState.name === "bid" && $rootScope.user === undefined) {
                event.preventDefault();
                $state.go("welcome");
            }
        });
    });
}());