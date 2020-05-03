(function() {
    angular.module("routeApp").controller("WelcomeController", function ($scope, $state, $rootScope) {
        $scope.isRegistrationMode = false;

        $scope.setLoginMode = () => {
            $scope.isRegistrationMode = false;
        };

        $scope.setRegistrationMode = () => {
            $scope.isRegistrationMode = true;
        };

        $scope.login = () => {
            let promise = new Promise((resolve, reject) => {
                let request = window.indexedDB.open("BidDB", 1);
                request.onerror = (event) => {
                    reject(event.target);
                };

                request.onupgradeneeded = (event) => {
                    reject("invalid login or password");
                };

                request.onsuccess = (event) => {
                    let db = event.target.result;
                    let transaction = db.transaction(["users"]);
                    let objectStore = transaction.objectStore("users");
                    objectStore.get($scope.loginName).onsuccess = (event) => {
                        let user = event.target.result;
                        if (user !== undefined && user.password === $scope.loginPass) {
                            $rootScope.user = user;
                            resolve();
                        } else {
                            console.log("invalid login or pass");
                            reject("invalid login or password");
                        }
                    }
                }

            });

            promise.then(() => {
                $state.go("bid");
            }, (errorMessage) => {
                $scope.errorMessage = errorMessage;
                $scope.$apply();
            })
        };

        $scope.register = () => {
            let promise = new Promise((resolve, reject) => {
                let request = window.indexedDB.open("BidDB", 1);
                request.onerror = (event) => {
                    reject(event.target);
                };

                request.onsuccess = (event) => {
                    let db = event.target.result;
                    let transaction = db.transaction(["users"], "readwrite");
                    let objectStore = transaction.objectStore("users");
                    let user = {login: $scope.registrationName, password: $scope.registrationPass};
                    objectStore.get(user.login).onsuccess = (event) => {
                        if (!event.target.result) {
                            objectStore.add(user);
                            $rootScope.user = user;
                            resolve();
                        } else {
                            reject("this user already exists");
                        }
                    }
                };
            });

            promise.then(() => {
                $state.go("bid");
            }, (errorMessage) => {
                $scope.errorMessage = errorMessage;
                $scope.$apply();
            })
        }

    });
}());

