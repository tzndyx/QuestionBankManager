/**
 * @author tongzn
 */
var QBMsys = angular.module('QBMsys', []);
QBMsys.controller("loginCtrl", loginCtrl);

function loginCtrl($scope){
    window.replace('html/login/login.html')
    // injectCommon($scope);
    // $scope.goto("login");
}