/**
 * @author tongzn
 */

//题目添加页
QBMsys.controller("addQuestionCtrl", questiondetailCtrl);

function questiondetailCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.nowEdited = {}

        //    选择题模板
        $scope.choiceQuestion = {
            title:'选择测试',
            type:'选择题',
            descripe:'今有雉兔同笼，上有三十五头，下有九十四足，问雉兔各几何',
            options:['兔子12只 鸡12只','兔子23只 鸡23只','兔子23只 鸡12只','兔子12只 鸡23只'],
            answer:3
        }

        //    填空题模板
        $scope.fillblankQuestion = {
            title:'填空测试',
            type:'填空题',
            descripe:'今有雉兔同笼，上有三十五头，下有九十四足，则有雉___兔___',
            answer:[12,23]
        }

        //    判断题模板
        $scope.judgementQuestion = {
            title:'判断测试',
            type:'判断题',
            descripe:'今有雉兔同笼，上有三十五头，下有九十四足，现有条件无法得出雉兔各几何',
            options:['对','错'],
            answer:'错'
        }

        //    名词解释题模板
        $scope.explanQuestion = {
            title:'名词解释测试',
            type:'名词解释题',
            descripe:'四合院',
            answer:'四合院，又称四合房，是中国的一种传统合院式建筑，其格局为一个院子四面建有房屋，从四面将庭院合围在中间，故名四合院。'
        }

        //    简答题模板
        $scope.shortanswerQuestion = {
            title:'简答测试',
            type:'简答题',
            descripe:'今有雉兔同笼，上有三十五头，下有九十四足，问雉兔各几何？',
            answer:'兔子12只 鸡23只'
        }
    }
    //切换题目类型
    $scope.changeEditType = function(type){
        switch (type) {
            case '选择题': $scope.nowEdited = $scope.choiceQuestion;break;
            case '填空题': $scope.nowEdited = $scope.fillblankQuestion;break;
            case '判断题': $scope.nowEdited = $scope.judgementQuestion;break;
            case '名词解释题': $scope.nowEdited = $scope.explanQuestion;break;
            case '简答题': $scope.nowEdited = $scope.shortanswerQuestion;break;
        }
    }
    $scope.addItem = function(){
        // $scope.refresh($scope.nowEdited)
        if($scope.nowEdited.type == '选择题'){
            if(-1 != $scope.nowEdited.options.indexOf('')){
                alert('选项'+($scope.nowEdited.options.indexOf('')+1)+'内容不能为空！')
                return
            }
            $scope.nowEdited.options.push('');
            return
        }
        if(-1 != $scope.nowEdited.answer.indexOf('')){
            alert('第'+($scope.nowEdited.answer.indexOf('')+1)+'空内容不能为空！')
            return
        }
        $scope.nowEdited.answer.push('');
    }
    $scope.delItem = function(item) {
        // $scope.refresh($scope.nowEdited)
        if ($scope.nowEdited.type == '选择题') {
            $scope.delArrItem($scope.nowEdited.options,item)
            return
        }
        $scope.delArrItem($scope.nowEdited.answer,item)
    }
    $scope.delArrItem = function(arr,item){
        arr.splice(arr.indexOf(item),1)
    }

    //刷新input的改变
    $scope.getInputVal = function (obj,index,val) {
        obj[index] = val;
    }
}
