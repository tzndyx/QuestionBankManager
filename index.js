/**
 * @author tongzn
 */
// (function() {
//     localStorage.clear();
//
//     // 插入测试数据
//     localStorage.setItem('doEdit', this.doEdit);
// })()

var QBMsys = angular.module('QBMsys', []);
QBMsys.controller("loginCtrl", loginCtrl);

function loginCtrl($scope){
    window.replace('html/login/login.html')
    // injectCommon($scope);
    // $scope.goto("login");
}