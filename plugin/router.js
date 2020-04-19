/**
 * @author tongzn
 */

const router = {
    'login':{
        url: 'html/login/login.html',
        auth_check:false
    },
    'accountApply':{
        url: 'html/user/accountApply.html',
        auth_check:false
    },
    'selectFrame':{
        url: 'html/main/main.html',
        auth_check:true
    },
    'myInfo':{
        url: 'html/user/myInfo.html',
        auth_check:true
    },
    'userInfo':{
        url: 'html/user/userInfo.html',
        auth_check:true
    },
    'changePwd':{
        url: 'html/user/changePwd.html',
        auth_check:true
    },
    //试题
    'questionMain':{
        url: 'html/question/main.html',
        auth_check:true
    },
    'questiondetails':{
        url: 'html/question/questiondetails.html',
        auth_check:true
    },
    'addQuestion':{
        url: 'html/question/addQuestion.html',
        auth_check:true
    },
    // 试卷
    'paperMain':{
        url: 'html/paper/main.html',
        auth_check:true
    },
    'paperDetails':{
        url: 'html/paper/paperDetails.html',
        auth_check:true
    },
    'addPaper':{
        url: 'html/paper/addPaper.html',
        auth_check:true
    },
    // 管理员
    'adminMain':{
        url: 'html/admin/main.html',
        auth_check:true
    },

    /*只读详情页*/
    //试卷
    'readOnlyPaper':{
        url: 'html/readOnlyDetails/paperDetails.html',
        auth_check:true
    },
    //试题
    'readOnlyQuestion':{
        url: 'html/readOnlyDetails/questionDetails.html',
        auth_check:true
    },
    //用户
    'readOnlyUser':{
        url: 'html/readOnlyDetails/userDetails.html',
        auth_check:true
    },

    //启动时的默认路由
    '/': 'login'
}