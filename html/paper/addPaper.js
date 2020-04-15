/**
 * @author tongzn
 */

//题目添加页
QBMsys.controller("addPaperCtrl", addPaperCtrl);

function addPaperCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.paper = QBMsysUtils.getPaperTemplate();
        $scope.choiceQuestion = [];
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
        $scope.showQuestion = false;

        $scope.searchParams = {
            title: '',
            type: '',
            descFlag: true,
            author: ''
        }
        // 回车搜索
        document.onkeydown = function (event) {
            if(!$scope.showQuestion){return}
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                $scope.search()
            }
        };
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
    // {
    //     id: '',
    //     lastUpdate: "",
    //     title: "",
    //     descripe: "",
    //     choiceQuestion: [],  //以下五个字符串转数组
    //     fillblankQuestion: [],
    //     judgementQuestion: [],
    //     explanQuestion: [],
    //     shortanswerQuestion: []
    // }

    $scope.toAddQuestion = function (type) {
        $scope.searchParams.type = type;
        $scope.initData()
        $scope.showQuestion = true;
    }
    $scope.delQuestionItem = function(item,index){
        function dealDelete(attr,list) {
            list.splice(index,1);
            $scope.paper[attr].splice(index,1);
        }
        switch (item.type) {
            case '01': dealDelete('choiceQuestion',$scope.choiceQuestion);break;
            case '02': dealDelete('fillblankQuestion',$scope.fillblankQuestion);break;
            case '03': dealDelete('judgementQuestion',$scope.judgementQuestion);break;
            case '04': dealDelete('explanQuestion',$scope.explanQuestion);break;
            case '05': dealDelete('shortanswerQuestion',$scope.shortanswerQuestion);break;
        }
    }
    $scope.addQuestionItem = function(item){
        function addDelete(attr,list) {
            if(-1 != $scope.paper[attr].indexOf(item.id)){
                alert('此题已添加')
                return
            }
            list.push(item);
            $scope.paper[attr].push(item.id);
            $scope.showQuestion = false;
        }
        switch (item.type) {
            case '01': addDelete('choiceQuestion',$scope.choiceQuestion);break;
            case '02': addDelete('fillblankQuestion',$scope.fillblankQuestion);break;
            case '03': addDelete('judgementQuestion',$scope.judgementQuestion);break;
            case '04': addDelete('explanQuestion',$scope.explanQuestion);break;
            case '05': addDelete('shortanswerQuestion',$scope.shortanswerQuestion);break;
        }
    }
    $scope.submit = function(){
        if($scope.paper.title == ''){alert('试卷名称不能为空');return}
        if($scope.paper.choiceQuestion == ''){alert('选择题不能为空');return}
        if($scope.paper.fillblankQuestion == ''){alert('填空题不能为空');return}
        if($scope.paper.judgementQuestion == ''){alert('判断题不能为空');return}
        if($scope.paper.explanQuestion == ''){alert('名词解释题不能为空');return}
        if($scope.paper.shortanswerQuestion == ''){alert('简答题不能为空');return}
        operatePaper.create($scope.paper)
        alert('保存成功')
        $scope.paper = QBMsysUtils.getPaperTemplate();
        $scope.choiceQuestion = [];
        $scope.fillblankQuestion = [];
        $scope.judgementQuestion = [];
        $scope.explanQuestion = [];
        $scope.shortanswerQuestion = [];
    }

    // 试题列表的方法
    $scope.initData = function () {
        $scope.questionList = [];
        resultList = operateQuestion.getData('03');
        $scope.search();
        console.log($scope.questionList)
    }
    $scope.search = function (type) {
        $scope.questionList = [];
        type && ($scope.searchParams.descFlag = !$scope.searchParams.descFlag)
        $scope.questionList = resultList.filter(function (item) {
            if ($scope.searchParams.title != '' && $scope.searchParams.type != '' && $scope.searchParams.author != '') {
                return (-1 != item.title.indexOf($scope.searchParams.title) && $scope.searchParams.type == item.type && -1 != item.author.indexOf($scope.searchParams.author))
            } else if ($scope.searchParams.title == '' && $scope.searchParams.type != '' && $scope.searchParams.author != '') {
                return ($scope.searchParams.type == item.type && -1 != item.author.indexOf($scope.searchParams.author))
            } else if ($scope.searchParams.title != '' && $scope.searchParams.type == '' && $scope.searchParams.author != '') {
                return (-1 != item.title.indexOf($scope.searchParams.title) && -1 != item.author.indexOf($scope.searchParams.author))
            } else if ($scope.searchParams.title != '' && $scope.searchParams.type != '' && $scope.searchParams.author == '') {
                return (-1 != item.title.indexOf($scope.searchParams.title) && $scope.searchParams.type == item.type)
            } else if ($scope.searchParams.title == '' && $scope.searchParams.type == '' && $scope.searchParams.author != '') {
                return (-1 != item.author.indexOf($scope.searchParams.author))
            } else if ($scope.searchParams.title == '' && $scope.searchParams.type != '' && $scope.searchParams.author == '') {
                return (item.type == $scope.searchParams.type)
            } else if ($scope.searchParams.title != '' && $scope.searchParams.type == '' && $scope.searchParams.author == '') {
                return (-1 != item.title.indexOf($scope.searchParams.title))
            } else {
                return item
            }
        })
        $scope.questionList.sort(sortByTime)

        function sortByTime(a, b) {
            if ($scope.searchParams.descFlag) return (Number(a.lastUpdate) - Number(b.lastUpdate))
            else return (Number(b.lastUpdate) - Number(a.lastUpdate))
        }

        setTimeout(function () {
            $scope.$apply();//更新视图
        }, 10)
    }
}
