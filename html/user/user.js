/**
 * @author tongzn
 */
// 注册申请
QBMsys.controller("acctapplyCtrl", acctapplyCtrl);
function acctapplyCtrl($scope){
    injectCommon($scope)
    $scope.init = function(){
        $scope.goNext(1);
        $scope.errorMsg = '';
    }
    $scope.goNext = function (step) {
        if(step == 1) {
            $scope.titleLine = [
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/yin.png',
                '../../img/user/blueline.png',
                '../../img/user/yin.png'
            ]
        }else
        if(step == 2){
            //注册信息校验

            $scope.titleLine = [
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/yin.png'
            ]
        }else
        if(step == 3){
            // 密码格式校验

            $scope.titleLine = [
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/xian.png',
            ]
        }
        $scope.step = step;
    }
}


//用户信息
QBMsys.controller("userinfoCtrl", userinfoCtrl);
function userinfoCtrl($scope) {
    injectCommon($scope)
    $scope.init = function(){
        $scope.userInfoList = [{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        },{
            title:'姓名',
            value:'张三'
        }]
    }
    $scope.doFocus = function (id) {
        document.getElementById(id).focus()
    }
}