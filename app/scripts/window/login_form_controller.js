"use strict";

chromeMyAdmin.controller("LoginFormController", ["$scope", "$timeout", "mySQLClientService", function($scope, $timeout, mySQLClientService) {

    // Private methods

    var showErrorMessage = function(message) {
        $scope.safeApply(function() {
            $scope.errorMessage = message;
        });
    };

    var hideMessage = function() {
        $scope.safeApply(function() {
            $scope.successMessage = "";
            $scope.errorMessage = "";
        });
    };

    var showSuccessMessage = function(message) {
        $scope.safeApply(function() {
            $scope.successMessage = message;
        });
    };

    var onConnected = function() {
        $scope.safeApply(function() {
            $scope.notifyConnectionChanged();
        });
    };

    // Public methods

    $scope.initialize = function() {
        $scope.successMessage = "";
        $scope.errorMessage = "";

        $scope.hostName = "127.0.0.1";
        $scope.portNumber = "3306";
        $scope.userName = "yoichiro";
        $scope.password = "pass";
    };

    $scope.connect = function() {
        hideMessage();
        var promise = mySQLClientService.login(
            $scope.hostName,
            Number($scope.portNumber),
            $scope.userName,
            $scope.password
        );
        promise.then(function(initialHandshakeRequest) {
            onConnected();
        }, function(reason) {
            showErrorMessage("Connection failed: " + reason);
        });
    };

    $scope.doTestConnection = function() {
        hideMessage();
        var promise = mySQLClientService.login(
            $scope.hostName,
            Number($scope.portNumber),
            $scope.userName,
            $scope.password
        );
        promise.then(function(initialHandshakeRequest) {
            showSuccessMessage("Connection was successfully.");
            mySQLClientService.logout();
        }, function(reason) {
            showErrorMessage("Connection failed: " + reason);
        });
    };

    $scope.isErrorMessageVisible = function() {
        return $scope.errorMessage.length > 0;
    };

    $scope.isSuccessMessageVisible = function() {
        return $scope.successMessage.length > 0;
    };

    $scope.isLoginFormVisible = function() {
        return !mySQLClientService.isConnected();
    };

}]);