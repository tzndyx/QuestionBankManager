/**
 * @author tongzn
 */

//题目编辑页
QBMsys.controller("paperDetailCtrl", paperDetailCtrl);

function paperDetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        // $scope.uncompileable = true;
        console.error($scope.question);
        $scope.nowEdited = $scope.question;
        $scope.nowEdited.options = $scope.nowEdited.options == ""?[]:QBMsysUtils.getArray($scope.question.options);
        $scope.nowEdited.answer = $scope.nowEdited.answer == ""?[]:QBMsysUtils.getArray($scope.question.answer);
    }
    //增加项目
    $scope.addItem = function () {
        if ($scope.nowEdited.type == '01') {
            if (-1 != $scope.nowEdited.options.indexOf('')) {
                alert('选项' + ($scope.nowEdited.options.indexOf('') + 1) + '内容不能为空！')
                return
            }
            $scope.nowEdited.options.push('');
            return
        }
        if (-1 != $scope.nowEdited.answer.indexOf('')) {
            alert('第' + ($scope.nowEdited.answer.indexOf('') + 1) + '空内容不能为空！')
            return
        }
        $scope.nowEdited.answer.push('');
    }
    //删除项目
    $scope.delItem = function (item) {
        // $scope.refresh($scope.nowEdited)
        if ($scope.nowEdited.type == '01') {
            $scope.delArrItem($scope.nowEdited.options, item)
            return
        }
        $scope.delArrItem($scope.nowEdited.answer, item)
    }
    $scope.delArrItem = function (arr, item) {
        arr.splice(arr.indexOf(item), 1)
    }

    //刷新input的改变
    $scope.getInputVal = function (obj, index, val) {
        obj[index] = val;
    }

    //保存题目
    $scope.submit = function () {
        switch ('') {
            case $scope.nowEdited.title:
                alert('请输入题目名称');
                return;
            case $scope.nowEdited.type:
                alert('请选择题目类型');
                return;
            case $scope.nowEdited.descripe:
                alert('请输入题目描述');
                return;
        }
        if (-1 != $scope.nowEdited.options.indexOf('')) {
            alert('选项' + ($scope.nowEdited.options.indexOf('') + 1) + '内容不能为空！')
            return
        }
        if (-1 != $scope.nowEdited.answer.indexOf('') ||  null == $scope.nowEdited.answer[0]) {
            if($scope.nowEdited.type == '02'){
                alert('第' + ($scope.nowEdited.answer.indexOf('') + 1) + '空内容不能为空！')
            }else{
                alert('答案内容不能为空！')
            }
            return
        }
        operateQuestion.create($scope.nowEdited);
        $scope.goback()
    }
}
