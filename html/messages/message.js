/**
 * @author tongzn
 */

//新建留言
QBMsys.controller("addMessageCtrl", addMessageCtrl);
function addMessageCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        if($scope.uncompileable){return}
        $scope.user = QBMsysUtils.getUserInfo()
        $scope.message = QBMsysUtils.getMessageTemplate()
        $scope.message.type = '00';
    }
    $scope.submit = function () {
        if($scope.message.title == ''){
            alert('留言主题不能为空！')
            return
        }
        if($scope.message.describe == ''){
            alert('留言内容不能为空！')
            return
        }
        operateMessage.create($scope.message)
        alert('保存成功');
        $scope.message.title = '';
        $scope.message.describe = '';
    }
}

//新建、编辑公告和公告详情-- 公告管理要新增刷新按钮
QBMsys.controller("compileNoticeCtrl", compileNoticeCtrl);
function compileNoticeCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {sessionStorage.setItem('noticeRefershFlag','03');
        $scope.user = QBMsysUtils.getUserInfo();
        $scope.receiver1 = 1;
        $scope.receiver2 = 0;
        try {
            $scope.message.id != '';
            if($scope.message.type == '03'){
                $scope.receiver1 = 1;
                $scope.receiver2 = 2;
            }else if($scope.message.type == '02'){
                $scope.receiver1 = 0;
                $scope.receiver2 = 2;
            }else{
                $scope.receiver1 = 1;
                $scope.receiver2 = 0;
            }
        }catch (e) {
            $scope.message = QBMsysUtils.getMessageTemplate();
        }
    }
    $scope.submit = function () {
        $scope.message.type = $scope.receiver1 + $scope.receiver2;
        if($scope.message.title == ''){
            alert('公告主题不能为空！')
            return
        }
        if($scope.message.type == 0){
            alert('请至少选择一个接受对象！')
            return
        }
        if($scope.message.describe == ''){
            alert('公告内容不能为空！')
            return
        }
        $scope.message.type = '0' + $scope.message.type.toString();
        if($scope.message.id != ''){
            operateMessage.delete($scope.message.id);
        }
        operateMessage.create($scope.message);
        alert('保存成功');
        $scope.message.title = '';
        $scope.message.describe = '';
        $scope.receiver1 = 1;
        $scope.receiver2 = 0;
        if($scope.reBackFlag){
            localStorage.setItem('noticeRefershFlag','02');
            $scope.close();
        }
    }
    $scope.returnback = function () {
        localStorage.setItem('noticeRefershFlag','03');
        $scope.close();
    }
}

//我的消息   留言(管理员）、公告列表（非管理员）
QBMsys.controller("messageListCtrl", messageListCtrl);
function messageListCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.user = QBMsysUtils.getUserInfo();
        $scope.messageList = operateMessage.getData();
        $scope.messageList.sort(sortByTime)
        function sortByTime(a, b) {
            return (Number(b.id) - Number(a.id))
        }
        setTimeout(function () {
            $scope.$apply();//更新视图
        },10)
    }
}