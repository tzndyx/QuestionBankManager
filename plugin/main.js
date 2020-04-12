/**
 * @author tongzn
 * 公共的模块化的方法
 */
function f() {
    // 构造原型方法 尽量不要,会污染语法环境
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
}
f()

const QBMsys = angular.module('QBMsys', []);
//过滤器-最后更新时间 时间戳转日期格式
QBMsys.filter('updateTime', function () {
    return function (text) {
        return new Date(parseInt(text) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    }
})
// 试题类型 选择题-01 填空题-02 判断题-03 名词解释题-04 简答题-05
QBMsys.filter('questionType', function () {
    return function (text) {
        switch (text) {
            case '01':return '选择题';
            case '02':return '填空题';
            case '03':return '判断题';
            case '04':return '名词解释题';
            case '05':return '简答题';
        }
    }
})
//注入公共方法，塞入路由传参
const injectCommon = (obj) => {
    console.log('info>> inject started')
    var baseUrl = '../../';
    var commonShowcompleteflag = true;
    obj.goto = function (target, params) {
        let route = router[target];
        params && sessionStorage.setItem('urlparams', JSON.stringify(params));
        window.location.href = baseUrl + route.url;
    }
    obj.goreplace = function (target, params) {
        let route = router[target];
        params && sessionStorage.setItem('urlparams', JSON.stringify(params));
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
        if (commonShowcompleteflag) {
            commonShowcompleteflag = false;
            setTimeout(function () {
                commonShowcompleteflag = true
            }, 500)
            $(".common_shortcuts").animate({'right': '0'}, 300);
        }
    }
    obj.commonHidecomplete = function () {
        $(".common_shortcuts").animate({'right': '-1.4rem'}, 300);
    }
    obj.backTOtop = function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    obj.goToHome = function () {
        obj.goto('questionMain')
    }
    obj.goToMsg = function () {

    }
    obj.commonToggleMenu = function (selector, flag) {
        flag && $(selector).slideDown(400);
        flag || $(selector).slideUp(400);
    }
    try {
        var params = JSON.parse(sessionStorage.getItem('urlparams'));
        for (let i in params) {
            obj[i] = params[i];
        }
        sessionStorage.removeItem('urlparams');
    } catch (e) {
        console.error('获取路由跳转时传递的值失败，请检查参数格式是否正确')
    }
    console.log('info>> inject finished')
    // TODO 设置openList
    // 'login.html' != window.location.pathname.split('/').reverse()[0] && sessionStorage.getItem('loginFlag') == null && obj.goto('login')
}
//常用工具方法模块
const QBMsysUtils = {
    // 获取时间戳
    'getTimeStamp': () => {
        return Math.round(new Date() / 1000)
    },
    // 转化需要保存和获取的数组跟JOSN对象  （都转为字符串）
    'saveArray': (arr) => {
        switch (arr.length) {
            case 0:return '';break;
            case 1:return arr[0];break;
            default :return arr.join(';');
        }
    },
    'getArray': (string) => {
        return string.split(';');
    },
    'saveJson': (json) => {
        return JSON.stringify(json);
    },
    'getJson': (string) => {
        return JSON.parse(string);
    },
    //根据JSON数组得到id的字符串
    'getIdString': (arr) => {
        let arrtemp = [];
        for (index in arr) {
            arrtemp.push(arr[index].id)
        }
        return this.saveArray(arrtemp);
    },
    //获取试题和试卷模板
    'getQuestionTemplate': () => {
        return {
            id: '',
            lastUpdate: "",
            title: "",
            type: "",
            descripe: "",
            options: [],//以下五个字符串转数组
            answer: []//元素为 答案在options中的下标（仅对选择和判断题有效）
        }
    },
    'getPaperTemplate': () => {
        return {
            id: '',
            lastUpdate: "",
            title: "",
            descripe: "",
            choiceQuestion: [],  //以下五个字符串转数组
            fillblankQuestion: [],
            judgementQuestion: [],
            explanQuestion: [],
            shortanswerQuestion: []
        }
    },
    'getUserInfo':()=>{
        return {
            userName:'张三'
        }
    },

}

// 操作试题的模块：新建试题保存   修改试题保存  审核试题保存  删除试题    查询试题
const operateQuestion = {
    'create': (question) => {
        // 保存对象到本地
        question.options && (question.options = QBMsysUtils.saveArray(question.options))
        question.answer && (question.answer = QBMsysUtils.saveArray(question.answer))
        question.id = QBMsysUtils.getTimeStamp()
        question.lastUpdate = QBMsysUtils.getTimeStamp();
        question.author = QBMsysUtils.getUserInfo().userName;
        let key = question.id;
        let value = QBMsysUtils.saveJson(question)
        window.localStorage.setItem(key, value)
        // 保存id到 questionCreate
        let questionCreate;
        try {
            questionCreate = QBMsysUtils.getArray(window.localStorage.getItem('questionCreate'))
        } catch (e) {
            questionCreate = []
        }
        questionCreate.push(key);
        window.localStorage.setItem('questionCreate', QBMsysUtils.saveArray(questionCreate));
        alert('保存成功')
    },
    'update': (id, question) => {
        // 保存对象到本地
        question.options && (question.options = QBMsysUtils.saveArray(question.options))
        question.answer && (question.answer = QBMsysUtils.saveArray(question.answer))
        question.id = id + "-1";
        question.lastUpdate = QBMsysUtils.getTimeStamp();
        question.author = QBMsysUtils.getUserInfo().userName;
        let key = question.id;
        let value = QBMsysUtils.saveJson(question)
        window.localStorage.setItem(key, value)
        // 保存id到 questionUpdate
        let questionUpdate;
        try {
            questionUpdate = QBMsysUtils.getArray(window.localStorage.getItem('questionUpdate'))
        } catch (e) {
            questionUpdate = []
        }
        questionUpdate.push(key);
        window.localStorage.setItem('questionUpdate', QBMsysUtils.saveArray(questionUpdate));
    },
    'examine': (id, flag) => { //审核对象id   审核通过 true     OR     拒绝 false
        if (-1 != id.indexOf('-1')) {//修改待审核
            // 从更新队列中删除
            let questionUpdate = QBMsysUtils.getArray(window.localStorage.getItem('questionUpdate'));
            questionUpdate.splice(questionUpdate.indexOf(id), 1);
            if (flag) {
                // 塞入完成队列中
                let key = id.split('-')[0];
                let questionFinished;
                try {
                    questionFinished = QBMsysUtils.getArray(window.localStorage.getItem('questionFinished'))
                } catch (e) {
                    questionFinished = []
                }
                questionFinished.push(key)
                // 更新本地存储的数据
                window.localStorage.setItem(key, window.localStorage.getItem(id))
            }
            window.localStorage.removeItem(id);
        } else {//新建待审核
            // 从新建队列中删除
            let questionCreate = QBMsysUtils.getArray(window.localStorage.getItem('questionCreate'));
            questionCreate.splice(questionCreate.indexOf(id), 1);
            if (flag) {
                // 塞入完成队列中
                let questionFinished;
                try {
                    questionFinished = QBMsysUtils.getArray(window.localStorage.getItem('questionFinished'))
                } catch (e) {
                    questionFinished = []
                }
                questionFinished.push(key)
                // 本地数据已存在，不需要更新
                return
            }
            window.localStorage.removeItem(id);
        }
    },
    'delete': (id) => {
        let questionFinished;
        try {
            questionFinished = QBMsysUtils.getArray(window.localStorage.getItem('questionFinished'))
        } catch (e) {
            questionFinished = []
        }
        questionFinished.splice(questionFinished.indexOf(id), 1);
        window.localStorage.removeItem(id);
        window.localStorage.setItem('questionFinished',QBMsysUtils.saveArray(questionFinished));
    },
    // 根据id获取试题对象
    'query': (id) => {
        try {
            let question = QBMsysUtils.getJson(localStorage.getItem(id))
            question.options && QBMsysUtils.getArray(question.options)
            question.answer && QBMsysUtils.getArray(question.answer)
            return QBMsysUtils.getJson(localStorage.getItem(id))
        } catch (e) {
            console.error('QBMsys logInfo >> 试题：' + id + ' 查询失败')
            return undefined
        }
    },
    // 获取试题数据 01-新建表    02-更新表  03-完成表
    'getData':(type)=>{
        let tabName = '';
        let questionData = [];
        let arr = [];
        switch (type) {
            case '01': tabName= 'questionCreate';break;
            case '02': tabName= 'questionUpdate';break;
            case '03': tabName= 'questionFinished';break;
        }
        // localStorage.setItem('questionUpdate',localStorage.getItem('questionCreate'))
        // localStorage.setItem('questionFinished',localStorage.getItem('questionCreate'))
        arr = QBMsysUtils.getArray(localStorage.getItem(tabName));
        for (i in arr){
            questionData.push(operateQuestion.query(arr[i]))
        }
        return questionData.filter((item)=>{
            return (item != undefined)
        });
    }
}
// 操作试卷的模块：新建试卷保存   修改试卷保存  审核试卷保存  删除试卷    查询试卷
const operatePaper = {
    'create': (paper) => {
        // 保存对象到本地--试卷对象不会保存试题，只会以字符串形式保存试题的id
        paper.choiceQuestion && (paper.choiceQuestion = QBMsysUtils.getIdArray(paper.choiceQuestion))
        paper.fillblankQuestion && (paper.fillblankQuestion = QBMsysUtils.getIdArray(paper.fillblankQuestion))
        paper.judgementQuestion && (paper.judgementQuestion = QBMsysUtils.getIdArray(paper.judgementQuestion))
        paper.explanQuestion && (paper.explanQuestion = QBMsysUtils.getIdArray(paper.explanQuestion))
        paper.shortanswerQuestion && (paper.shortanswerQuestion = QBMsysUtils.getIdArray(paper.shortanswerQuestion))
        paper.id = QBMsysUtils.getTimeStamp()
        paper.lastUpdate = QBMsysUtils.getTimeStamp();
        paper.author = QBMsysUtils.getUserInfo().userName;
        let key = paper.id;
        let value = QBMsysUtils.saveJson(paper)
        window.localStorage.setItem(key, value)
        // 保存id到 paperCreate
        let paperCreate;
        try {
            paperCreate = QBMsysUtils.getArray(window.localStorage.getItem('paperCreate'))
        } catch (e) {
            paperCreate = []
        }
        paperCreate.push(key);
        window.localStorage.setItem('paperCreate', QBMsysUtils.saveArray(paperCreate));
    },
    'update': (id, paper) => {
        // 保存对象到本地--试卷对象不会保存试题，只会以字符串形式保存试题的id
        paper.choiceQuestion && (paper.choiceQuestion = QBMsysUtils.getIdArray(paper.choiceQuestion))
        paper.fillblankQuestion && (paper.fillblankQuestion = QBMsysUtils.getIdArray(paper.fillblankQuestion))
        paper.judgementQuestion && (paper.judgementQuestion = QBMsysUtils.getIdArray(paper.judgementQuestion))
        paper.explanQuestion && (paper.explanQuestion = QBMsysUtils.getIdArray(paper.explanQuestion))
        paper.shortanswerQuestion && (paper.shortanswerQuestion = QBMsysUtils.getIdArray(paper.shortanswerQuestion))
        paper.id = id + "-1";
        paper.lastUpdate = QBMsysUtils.getTimeStamp();
        paper.author = QBMsysUtils.getUserInfo().userName;
        let key = paper.id;
        let value = QBMsysUtils.saveJson(paper)
        window.localStorage.setItem(key, value)
        // 保存id到 paperUpdate
        let paperUpdate;
        try {
            paperUpdate = QBMsysUtils.getArray(window.localStorage.getItem('paperUpdate'))
        } catch (e) {
            paperUpdate = []
        }
        paperUpdate.push(key);
        window.localStorage.setItem('paperUpdate', QBMsysUtils.saveArray(paperUpdate));
    },
    'examine': (id, flag) => { //审核对象id   审核通过 true     OR     拒绝 false
        if (-1 != id.indexOf('-1')) {//修改待审核
            // 从更新队列中删除
            let paperUpdate = QBMsysUtils.getArray(window.localStorage.getItem('paperUpdate'));
            paperUpdate.splice(paperUpdate.indexOf(id), 1);
            if (flag) {
                // 塞入完成队列中
                let key = id.split('-')[0];
                let paperFinished;
                try {
                    paperFinished = QBMsysUtils.getArray(window.localStorage.getItem('paperFinished'))
                } catch (e) {
                    paperFinished = []
                }
                paperFinished.push(key)
                // 更新本地存储的数据
                window.localStorage.setItem(key, window.localStorage.getItem(id))
            }
            window.localStorage.removeItem(id);
        } else {//新建待审核
            // 从新建队列中删除
            let paperCreate = QBMsysUtils.getArray(window.localStorage.getItem('paperCreate'));
            paperCreate.splice(paperCreate.indexOf(id), 1);
            if (flag) {
                // 塞入完成队列中
                let paperFinished;
                try {
                    paperFinished = QBMsysUtils.getArray(window.localStorage.getItem('paperFinished'))
                } catch (e) {
                    paperFinished = []
                }
                paperFinished.push(key)
                // 本地数据已存在，不需要更新
                return
            }
            window.localStorage.removeItem(id);
        }
    },
    'delete': (id) => {
        let paperFinished;
        try {
            paperFinished = QBMsysUtils.getArray(window.localStorage.getItem('paperFinished'))
        } catch (e) {
            paperFinished = []
        }
        paperFinished.splice(paperFinished.indexOf(id), 1);
        window.localStorage.removeItem(id);
        window.localStorage.setItem('paperFinished',QBMsysUtils.saveArray(paperFinished));
    },
    // 根据id获取试卷对象
    'query': (id) => {
        function getJsonById(attribute) {
            let arr = QBMsysUtils.getArray(attribute)
            let arr2 = [];
            for (index in arr) {
                arr2.push(operateQuestion.query(arr[index]))
            }
            return arr2
        }

        try {
            let paper = localStorage.getItem(id);
            paper.choiceQuestion = getJsonById(paper.choiceQuestion);
            paper.fillblankQuestion = getJsonById(paper.fillblankQuestion);
            paper.judgementQuestion = getJsonById(paper.judgementQuestion);
            paper.explanQuestion = getJsonById(paper.explanQuestion);
            paper.shortanswerQuestion = getJsonById(paper.shortanswerQuestion);
            return paper
        } catch (e) {
            console.error('QBMsys logInfo >> 试卷：' + id + ' 查询失败')
        }
    },
    // 获取试卷数据 01-新建表    02-更新表  03-完成表
    'getData':(type)=>{
        let tabName = '';
        let paperData = [];
        let arr = [];
        switch (type) {
            case '01': tabName= 'paperCreate';break;
            case '02': tabName= 'paperUpdate';break;
            case '03': tabName= 'paperFinished';break;
        }
        arr = QBMsysUtils.getArray(localStorage.getItem(tabName));
        for (i in arr){
            paperData.push(operatePaper.query(arr[i]))
        }
        return paperData;
    }
}

/*TODO
*question对象
* {
    id:'时间戳',
    lastUpdate："修改提交的时间--新建提交、修改提交、审核提交",
    title:"",
    type:"",
    descripe:"",
    options:"",//以下五个字符串转数组
    answer:""
}
*
*paper对象
* {
    id:'时间戳',
    lastUpdate："修改提交的时间--新建提交、修改提交、审核提交",
    title:"",
    descripe:"",
    choiceQuestion:"",  //以下五个字符串转数组
    fillblankQuestion:"",
    judgementQuestion:"",
    explanQuestion:"",
    shortanswerQuestion:""
}
*
* question表--新建--questionCreate
* question表--修改--questionUpdate
* question表--完成--questionFinished
*
* paper表--新建--paperCreate
* paper表--修改--paperUpdate
* paper表--完成--paperFinished
*
* 表中存储的唯一索引为对象id，不同表的索引可以重复，如修改和完成
* localStorge存储的 key为时间戳 value为 question和paper对象
* 查询的对象为完成表   审核的对象为 新建表和修改表
* 表为数组，其保存的为对象（题目对象和试卷对象）的id
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
* 本地存储的key值和对象的id是同一个值  修改表中的key值和id都为 原值 加 字符串 ‘-1’
*
* */
