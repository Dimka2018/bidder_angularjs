(function () {
    angular.module("routeApp").directive("placeBidModal", () => {
        return {
            restrict: 'E',
            scope: {
                header: "@",
                placeholder: "@",
                cancel: '&',
                ok: '&',
            },
            templateUrl: "template/placeBidModal.html"
        };
    })
}());