/**
 * @author tongzn
 */

//题目添加页
QBMsys.controller("addPaperCtrl", addPaperCtrl);

function addPaperCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {

    }

    $scope.togleShow = function (selector) {
        let flag = false;
        //TODO 根据元素的选择器来确定当前点的是哪个  选择题或判断题等
        switch (selector) {

        }
        $scope.commonToggleMenu(selector,true)
    }
}
