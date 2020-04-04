/**
 * @author tongzn
 * 公共的模块化的方法
 */
function f() {
    // history.go(0)
    setInterval(function () {
        location.reload()
    },2000)
}

const QBMsys = angular.module('QBMsys', []);
//注入公共方法，塞入路由传参
const injectCommon = function (obj) {
    console.log('info>> inject started')
    var baseUrl = '../../';
    var commonShowcompleteflag = true;
    obj.goto = function (target,params) {
        let route = router[target];
        params && sessionStorage.setItem('urlparams',JSON.stringify(params));
        window.location.href = baseUrl + route.url;
    }
    obj.goreplace = function (target,params) {
        let route = router[target];
        params && sessionStorage.setItem('urlparams',JSON.stringify(params));
        window.location.replace(baseUrl + route.url)
    }
    obj.goback = function (steps) {
        let step = steps || 0;
        window.history.back(step);
    }
    obj.goreturn = function (steps) {
        let step = steps || 0;
        window.history.back(step);
        window.location.reload();
    }
    //悬浮菜单的方法
    obj.commonShowcomplete = function () {
        if(commonShowcompleteflag){
            commonShowcompleteflag = false;
            setTimeout(function () {
                commonShowcompleteflag = true
            },500)
            $(".common_shortcuts").animate({'right':'0'},300);
        }
    }
    obj.commonHidecomplete = function () {
        $(".common_shortcuts").animate({'right':'-1.4rem'},300);
    }
    obj.backTOtop = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    obj.goToHome = function(){
        obj.goto('teacher')
    }
    obj.goToMsg = function () {

    }
    obj.commonToggleMenu = function (selector,flag) {
        flag && $(selector).slideDown(400);
        flag || $(selector).slideUp(400);
    }
    try {
        var params = JSON.parse(sessionStorage.getItem('urlparams'));
        for(let i in params){
            obj[i] = params[i];
        }
        sessionStorage.removeItem('urlparams');
    }catch (e) {
        console.error('获取路由跳转时传递的值失败，请检查参数格式是否正确')
    }
    console.log('info>> inject finished')
    // TODO 设置openList
    // 'login.html' != window.location.pathname.split('/').reverse()[0] && sessionStorage.getItem('loginFlag') == null && obj.goto('login')
}