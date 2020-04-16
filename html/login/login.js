/**
 * @author tongzn
 */
QBMsys.controller("loginCtrl", loginCtrl);

function loginCtrl($scope){
    injectCommon($scope)
    $scope.title = 'title测试'
    $scope.login = function () {
        operateUser.login($scope.id,$scope.pwd)
    }
}