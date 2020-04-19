/**
 * @author tongzn
 */

//教师操作界面
QBMsys.controller("mianCtrl", mianCtrl);

function mianCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.user = QBMsysUtils.getUserInfo();
        if($scope.user.authType == '00'){
            $scope.goreplace('adminMain');
        }else if($scope.user.authType == '01'){
            operateUser.setCuorse($scope.user.cuorseList)
            $scope.goreplace('questionMain');
        }else{
            $scope.cuorseList = [
                {
                    value: '01',
                    name: '大学英语'
                },
                {
                    value: '02',
                    name: '高等数学'
                },
                {
                    value: '03',
                    name: '编译原理'
                },
                {
                    value: '04',
                    name: '计算机导论'
                },
                {
                    value: '05',
                    name: '计算机组成原理'
                },
                {
                    value: '06',
                    name: '计算机体系结构'
                }
            ];
        }
    }
    $scope.pickCuorse = function (id) {
        operateUser.setCuorse(id);
        $scope.goto('questionMain')
    }

}
