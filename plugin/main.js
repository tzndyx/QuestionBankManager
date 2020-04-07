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

/*TODO
*question对象
* {
    id:'时间戳',
    title:"",
    type:"",
    descripe:"",
    options:[],
    answer:[]
}
*
*paper对象
* {
    id:'时间戳',
    title:"",
    descripe:"",
    choiceQuestion:[],
    fillblankQuestion:[],
    judgementQuestion:[],
    explanQuestion:[],
    shortanswerQuestion:[]
}
*
* question表--新建--questionAdd
* question表--修改--questionUpdate
* question表--完成--questionFinished
*
* paper表--新建--paperAdd
* paper表--修改--paperUpdate
* paper表--完成--paperFinished
*
* 表中存储的唯一索引为对象id，不同表的索引可以重复，如修改和完成
* localStroge存储的 key为时间戳 value为 question和paper对象
* 查询的对象为完成表   审核的对象为 新建表和修改表
*
* 新建的流程     创建对象 id为时间戳 ==> id保存到新建表（数组） ==> 对象存储到本地，key为id
* 审核的流程     获取并遍历新建表（数组）的id，得到所有新建的对象 ==>
*                   同意：id保存到完成表（数组），并从新建表（数组）中删除对应的id
*                   拒绝：根据id删除本地存储的对象，并从新建表（数组）中删除对应的id
*
* 修改的流程     创建修改的对象，id为原id ==> id保存到修改表（数组） ==> 对象存储到本地，key为id-1（本地存储的key值不能重复）
* 审核的流程     获取并遍历修改表（数组）的id-1，得到所有修改的对象 ==>
*                   同意：对象存储到本地，key为id，removeItem（id+'-1'）删除本地存储的修改对象，并从修改表（数组）中删除对应的id
*                   拒绝：removeItem（）删除本地存储的对象，并从修改表（数组）中删除对应的id
*
* 查询的流程     获取并遍历完成表（数组）的id，得到所有处理完成的对象
*
* */
