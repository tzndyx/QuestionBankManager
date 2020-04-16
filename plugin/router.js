/**
 * @author tongzn
 */

const router = {
    'login':{
        url: 'html/login/login.html'
    },
    'accountApply':{
        url: 'html/user/accountApply.html'
    },
    'selectFrame':{
        url: 'html/main/main.html'
    },
    'userInfo':{
        url: 'html/user/userInfo.html'
    },
    //试题
    'questionMain':{
        url: 'html/question/main.html'
    },
    'questiondetails':{
        url: 'html/question/questiondetails.html'
    },
    'addQuestion':{
        url: 'html/question/addQuestion.html'
    },
    // 试卷
    'paperMain':{
        url: 'html/paper/main.html'
    },
    'paperDetails':{
        url: 'html/paper/paperDetails.html'
    },
    'addPaper':{
        url: 'html/paper/addPaper.html'
    },


    //启动时的默认路由
    '/': 'login'
}