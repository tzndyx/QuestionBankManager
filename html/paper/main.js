/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("mianCtrl", mianCtrl);

function mianCtrl($scope) {
    injectCommon($scope)
    $scope.paperList = []
    var resultList;
    $scope.init = function () {
        $scope.searchParams = {
            title: '',
            descFlag: true,
            author: ''
        }
        $scope.initData()
        // TODO 生成试卷用洗牌算法
        $scope.maxed = false;

        // 回车搜索
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //回车键的键值为13
                $scope.search()
            }
        };
    }
    $scope.initData = function(){
        $scope.paperList = [];
        resultList = operatePaper.getData('03');
        $scope.search();
        console.log($scope.paperList)
    }

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
    $scope.search = function (type) {
        $scope.paperList = [];
        type && ($scope.searchParams.descFlag = !$scope.searchParams.descFlag)
        $scope.paperList = resultList.filter(function (item) {
            if ($scope.searchParams.title != '' && $scope.searchParams.author != '') {
                return (-1 != item.title.indexOf($scope.searchParams.title) && -1 != item.author.indexOf($scope.searchParams.author))
            } else if ($scope.searchParams.title == '' && $scope.searchParams.author != '') {
                return (-1 != item.author.indexOf($scope.searchParams.author))
            }else if ($scope.searchParams.title != '' && $scope.searchParams.author == '') {
                return (-1 != item.title.indexOf($scope.searchParams.title))
            }else {
                return item
            }
        })
        $scope.paperList.sort(sortByTime)

        function sortByTime(a, b) {
            if ($scope.searchParams.descFlag) return (Number(a.lastUpdate) - Number(b.lastUpdate))
            else return (Number(b.lastUpdate) - Number(a.lastUpdate))
        }

        setTimeout(function () {
            $scope.$apply();//更新视图
        },10)
    }
    $scope.deletePaper = function (item) {
        if(confirm('是否删除试题'+item.title)){
            operatePaper.delete(item.id)
            alert("删除成功")
            $scope.initData()
        }
    }
    $scope.exportPaper = function (item) {

    }
}
