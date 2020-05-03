(function () {
   angular.module("routeApp").controller("BidController", function ($scope, $state, $rootScope) {

       $scope.products = [];
       $scope.numberProducts = 0;
       $scope.isBidMode = false;

       $scope.loadProductsPack = (packSize) => {
           new Promise(() => {
               let request = window.indexedDB.open("BidDB", 1);

               request.onsuccess = (event) => {
                   let targetProductLength = $scope.products.length + packSize;
                   let transaction = event.target.result.transaction(["products"]);
                   let productStore = transaction.objectStore("products");
                   let skipTimes = $scope.products.length;
                   productStore.openCursor().onsuccess = (event) => {
                       let cursor = event.target.result;
                       if (skipTimes > 0) {
                           skipTimes--;
                           cursor.continue();
                       } else {
                           if (cursor) {
                               $scope.products.push(cursor.value);
                               $scope.$apply();
                           }
                           if (cursor && $scope.products.length < targetProductLength) {
                               cursor.continue();
                           }
                       }
                   };
               };
           });
       };

       $scope.loadProductsPack(2);

       $scope.loadNumberProducts = () => {
           new Promise(() => {
               let request = window.indexedDB.open("BidDB", 1);
               request.onsuccess = (event) => {
                   let transaction = event.target.result.transaction(["products"]);
                   let productStore = transaction.objectStore("products");
                   productStore.count().onsuccess = (event) => {
                       $scope.numberProducts = event.target.result;
                       $scope.$apply();
                   };
               }
           });
       };

       $scope.loadNumberProducts();

       $scope.toggleDescription = (index) => {
           $scope.descriptionIndex = index;
       };

       $scope.setBid = (product, futureBid) => {
           product.bid = futureBid;
           saveOrUpdateProduct(product);
       };

       $scope.toggleBidModal = (product) => {
           $scope.isBidMode = !$scope.isBidMode;
           $scope.productToChange = product;
       };

       $scope.logout = () => {
           $rootScope.user = undefined;
           $state.go("welcome");
       };

       $scope.isSold = (product) => {
           let now = new Date();
           let end = new Date(product.end.year, product.end.month - 1,
               product.end.day, product.end.hour, product.end.min, product.end.sec, 0);
           return now >= end;
       };

       function saveOrUpdateProduct(product) {
           new Promise(() => {
               let request = window.indexedDB.open("BidDB", 1);
               request.onsuccess = (event) => {
                   let transaction = event.target.result.transaction(["products"], "readwrite");
                   let productStore = transaction.objectStore("products");
                   productStore.put(product);
               };
           });
       }
   });
}());