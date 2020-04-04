/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("teacherCtrl", teacherCtrl);

function teacherCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        // TODO 生成试卷用洗牌算法
        $scope.questionList = [
            {
                id: '1',
                name: '填空题1垃圾的设计教案打飞机啊的',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题2',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题3',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题4',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题5',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题6',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题7',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题2',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题3',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题4',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题5',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题6',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题7',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题2',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题3',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题4',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题5',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题6',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题7',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题4',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题5',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题6',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }, {
                id: '1',
                name: '填空题7',
                type: '填空题',
                time: '2020-02-22',
                author: '张三',
                state: '1',
            }
        ];
        $scope.maxed = false;
        // 搜索条件列表
        $scope.searchList = {
            questionType:['选择题','判断题','填空题','名词解释题','简答题'],

        }
        // 搜索条件上送参数
        $scope.searchParams = {
            questionName:'',
            questionType: '请选择',
            questionTimeFlag:'0',//0 降序（最新的在上）  升序
            questionAuthor:''
        }

        // 回车搜索
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13

            }
        };
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
}
