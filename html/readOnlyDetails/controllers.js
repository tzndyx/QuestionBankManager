/**
 * @author tongzn
 */

//题目详情页
QBMsys.controller("questiondetailCtrl", questiondetailCtrl);
function questiondetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        // $scope.uncompileable = true;
        console.error($scope.question);
        $scope.nowEdited = $scope.question;
        $scope.nowEdited.options = $scope.nowEdited.options == ""?[]:QBMsysUtils.getArray($scope.question.options);
        $scope.nowEdited.answer = $scope.nowEdited.answer == ""?[]:QBMsysUtils.getArray($scope.question.answer);
    }
}

//试卷详情页
QBMsys.controller("paperDetailCtrl", paperDetailCtrl);
function paperDetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        getArrById('choiceQuestion')
        getArrById('fillblankQuestion')
        getArrById('judgementQuestion')
        getArrById('explanQuestion')
        getArrById('shortanswerQuestion')

        function getArrById(attr){
            let arr = [];
            for(let index in $scope.paper[attr]){
                arr.push(operateQuestion.query($scope.paper[attr][index]));
            }
            $scope[attr] = arr;
        }
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

// 用户信息
QBMsys.controller("userDetailsCtrl", userDetailsCtrl);

function userDetailsCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.user = operateUser.query($scope.id)
    }
}
