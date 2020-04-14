/**
 * @author tongzn
 */

//题目添加页
QBMsys.controller("addPaperCtrl", addPaperCtrl);

function addPaperCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.paper = QBMsysUtils.getPaperTemplate();
        $scope.choiceQuestion = [1,2,3];
        $scope.fillblankQuestion = [];
        $scope.judgementQuestion = [];
        $scope.explanQuestion = [];
        $scope.shortanswerQuestion = [];
        // {
        //     title: "",
        //     descripe: "",
        //     choiceQuestion: [],  //以下五个字符串转数组
        //     fillblankQuestion: [],
        //     judgementQuestion: [],
        //     explanQuestion: [],
        //     shortanswerQuestion: []
        // }
    }

    $scope.choiceShowFlag = false;
    $scope.fillblankShowFlag = false;
    $scope.judgementShowFlag = false;
    $scope.explanShowFlag = false;
    $scope.shortanswerShowFlag = false;
    $scope.togleShow = function (selector) {
        //TODO 根据元素的选择器来确定当前点的是哪个  选择题或判断题等
        switch (selector) {
            case '#choiceBody':
                $scope.dealTogle(selector, $scope.choiceShowFlag);
                $scope.choiceShowFlag = !$scope.choiceShowFlag;
                break;
            case '#fillblankBody':
                $scope.dealTogle(selector, $scope.fillblankShowFlag);
                $scope.fillblankShowFlag = !$scope.fillblankShowFlag;
                break;
            case '#judgementBody':
                $scope.dealTogle(selector, $scope.judgementShowFlag);
                $scope.judgementShowFlag = !$scope.judgementShowFlag;
                break;
            case '#explanBody':
                $scope.dealTogle(selector, $scope.explanShowFlag);
                $scope.explanShowFlag = !$scope.explanShowFlag;
                break;
            case '#shortanswerBody':
                $scope.dealTogle(selector, $scope.shortanswerShowFlag);
                $scope.shortanswerShowFlag = !$scope.shortanswerShowFlag;
                break;
        }
    }
    $scope.dealTogle = function (selector, flag) {
        flag ? $(selector).slideUp(400) : $(selector).slideDown(400);
    }
}
