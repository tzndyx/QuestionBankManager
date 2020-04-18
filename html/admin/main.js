/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("mianCtrl", mianCtrl);

function mianCtrl($scope) {
    injectCommon($scope);
    var accountList = [];
    var questionList = [];
    var paperList = [];
    var userList = [];
    var noticeList = [];

    $scope.currenDealList = [];
    $scope.init = function () {
        $scope.changeMenu('01');
        $scope.initData();
        // TODO 生成试卷用洗牌算法
        $scope.maxed = false;

        // 回车搜索
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                $scope.search()
            }
        };
    };
    $scope.togleMaxed = function () {
        if ($scope.maxed) {
            $("#bar_common_header").slideDown(200);
            $("#bar_common_footer").slideDown(200);
            $(".paper_main").css({'padding-top': '2.1rem', 'padding-bottom': '1.1rem'});
            $(".teacher_main_Q_title").css({'top': '1.5rem'})
            $scope.maxed = false;
        } else {
            $("#bar_common_header").slideUp(200);
            $("#bar_common_footer").slideUp(200);
            $(".paper_main").css({'padding-top': '0.6rem', 'padding-bottom': '0.1rem'});
            $(".teacher_main_Q_title").css({'top': '0'})
            $scope.maxed = true;
        }
    }
    $scope.search = function (changeTime) {

        // var accountList = [];
        // var questionList = [];
        // var paperList = [];
        // var userList = [];
        // var noticeList = [];
        let resultList = $scope.searchParams.type.list;
        $scope.resultList = [];
        changeTime && ($scope.searchParams.descFlag = !$scope.searchParams.descFlag)
        $scope.resultList = resultList.filter(function (item) {
            return (-1 != item.author.indexOf($scope.searchParams.author))
        })
        $scope.resultList.sort(sortByTime)

        function sortByTime(a, b) {
            if ($scope.searchParams.descFlag) return (Number(a.lastUpdate) - Number(b.lastUpdate))
            else return (Number(b.lastUpdate) - Number(a.lastUpdate))
        }

        setTimeout(function () {
            $scope.$apply();//更新视图
        }, 10)
    }
    $scope.changeMenu = function (type, initFlag) {
        if (type == '01') { //审核管理
            accountList = operateUser.getData('01');
            paperList = operatePaper.getData('01');
            paperList.concat(operatePaper.getData('02'));
            questionList = operateQuestion.getData('01');
            questionList.concat(operateQuestion.getData('02'));
            if (initFlag) {
                $scope.examineType = [
                    {
                        type: '账号申请',
                        list: accountList
                    }, {
                        type: '试题变更',
                        list: questionList
                    }, {
                        type: '试卷变更',
                        list: paperList
                    }
                ];
                $scope.searchParams = {
                    type: type,
                    list: {},
                    descFlag: true,
                    author: ''
                };
                $scope.searchParams.list = $scope.examineType[0];
            }
        } else if (type == '02') { //用户管理
            userList = operateUser.getData('02')
            if (initFlag) {
                $scope.examineType = [
                    {
                        type: '学生',
                        list: userList
                    }, {
                        type: '教师',
                        list: userList
                    }
                ];
                $scope.searchParams = {
                    type: type,
                    list: {},
                    descFlag: true,
                    author: ''
                };
                $scope.searchParams.list = $scope.examineType[0];
            }
        } else { //公告管理
            noticeList = operateMessage.getData()
            if (initFlag) {
                $scope.examineType = [
                    {
                        type: '全部',
                        list: noticeList
                    }, {
                        type: '仅教师',
                        list: noticeList
                    }, {
                        type: '仅学生',
                        list: noticeList
                    }
                ];
                $scope.searchParams = {
                    type: type,
                    list: {},
                    descFlag: true,
                    author: ''
                };
                $scope.searchParams.list = $scope.examineType[0];
            }
        }
        $scope.search()
    }
}