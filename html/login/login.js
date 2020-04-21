/**
 * @author tongzn
 */
QBMsys.controller("loginCtrl", loginCtrl);

function loginCtrl($scope){
    injectCommon($scope)
    // 回车登录
    document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) { //回车键的键值为13
            $scope.login()
        }
    };
    $scope.login = function () {
        operateUser.login($scope.id,$scope.pwd)
    }
}