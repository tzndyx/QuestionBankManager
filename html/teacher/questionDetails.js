/**
 * @author tongzn
 */

//题目编辑页
QBMsys.controller("questiondetailCtrl", questiondetailCtrl);

function questiondetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        // $scope.uncompileable = true;
        $scope.testMsg = '这是一条测试数据'
    }
}
