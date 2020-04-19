/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("mianCtrl", mianCtrl);

function mianCtrl($scope) {
    injectCommon($scope);
    $scope.accountList = [];
    $scope.questionList = [];
    $scope.paperList = [];
    $scope.userList = [];
    $scope.noticeList = [];

    $scope.currenDealList = [];
    $scope.init = function () {
        $scope.initData('01',true)
        $scope.changeMenu('01');
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
        let resultList = $scope[$scope.searchParams.list.list];

        console.log('$scope.questionList>>'+$scope.searchParams.list.list)
        console.log(resultList)
        $scope.resultList = [];
        changeTime && ($scope.searchParams.descFlag = !$scope.searchParams.descFlag)
        $scope.resultList = resultList.filter(function (item) {
            if ($scope.searchParams.type == '01') {//审核 -- 提交者
                try {
                    return (-1 != item.author.indexOf($scope.searchParams.author))
                } catch (e) {
                    return (-1 != item.name.indexOf($scope.searchParams.author))
                }
            } else if ($scope.searchParams.type == '02') {//用户管理 -- 用户名
                if ($scope.searchParams.list.type == '教师') {
                    return (-1 != item.name.indexOf($scope.searchParams.author) && item.authType == '01')
                } else if ($scope.searchParams.list.type == '学生') {
                    return (-1 != item.name.indexOf($scope.searchParams.author) && item.authType == '02')
                } else {
                    return (-1 != item.name.indexOf($scope.searchParams.author))
                }
            } else {  //公告管理 //00-给管理员（建议） 01-给老师 02-给学生 03-给学生和老师
                if ($scope.searchParams.list.type == '教师') {
                    return (item.type != '00' && item.type != '02')
                } else if ($scope.searchParams.list.type == '学生') {
                    return (item.type != '00' && item.type != '01')
                } else {
                    return (item.type != '00')
                }
            }
        });
        $scope.resultList.sort(sortByTime)

        function sortByTime(a, b) {
            if ($scope.searchParams.descFlag) return (Number(a.lastUpdate) - Number(b.lastUpdate))
            else return (Number(b.lastUpdate) - Number(a.lastUpdate))
        }
        setTimeout(function () {
            $scope.$apply();//更新视图
        }, 10);
        console.log($scope.resultList)
    }

    $scope.initData = function (type, refershAll) {
        if (refershAll) {
            $scope.accountList = operateUser.getData('01');
            $scope.paperList = operatePaper.getData('01');
            $scope.paperList = $scope.paperList.concat(operatePaper.getData('02'));
            $scope.questionList = operateQuestion.getData('01');
            $scope.questionList = $scope.questionList.concat(operateQuestion.getData('02'));
            $scope.userList = operateUser.getData('02');
            $scope.noticeList = operateMessage.getData();
        } else {
            if (type == '01') { //审核管理
                $scope.accountList = operateUser.getData('01');
                $scope.paperList = operatePaper.getData('01');
                $scope.paperList = $scope.paperList.concat(operatePaper.getData('02'));
                $scope.questionList = operateQuestion.getData('01');
                $scope.questionList = $scope.questionList.concat(operateQuestion.getData('02'));
            } else if (type == '02') { //用户管理
                $scope.userList = operateUser.getData('02')
            } else { //公告管理
                $scope.noticeList = operateMessage.getData()
            }
        }
        console.log('$scope.questionList>>')
        console.log($scope.questionList)
    }
    $scope.changeMenu = function (type) {
        if ($scope.searchParams && $scope.searchParams.type == type) {
            return
        }
        $scope.initData(type);
        if (type == '01') { //审核管理
            $scope.examineType = [
                {
                    type: '账号申请',
                    list: 'accountList'
                }, {
                    type: '试题变更',
                    list: 'questionList'
                }, {
                    type: '试卷变更',
                    list: 'paperList'
                }
            ];
            $scope.searchParams = {
                type: type,
                list: {},
                descFlag: true,
                author: ''
            };
            $scope.searchParams.list = $scope.examineType[0];
        } else if (type == '02') { //用户管理
            $scope.examineType = [
                {
                    type: '学生',
                    list: 'userList'
                }, {
                    type: '教师',
                    list: 'userList'
                }
            ];
            $scope.searchParams = {
                type: type,
                list: {},
                descFlag: true,
                author: ''
            };
            $scope.searchParams.list = $scope.examineType[0];
        } else { //公告管理
            $scope.examineType = [
                {
                    type: '全部',
                    list: 'noticeList'
                }, {
                    type: '教师',
                    list: 'noticeList'
                }, {
                    type: '学生',
                    list: 'noticeList'
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
        $scope.searchParams.type = type;
        $scope.search()
    }
    /*审核*/
    $scope.doExamine = function (item, flag) {
        // 'examine': (id, flag) => { //审核对象id   审核通过 true     OR     拒绝 false
        // 试题、试卷、用户
        if ($scope.searchParams.list.type == "账号申请") {//用户
            operateUser.examine(item.id, flag)
        } else if ($scope.searchParams.list.type == "试题变更") {//试题
            operateQuestion.examine(item.id, flag)
        } else {//试卷
            operatePaper.examine(item.id, flag)
        }
        alert("审核成功！");
        $scope.initData($scope.searchParams.type);
        $scope.search()
    }

    /*用户管理-删除*/
    $scope.deleteUser = function (item) {
        if (confirm("是否删除用户") + item.name) {
            operateUser.delete(item.id)
        }
        alert("删除成功！");
        $scope.initData($scope.searchParams.type);
        $scope.search()
    }

    /*公告管理*/
    //添加
    $scope.toAddNotice = function () {

    }
    //删除
    $scope.deleteNotice = function (item) {
        if (confirm("是否删除公告") + item.title) {
            operateMessage.delete(item.id)
        }
        alert("删除成功！");
        $scope.initData($scope.searchParams.type);
        $scope.search()
    }

    /*查看详情-试题、试卷、用户（新增和存量）、公告*/
    $scope.toDetails = function (item) {
        let itemList = $scope.searchParams.list.list;
        switch (itemList) {
            case 'accountList':
            case 'userList': $scope.gotoNew('readOnlyUser',{id:item.id});break;//用户详情
            case 'questionList': $scope.gotoNew('readOnlyQuestion',{question:item});break;//试题详情
            case 'paperList': $scope.gotoNew('readOnlyPaper',{paper:item});break;//试卷详情
            case 'noticeList': ;break;//公告详情
        }
    }
}