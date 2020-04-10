// 添加试题
// 选择题-01 填空题-02 判断题-03 名词解释题-04 简答题-05
const choice1 = '{id:"1302360231",lastUpdate:"1302360231",title:"选择题01",type:"01",descripe:"关于ajax的说法不正确的是",options:"ajax的核心是 XMLHttpRequest对象。;ajax可以用于异步通信。;服务器端不做特殊处理的情况下，通过ajax不可能实现跨域访问。;使用ajax必须要引入实现了它的第三方库，如jQuery。",answer:"3"}';
const choice2 = '{id:"1302320631",lastUpdate:"1302320631",title:"选择题02",type:"01",descripe:"下面哪个不是ECMAScript 2015 的新特性",options:"解构;UMD;Promise;箭头函数",answer:"1"}';
const fillblank1 = '{id:"1333943031",lastUpdate:"1333943031",title:"填空题01",type:"02",descripe:"今有雉兔同笼，上有三十五头，下有九十四足，问有雉____兔____",options:"",answer:"12;23"}'
const fillblank2 = '{id:"1586445436",lastUpdate:"1586445436",title:"填空题02",type:"02",descripe:"今有物不知其数，三三数之剩二，五五数之剩三，七七数之剩二。问物至少为____",options:"",answer:"23"}'
const judgement1 = '{id:"1333984636",lastUpdate:"1333984636",title:"判断题01",type:"03",descripe:"可以通过post的形式实现jsonp的跨域请求。",options:"T;F",answer:"0"}'
const judgement2 = '{id:"1365520636",lastUpdate:"1365520636",title:"判断题02",type:"03",descripe:"sessionStorage在浏览器的页签关闭之后依然有效。",options:"T;F",answer:"1"}'
const explan1 = '{id:"1397056636",lastUpdate:"1397056636",title:"名词解释题01",type:"04",descripe:"计算机系统结构",options:"",answer:"指的是计算机系统的软、硬件的界面，即机器语言程序员所看到的传统机器级所具有的属性。"}'
const explan2 = '{id:"1428592636",lastUpdate:"1428592636",title:"名词解释题02",type:"04",descripe:"指令",options:"",answer:"是一种经过编码的操作命令，它指定需要进行的操作，支配计算机中的信息传递以及主机与输入输出设备之间的信息传递，是构成计算机软件的基本元素。"}'
const shortanswer1 = '{id:"1460215036",lastUpdate:"1460215036",title:"简答题01",type:"05",descripe:"指令流水线的特点是什么（分条作答）",options:"",answer:"(1) 流水线把一个处理过程分解成若干个子过程，每个子过程由专用的功能段实现； (2) 各个功能段所需时间应尽量相等，否则，时间长的功能段将成为流水线的瓶颈，会造成流水线的“堵塞”和“断流”。(3) 流水线每个功能部件后面都有一个缓冲寄存器(4) 流水技术适合于大量重复的时序过程，只有输入端能连续地提供任务，流水线的效率才能充分发挥。(5) 流水线需要有通过时间和排空时间"}'
const shortanswer2 = '{id:"1491751036",lastUpdate:"1491751036",title:"简答题02",type:"05",descripe:"试以系列机为例，说明计算机系统结构、计算机组成和计算机实现三者之间的关系",options:"",answer:"计算机组成是计算机系统结构的逻辑实现;计算机实现是计算机组成的物理实现。系统结构可以有多种组成;一种组成可以有多种实现。同一系列机中各种型号的机器具有相同的系统结构,但采用不同的组成和实现技术,因而具有不同的性能和价格。"}'


var paper = {
    id:'时间戳',
    lastUpdate:"修改提交的时间--新建提交、修改提交、审核提交",
    title:"",
    descripe:"",
    choiceQuestion:"",  //以下五个字符串转数组
    fillblankQuestion:"",
    judgementQuestion:"",
    explanQuestion:"",
    shortanswerQuestion:""
}