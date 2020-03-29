/**
 * @author tongzn
 */
QBMsys.controller("acctapplyCtrl", acctapplyCtrl);

function acctapplyCtrl($scope){
    injectCommon($scope)
    $scope.init = function(){
    }
    $scope.test = function () {
        $scope.errorMsg = '测试';
    }
}