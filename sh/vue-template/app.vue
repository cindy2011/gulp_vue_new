<template>
    <div id="main">
        <top v-on:top-msg="showBook"></top>
        <div class="bg1">
            <div class="logo"></div>
            <div class="focus" @click="showWeChat"><i class="focus-icon"></i>关注公众号</div>
            <div class="book2" @click="showBook"></div>
        </div>
        <div class="bg23">
            <div class="bg2">
                <div class="banner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"> <img src="images/banner.png" alt=""></div>
                        <div class="swiper-slide"> <img src="images/banner.png" alt=""></div>
                        <div class="swiper-slide"> <img src="images/banner.png" alt=""></div>
                        <div class="swiper-slide"> <img src="images/banner.png" alt=""></div>
                    </div>
                    <div class="bannericon"></div>
                </div>
                <!--  新闻模块 -->
                <ul class="tabtitle clear">
                    <li v-bind:class="{ 'active': tabList.lastest}" @click="tabChange('lastest',1)">最新</li>
                    <li v-bind:class="{ 'active': tabList.news}" @click="tabChange('news',2)">新闻</li>
                    <li v-bind:class="{ 'active': tabList.notice}" @click="tabChange('notice',3)">公告</li>
                    <li v-bind:class="{ 'active': tabList.activity}" @click="tabChange('activity',4)">活动</li>
                </ul>
                <div class="tabCon">
                    <h2><a  v-bind:href="tabConTitle.url" class="elli" v-html="tabConTitle.title"> </a></h2>
                    <ul>
                        <li v-for="item in tabConArr">
                            <a v-bind:href="item.url"><span v-html="item.title"></span><i v-html="item.date"></i></a></li>
                    </ul>
                    <a v-bind:href="tabMore" class="more">查看更多</a>
                </div>
            </div>
            <div class="bg3">
                <h2 class="white-title">游戏资料</h2>
                <dl>
                    <dt class="novice">新手</dt>
                    <dd>
                        <ul>
                            <li v-for="item in novice">
                                <a v-bind:href="item.url" v-html="item.title"></a>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl>
                    <dt class="entry">入门</dt>
                    <dd>
                        <ul>
                            <li v-for="item in entry">
                                <a v-bind:href="item.url" v-html="item.title"></a>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <dl class="noneb">
                    <dt class="advanced">进阶</dt>
                    <dd>
                        <ul>
                            <li v-for="item in advanced">
                                <a v-bind:href="item.url" v-html="item.title"></a>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <a href="newslist.html" class="whitemore">查看更多</a>
            </div>
        </div>
        <h2 class="title">媒体专区</h2>
        <div class="mediazq">
            <ul class="mediatitle">
                <li v-for="item in mediaTitle" v-bind:class="{ 'active':mediatitleli==item.title}" v-html="item.title" @click="mediaShowList(item.id,item.title)"></li>
                <li><a href="medialist.html">更多</a></li>
            </ul>
        </div>
        <div class="medianews">
            <ul>
                <li v-for="item in mediaList"><a v-bind:href="item.url"><b v-html="item.title"></b><i v-html="item.date"></i></a></li>
            </ul>
        </div>
        <h2 class="title">玩家交流</h2>
        <ul class="player-pic">
            <li class="fl"><a href="javascript:alert('敬请期待')">积分兑好礼</a></li>
            <li class="fr"><i><a href="javascript:alert('敬请期待')">策划面对面</a></i></li>
        </ul>
        <div class="player-title"><i class="player-icon"></i><span @click="playTab('player1',1)">玩家提问</span> | <span @click="playTab('player2',2)">策划回复</span><a href="javascript:alert('敬请期待')" class="player-more fr">更多</a></div>
        <div class="medianews">
            <div id="roll1" v-bind:class="{'vs':player=='player1','vh':player=='player2'}">
                <ul>
                    <li v-for="item in player1Arr"><a v-bind:href="item.url"><b v-html="item.title"></b><i v-html="item.date"></i></a></li>
                </ul>
            </div>
            <div id="roll2" v-bind:class="{'vs':player=='player2','vh':player=='player1'}">
                <ul>
                    <li v-for="item in player2Arr"><a v-bind:href="item.url"><b v-html="item.title"></b><i v-html="item.date"></i></a></li>
                </ul>
            </div>
        </div>
        <h2 class="title">职业介绍</h2>
        <div class="job">
            <div class="job-pic">
                <div v-bind:class="{ 'block':jobTitle=='zy1'}">
                    <div class="zypic1-text  zypic-text"></div>
                    <div class="zypic1-pic  zypic-pic"></div>
                </div>
                <div v-bind:class="{ 'block':jobTitle=='zy2'}">
                    <div class="zypic2-text  zypic-text"></div>
                    <div class="zypic2-pic  zypic-pic"></div>
                </div>
                <div v-bind:class="{ 'block':jobTitle=='zy3'}">
                    <div class="zypic3-text  zypic-text"></div>
                    <div class="zypic3-pic  zypic-pic"></div>
                </div>
            </div>
            <ul class="job-title">
                <li class="zy1 " v-bind:class="{ 'active':jobTitle=='zy1'}" @click="jobChange('zy1')"><i></i></li>
                <li class="zy2" v-bind:class="{ 'active':jobTitle=='zy2'}" @click="jobChange('zy2')"><i></i></li>
                <li class="zy3" v-bind:class="{ 'active':jobTitle=='zy3'}" @click="jobChange('zy3')"><i></i></li>
            </ul>
        </div>
        <div class="bg4">
            <div class="cb">
                <div class="cbswiper">
                    <div class="swiper-wrapper">
                        <div class="cb1 swiper-slide"></div>
                        <div class="cb2 swiper-slide"></div>
                        <div class="cb3 swiper-slide"></div>
                        <div class="cb4 swiper-slide"></div>
                    </div>
                </div>
            </div>
            <div class="bg4Con">
                <h2 class="title">溢彩神装</h2>
                <p>多套神装，奢华神羽</p>
                <ul class="pageicon">
                    <li class="cb1-icon"></li>
                    <li class="cb2-icon"></li>
                    <li class="cb3-icon"></li>
                    <li class="cb4-icon"></li>
                </ul>
            </div>
        </div>
        <div class="bg5">
            <h2 class="white-title">游戏特色</h2>
            <div class="gamets">
                <div class="swiper-wrapper">
                    <div class="swiper-slide game-slide">
                        <img src="images/gamets-pic1.jpg">
                    </div>
                    <div class="swiper-slide game-slide">
                        <img src="images/gamets-pic1.jpg">
                    </div>
                    <div class="swiper-slide game-slide">
                        <img src="images/gamets-pic1.jpg">
                    </div>
                    <div class="swiper-slide game-slide">
                        <img src="images/gamets-pic1.jpg">
                    </div>
                    <div class="swiper-slide game-slide">
                        <img src="images/gamets-pic1.jpg">
                    </div>
                </div>
                <div class="gametsicon"></div>
            </div>
        </div>
        <nav>
            <li @click="showWeChat">关注公众号</li>
            <li @click="showShare">分享小伙伴</li>
            <li><a href="javascript:alert('敬请期待')">进入社区</a></li>
        </nav>
        <!-- 公用部分弹框开始 -->
        <layout1 :message="layoutObj" v-on:layout1-msg="closeLayout"></layout1>
        <layout2 :message="layoutArr" v-on:layout2-msg="closeLayout"></layout2>
        <!-- 公用部分弹框结束 -->
    </div>
</template>
<script>
import top from "./top.vue";
import layout1 from "./layout1.vue";
import layout2 from "./layout2.vue";
import axios from "axios";
export default {
    components: {
        'top': top,
        'layout1': layout1,
        'layout2': layout2
    },
    data() {
        return {
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
            tabId: "" //新闻模块当前新闻类别id
        }
    },
    mounted: function() {
        var self = this;
        //新闻模块（包含首页和列表页）
        axios.get('./tabnews.json', {
                params: {
                    id: 1,
                    page: self.tabPage
                }
            }).then(function(response) {
                self.tabMore = response.data.moreurl;
                self.tabConTitle.title = response.data.newslist[0].title;
                self.tabConTitle.url = response.data.newslist[0].url;
                for (var i = 1; i < response.data.newslist.length; i++) {
                    self.NytabConArr.push(response.data.newslist[i]);
                    if (i < 5) {
                        self.tabConArr.push(response.data.newslist[i]);
                    }
                }
            }).catch(function(response) {

            })
            //游戏资料
        axios.get('./gamedata.json').then(function(response) {
                for (var i = 0; i < response.data.novice.length; i++) {
                    self.novice.push(response.data.novice[i])
                }
                for (var i = 0; i < response.data.entry.length; i++) {
                    self.entry.push(response.data.entry[i])
                }
                for (var i = 0; i < response.data.advanced.length; i++) {
                    self.advanced.push(response.data.advanced[i])
                }
            }).catch(function(response) {

            })
            //媒体专区（包含首页和列表页面）
        axios.get('./media.json').then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                self.mediatitleli = response.data[0].title;
                self.mediatitleid = response.data[0].id;
                self.mediaTitle.push(response.data[i])
            }
        }).catch(function(response) {

        })
        axios.get('./medialist.json', {
            params: {
                page: self.mediaPage,
                id: self.mediatitleid
            }
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                if (i < 5) {
                    self.mediaList.push(response.data[i]);
                }
                self.NymediaList.push(response.data[i]);
            }
        }).catch(function(response) {

        })
    },
    methods: {

        //关闭弹出层
        closeLayout: function() {
            for (var x in this.layoutObj) {
                this.layoutObj[x] = false;
            }
            for (var x in this.layoutArr) {
                this.layoutArr[x] = false;
            }
        },
        //预约页面
        showBook: function() {
            this.closeLayout();
            this.layoutArr.layoutbg = true;
            this.layoutArr.layout = true;
            this.layoutArr.layoutBook = true;
        },
        //微信公众号
        showWeChat: function() {
            this.closeLayout();
            this.layoutArr.layoutbg = true;
            this.layoutArr.layout = true;
            this.layoutArr.layoutWeChat = true;
        },

        //微信分享提示
        showShare: function() {
            this.closeLayout();
            this.layoutObj.layoutbg = true;
            this.layoutObj.layoutShare = true;
        },
       
        //新闻tab切换
        tabChange: function(tabName, tabId) {
            for (var x in this.tabList) {
                this.tabList[x] = false;
            }
            this.tabList[tabName] = true;
            this.tabConArr = [];
            this.tabId = tabId;
            this.NytabConArr = [];
            //新闻模块
            axios.get('./tabnews.json', {
                cateid: tabId,
                page: 1
            }).then(function(response) {
                this.tabMore = response.data.moreurl;
                this.tabConTitle.title = response.data.newslist[0].title;
                this.tabConTitle.url = response.data.newslist[0].url;
                for (var i = 1; i < response.data.newslist.length; i++) {
                    this.NytabConArr.push(response.data.newslist[i]);
                    if (i < 5) {
                        this.tabConArr.push(response.data.newslist[i]);
                    }
                }
            }).catch(function(response) {

            })
        },
        //媒体专区切换
        mediaShowList: function(id, title) {
            this.mediatitleli = title;
            this.mediatitleid = id;
            this.mediaList = [];
            this.NymediaList = [];
            axios.get('./medialist.json', {
                id: id,
                page: 1
            }).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    if (i < 5) {
                        this.mediaList.push(response.data[i]);
                    }
                    this.NymediaList.push(response.data[i]);
                }
            }).catch(
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
}
</script>
