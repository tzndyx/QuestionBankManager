/**
 * @author tongzn
 */

//题目添加页
QBMsys.controller("addQuestionCtrl", questiondetailCtrl);

function questiondetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        // 添加试题    选择题-01 填空题-02 判断题-03 名词解释题-04 简答题-05
        /*{
            id: '',
            lastUpdate: "",
            title: "",
            type: "",
            describe: "",
            options: [],//以下五个字符串转数组
            answer: []//元素为 答案在options中的下标（仅对选择和判断题有效）
        }*/
        $scope.nowEdited = QBMsysUtils.getQuestionTemplate();
    }
    //切换题目类型
    $scope.changeEditType = function (type) {
        $scope.nowEdited.type = type;
        switch (type) {
            case '01':
                $scope.nowEdited.options = [''];
                $scope.nowEdited.answer = [''];
                break;
            case '02':
                $scope.nowEdited.options = [];
                $scope.nowEdited.answer = [''];
                break;
            case '03':
                $scope.nowEdited.options = ['T', 'F'];
                $scope.nowEdited.answer = ['T'];
                break;
            case '04':
                $scope.nowEdited.options = [];
                $scope.nowEdited.answer = [''];
                break;
            case '05':
                $scope.nowEdited.options = [];
                $scope.nowEdited.answer = [''];
                break;
        }
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
            case $scope.nowEdited.describe:
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
        alert('保存成功')
        $scope.nowEdited = QBMsysUtils.getQuestionTemplate();
    }

}
