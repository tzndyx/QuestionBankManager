/**
 * @author tongzn
 */
// 注册申请
QBMsys.controller("acctapplyCtrl", acctapplyCtrl);

function acctapplyCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.goNext(1);
        $scope.errorMsg = '';
        $scope.user = QBMsysUtils.getUserTemplate();
        $scope.subjectList = [
            {
                value: '0101',
                name: '车辆工程专业'
            },
            {
                value: '0102',
                name: '工业设计专业'
            },
            {
                value: '0201',
                name: '通信工程专业'
            },
            {
                value: '0202',
                name: '电气自动化专业'
            },
            {
                value: '0301',
                name: '会计电算化专业'
            },
            {
                value: '0302',
                name: '市场营销专业'
            },
            {
                value: '0303',
                name: '电子商务专业'
            },
            {
                value: '0401',
                name: '计算机科学与技术专业'
            },
            {
                value: '0402',
                name: '软件工程专业'
            },
            {
                value: '0403',
                name: '物联网专业'
            },
            {
                value: '0501',
                name: '冶金工程专业'
            },
            {
                value: '0502',
                name: '材料物理专业'
            },
        ];
        $scope.subject = $scope.subjectList[0];
        $scope.departmentList = [
            {
                value: '01',
                name: '机械工程学院'
            },
            {
                value: '02',
                name: '电子信息工程学院'
            },
            {
                value: '03',
                name: '经济管理学院'
            },
            {
                value: '04',
                name: '计算机科学与技术学院'
            },
            {
                value: '05',
                name: '材料科学与工程学院'
            },
        ];
        $scope.department = $scope.departmentList[0];
        $scope.authList = [
            {
                name: '教师',
                value: '01',
                title: '职工号',
                placeholder: '请输入职工号',
                length: 6,
                error: '请输入6位职工号'
            }, {
                name: '学生',
                value: '02',
                title: '学号',
                placeholder: '请输入学号',
                length: 12,
                error: '请输入12位学号'
            }
        ];
        $scope.authType = $scope.authList[0];
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
        $scope.cuorse = $scope.cuorseList[0];
        $scope.pwd = {
            pwd1:'',
            pwd2:''
        };

    }
    $scope.goNext = function (step) {
        if (step == 1) {
            $scope.titleLine = [
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/yin.png',
                '../../img/user/blueline.png',
                '../../img/user/yin.png'
            ]
        } else if (step == 2) {
            //注册信息校验

            $scope.titleLine = [
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/xian.png',
                '../../img/user/whiteline.png',
                '../../img/user/yin.png'
            ]
        } else if (step == 3) {
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

    $scope.deal = function(obj,attr){
        $scope[attr] = obj;
    }
    // 下一步
    $scope.toSetPwd = function () {
        $scope.errorMsg = '';
        if ($scope.user.name == '') {
            $scope.errorMsg = '注册用户名不能为空！';
            return
        }
        if ($scope.user.id.length != $scope.authType.length) {
            $scope.errorMsg = $scope.authType.error;
            return
        }
        if ($scope.user.email == '') {
            $scope.errorMsg = '邮箱不能为空！';
            return
        }
        $scope.goNext(2)
    }
    $scope.toSubmit = function () {
        $scope.errorMsg = '';
        if ($scope.pwd.pwd1.length > 12 || $scope.pwd.pwd1.length < 6){
            $scope.pwd.pwd1 = '';$scope.pwd.pwd2 = '';
            $scope.errorMsg = '请输入6~12位的密码！';
            return
        }
        if($scope.pwd.pwd1 != $scope.pwd.pwd2){
            $scope.pwd.pwd1 = '';$scope.pwd.pwd2 = '';
            $scope.errorMsg = '两次密码输入不一致！';
            return
        }

        $scope.user.authType = $scope.authType.value;
        $scope.user.department = $scope.department.value;
        $scope.user.pwd = $scope.pwd.pwd1;
        if($scope.user.authType == '01'){//教师 一个cuorseList subject不用（全部）
            $scope.user.cuorseList = $scope.cuorse.value;
        }else{//学生 不用cuorseList（全部） subject一个
            $scope.user.subject = $scope.subject.value;
        }
        operateUser.create($scope.user)

        $scope.goNext(3)
    }
}


//我的信息
QBMsys.controller("myInfoCtrl", myInfoCtrl);

function myInfoCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.user = QBMsysUtils.getUserInfo()
    }
    $scope.doFocus = function (id) {
        document.getElementById(id).focus()
    }
    $scope.submit = function () {
        operateUser.update($scope.user);
    }
}

// 用户信息
QBMsys.controller("userInfoCtrl", userInfoCtrl);

function userInfoCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.id = '8144';
        $scope.user = operateUser.query($scope.id)
    }
}

//修改密码
QBMsys.controller("changePwdCtrl", changePwdCtrl);

function changePwdCtrl($scope) {
    injectCommon($scope)
    $scope.init = function () {
        $scope.user = QBMsysUtils.getUserInfo();
        $scope.pwd = {
            pwd:'',
            pwd1:'',
            pwd2:''
        };
        $scope.errorMsg = ''
    }
    $scope.doFocus = function (id) {
        document.getElementById(id).focus()
    }
    $scope.submit = function () {
        $scope.errorMsg = '';
        if ($scope.pwd.pwd.length > 12 || $scope.pwd.pwd.length < 6) {
            $scope.errorMsg = '请输入6~12位的原密码！';
            return;
        }
        if ($scope.pwd.pwd1.length > 12 || $scope.pwd.pwd1.length < 6){
            $scope.pwd.pwd1 = '';$scope.pwd.pwd2 = '';
            $scope.errorMsg = '请输入6~12位的密码！';
            return
        }
        if($scope.pwd.pwd1 != $scope.pwd.pwd2){
            $scope.pwd.pwd1 = '';$scope.pwd.pwd2 = '';
            $scope.errorMsg = '两次密码输入不一致！';
            return
        }
        operateUser.changePwd($scope.pwd.pwd,$scope.pwd.pwd2)
    }
}