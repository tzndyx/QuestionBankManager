/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("mianCtrl", mianCtrl);

function mianCtrl($scope) {
    injectCommon($scope)
    var resultList;
    $scope.init = function () {
        $scope.searchParams = {
            title: '',
            type: '',
            descFlag: true,
            author: ''
        }
        $scope.initData()
        // TODO 生成试卷用洗牌算法
        $scope.maxed = false;
        // 搜索条件列表
        $scope.questionType = {
            '': '全部',
            '01': '选择题',
            '02': '判断题',
            '03': '填空题',
            '04': '名词解释题',
            '05': '简答题'
        }
        // 回车搜索
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                $scope.search()
            }
        };
    }
    $scope.initData = function(){
        $scope.questionList = [];
        resultList = operateQuestion.getData('03');
        $scope.search();
        console.log($scope.questionList)
    }

    $scope.togleMaxed = function () {
        if ($scope.maxed) {
            $("#bar_common_header").slideDown(200);
            $("#bar_common_footer").slideDown(200);
            $(".teacher_main").css({'padding-top': '2.1rem', 'padding-bottom': '1.1rem'});
            $(".teacher_main_Q_title").css({'top': '1.5rem'})
            $scope.maxed = false;
        } else {
            $("#bar_common_header").slideUp(200);
            $("#bar_common_footer").slideUp(200);
            $(".teacher_main").css({'padding-top': '0.6rem', 'padding-bottom': '0.1rem'});
            $(".teacher_main_Q_title").css({'top': '0'})
            $scope.maxed = true;
        }
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
        },10)
    }
    $scope.deleteQuestion = function (item) {
        if(confirm('是否删除试题'+item.title)){
            operateQuestion.delete(item.id)
            alert("删除成功")
            $scope.initData()
        }
    }
}
