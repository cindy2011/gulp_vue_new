 // select封装
 Vue.component('my-select', {
     template: "#mySelect",
     data: function() {
         return {
             selectUl: false,
             selectValue: "",
             selectText: "点击选择渠道"
         }
     },
     props: ['select-data'],
     methods: {
         showSelectUl: function() {
             this.selectUl = true;
         },
         hideSelectUl: function(value, text) {
             this.selectUl = false;
             this.selectValue = value;
             this.selectText = text;
             this.$emit('selchange'); //事件只能小写
         }
     }
 });
Vue.http.options.emulateJSON = true;
 var vm = new Vue({
     el: "#main",
     data: {
         //select封装
         selectData: [{
             text: 'IOS',
             value: 5002
         }, {
             text: '安卓',
             value: 2151
         }],
         selectValue: "",
         selectText: "点击选择渠道",
         //弹框
         layoutObj: {
             layoutbg: false,
             layoutShare: false //微信分享弹框
         },
         layoutArr: {
             layoutbg: false,
             layout: false,
             layoutBook: false, //预约弹框
             layoutTips: false, //预约成功弹框
             layoutWeChat: false //微信公账号弹框
         },
         //新闻tab切换
         tabList: {
             lastest: true,
             news: false,
             notice: false,
             activity: false
         },
         //首个新闻的标题和地址
         tabConTitle: {
             title: "",
             url: ""
         },
         tabConArr: [], //新闻列表
         tabMore: "", //新闻更多地址
         //游戏资料
         novice: [],
         entry: [],
         advanced: [],
         //媒体专区
         mediatitleli: "", //当前媒体专区选中媒体名称
         mediatitleid: "", //当前媒体专区选中媒体id
         mediaTitle: [], //媒体专区媒体名称列表
         mediaList: [], //媒体专区新闻列表
         jobTitle: "zy2", //职业介绍
         //玩家交流
         player: "player1",
         player1Arr: [], //玩家提问列表
         player2Arr: [], //策划回复列表
         //列表页面
         NymediaList: [], //媒体专区列表页
         NytabConArr: [], //新闻专区列表页面
         mediaPage: 1, //媒体专区当前的页数
         tabPage: 1, //新闻模块当前的页数
         tabId: "", //新闻模块当前新闻类别id
         phonenum: "" //预约电话
     },
     mounted: function() {
         var self = this;
         //新闻模块（包含首页和列表页）
         this.$http.get('../tabnews.json',{ id: 1, page: self.tabPage }).then(function(response) {
                 self.tabMore = response.data.moreurl;
                 self.tabConTitle.title = response.data.newslist[0].title;
                 self.tabConTitle.url = response.data.newslist[0].url;
                 for (var i = 1; i < response.data.newslist.length; i++) {
                     self.NytabConArr.push(response.data.newslist[i]);
                     if (i < 5) {
                         self.tabConArr.push(response.data.newslist[i]);
                     }
                 }
             }, function(response) {

             })
             //游戏资料
         this.$http.get('../gamedata.json').then(function(response) {
                 for (var i = 0; i < response.data.novice.length; i++) {
                     self.novice.push(response.data.novice[i])
                 }
                 for (var i = 0; i < response.data.entry.length; i++) {
                     self.entry.push(response.data.entry[i])
                 }
                 for (var i = 0; i < response.data.advanced.length; i++) {
                     self.advanced.push(response.data.advanced[i])
                 }
             }, function(response) {

             })
             //媒体专区（包含首页和列表页面）
         this.$http.get('../media.json').then(function(response) {
             for (var i = 0; i < response.data.length; i++) {
                 self.mediatitleli = response.data[0].title;
                 self.mediatitleid = response.data[0].id;
                 self.mediaTitle.push(response.data[i])
             }
         }, function(response) {

         })
         this.$http.get('../medialist.json', { page: self.mediaPage,id: self.mediatitleid }, {emulateJSON: true}).then(function(response) {
                 for (var i = 0; i < response.data.length; i++) {
                     if (i < 5) {
                         self.mediaList.push(response.data[i]);
                     }
                     self.NymediaList.push(response.data[i]);
                 }
             }, function(response) {

             })
             //玩家交流 玩家提问
         this.$http.get('../medialist.json', { id: 1 }, {emulateJSON: true}).then(function(response) {
                 for (var i = 0; i < response.data.length; i++) {
                     self.player1Arr.push(response.data[i])
                 }
             }, function(response) {

             })
             //玩家交流 策划回复
         this.$http.get('../medialist.json', { id: 2 },{emulateJSON: true}).then(function(response) {
             for (var i = 0; i < response.data.length; i++) {
                 response.data[i].title = "【回复】" + response.data[i].title;
                 self.player2Arr.push(response.data[i])
             }
         }, function(response) {

         })

     },
     methods: {
         //select封装
         selectComChange: function() {
             var selectCom = this.$refs.selectCom;
             this.selectValue = selectCom.selectValue;
             this.selectText = selectCom.selectText;
         },
         //关闭弹出层
         closeLayout: function() {
             for (var x in vm.layoutObj) {
                 vm.layoutObj[x] = false;
             }
             for (var x in vm.layoutArr) {
                 vm.layoutArr[x] = false;
             }
         },
         //预约页面
         showBook: function() {
             vm.closeLayout();
             vm.layoutArr.layoutbg = true;
             vm.layoutArr.layout = true;
             vm.layoutArr.layoutBook = true;
         },
         //微信公众号
         showWeChat: function() {
             vm.closeLayout();
             vm.layoutArr.layoutbg = true;
             vm.layoutArr.layout = true;
             vm.layoutArr.layoutWeChat = true;
         },

         //微信分享提示
         showShare: function() {
             vm.closeLayout();
             vm.layoutObj.layoutbg = true;
             vm.layoutObj.layoutShare = true;
         },
         //提交预约信息
         submitInfo: function() {
             var flag = 1;
             //检查
             if (!vm.selectValue) {
                 alert("渠道不能为空!");
                 flag = 0;
                 return false;
             }
             if (!vm.phonenum) {
                 alert("号码不能为空!");
                 flag = 0;
                 return false;
             }
             if (!(/^1[3|4|5|7|8]\d{9}$/.test(vm.phonenum))) {
                 alert("号码错误!");
                 flag = 0;
                 return false;
             }
             if (flag) {
                 this.$http.put('../medialist.json', { type: vm.selectValue, num: vm.phonenum }).then(function(response) {
                     if (response.data.stutas) {
                         vm.showBookSuccess();
                     } else {
                         alert(response.data.msg);
                     }
                 }, function(response) {

                 })
             }
         },
         //预约成功提示
         showBookSuccess: function() {
             vm.closeLayout();
             vm.layoutArr.layoutbg = true;
             vm.layoutArr.layout = true;
             vm.layoutArr.layoutTips = true;
         },

         //新闻tab切换
         tabChange: function(tabName, tabId) {
             for (var x in vm.tabList) {
                 vm.tabList[x] = false;
             }
             vm.tabList[tabName] = true;
             vm.tabConArr = [];
             vm.tabId = tabId;
             vm.NytabConArr = [];
             //新闻模块
             this.$http.get('../tabnews.json', { cateid: tabId, page: 1 }).then(function(response) {
                 vm.tabMore = response.data.moreurl;
                 vm.tabConTitle.title = response.data.newslist[0].title;
                 vm.tabConTitle.url = response.data.newslist[0].url;
                 for (var i = 1; i < response.data.newslist.length; i++) {
                     vm.NytabConArr.push(response.data.newslist[i]);
                     if (i < 5) {
                         vm.tabConArr.push(response.data.newslist[i]);
                     }
                 }
             }, function(response) {

             })
         },
         //媒体专区切换
         mediaShowList: function(id, title) {
             this.mediatitleli = title;
             this.mediatitleid = id;
             this.mediaList = [];
             this.NymediaList = [];
             this.$http.get('../medialist.json', { id: id, page: 1 }).then(function(response) {
                     for (var i = 0; i < response.data.length; i++) {
                         if (i < 5) {
                             vm.mediaList.push(response.data[i]);
                         }
                         vm.NymediaList.push(response.data[i]);
                     }
                 },
                 function(response) {

                 })
         },
         //职业切换
         jobChange: function(job) {
             this.jobTitle = job;
         },
         //玩家交流切换
         playTab: function(name, id) {
             this.player = name;
         }
     }
 });

 $(function() {
     //溢彩神装轮播图
     var mySwiper = new Swiper('.cbswiper', {
             autoplay: 1000, //可选选项，自动滑动
             pagination: '.pageicon',
             paginationClickable: true,
             paginationType: 'custom',
             //设置自定义分页器的内容
             paginationCustomRender: function(swiper, current, total) {
                 var _html = '';
                 for (var i = 1; i <= total; i++) {
                     if (current == i) {
                         _html += '<li class="swiper-pagination-custom active"></li>';
                     } else {
                         _html += '<li class="swiper-pagination-custom"></li>';
                     }
                 }
                 return _html; //返回所有的页码html
             }
         })
         //溢彩神装给每个小图绑定跳转的事件   
     $('.pageicon').on('click', 'li', function() {
         var index = $(this).index();
         console.log(index);
         mySwiper.slideTo(index, 500, false); //切换到第一个slide，速度为1秒
         mySwiper.startAutoplay();
     });
     //首页banner轮播图
     var bannerSwiper = new Swiper('.banner', {
             autoplay: 1000, //可选选项，自动滑动
             pagination: '.bannericon',
             paginationClickable: true
         })
         //内页banner轮播图列表页
     var bannerSwiper = new Swiper('.banner2', {
             autoplay: 1000, //可选选项，自动滑动
             pagination: '.bannericon',
             paginationClickable: true
         })
         //游戏特色轮播图
     var gameSwiper = new Swiper('.gamets', {
             pagination: '.gametsicon',
             paginationClickable: true,
             centeredSlides: true,
             slidesPerView: 3,
             watchActiveIndex: true,
             slideVisibleClass: 'swiper-slide-visible'
         })
         //玩家交流轮播 
     $(window).load(function() {
             util.iscroll('roll1', -4, 150);
             util.iscroll('roll2', -4, 150);
         })
         //返回顶部
     $(".gotoTop").click(function(event) {
         $('html,body').animate({ scrollTop: 0 });
     });
     //返回上一级
     $(".goback").click(function(event) {
         history.back();
     });
     //加载更多
     $(window).scroll(function() {
         var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度) 
         // console.log("滚动条到顶部的垂直高度: " + $(document).scrollTop());
         // console.log("页面的文档高度 ：" + $(document).height());
         // console.log('浏览器的高度：' + $(window).height());
         if (($(document).height() - parseInt(srollPos)) == parseInt($(window).height())) {
             ++vm.tabPage;
             ++vm.mediaPage;
             $.get('../tabnews.json', { cateid: vm.tabId, page: vm.tabPage }, function(data) {
                 for (var i = 0; i < data.newslist.length; i++) {
                     vm.NytabConArr.push(data.newslist[i]);
                 }
             });
             $.get('../medialist.json', { id: vm.mediatitleid, page: vm.mediaPage }, function(data) {
                 for (var i = 0; i < data.length; i++) {
                     vm.NymediaList.push(data[i]);
                 }
             });
         }
     });
     //新浪微博，qq空间，百度贴吧分享
     var shareTitle = '《全民奇迹》全民奇迹原班团队打造';
     var shareTxt = '《全民奇迹》全民奇迹原班团队打造#神话永恒#官网正式上线啦！预约游戏即可赢取首发豪礼!';
     var shareUrl = 'http://sh.cmge.com/';
     var sharePic = '';     
     $(".sina_share").click(function() {
         var _uri = "http://service.weibo.com/share/share.php?c=nie&content=utf-8&source=nie&title=" + encodeURIComponent(shareTxt) + "&url=" + encodeURIComponent(shareUrl) + "&pic=" + encodeURIComponent(sharePic);
         window.location.href = _uri;
     });
     $('.qq_kongjian_share').click(function() {
         var _uri = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(shareUrl) + "&title=" + encodeURIComponent(shareTxt) + "&desc=" + encodeURIComponent(shareTxt) + "&pics=" + encodeURIComponent(sharePic);
         window.location.href = _uri;
     });
     $('.tieba').click(function() {
         var _uri = "http://tieba.baidu.com/f/commit/share/openShareApi?url=" + encodeURIComponent(shareUrl) + "&title=" + encodeURIComponent(shareTxt) + "&desc=" + encodeURIComponent(shareTxt);
         window.location.href = _uri;
     });
     //微信分享
     util.share({ title: "全新神话你来主宰！酷炫魔幻巅峰巨作《神话永恒》预约领壕礼！", contents: "属于你的永恒神话，预约赢取首测大礼包！", link: "http://sh.cmge.com/", icon: "http://sh.cmge.com/" });
 })
