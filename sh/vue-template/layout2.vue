<template>
    <div class="layoutbg" v-show="layoutArr.layoutbg" v-cloak>
        <div class="layout" v-show="layoutArr.layout" v-cloak>
            <a href="javascript:void(0)" class="close fr" @click="closeLayout"></a>
            <!-- 预约 -->
            <div class="layout-book" v-show="layoutArr.layoutBook" v-cloak>
                <h2>手机预约</h2>
                <div id="rd1">
                    <my-select v-bind:select-data="selectData" v-on:selchange="selectComChange" ref="selectCom"></my-select>
                </div>
                <input type="text" placeholder="输入手机号预约公测礼包" v-model="phonenum">
                <a href="javascript:void(0)" class="bookbtn" @click="submitInfo"></a>
            </div>
            <!-- 成功 -->
            <div class="layout-tips" v-show="layoutArr.layoutTips" v-cloak>
                <h2 class="book-icon"><i></i>预约成功</h2>
                <p>您已成功领取预约礼包！</p>
                <div class="line"></div>
                <p class="tips"><i></i>关注官方微信，获取神界第一手资讯</p>
            </div>
            <!-- 公众号提示 -->
            <div class="layout-WeChat" v-show="layoutArr.layoutWeChat" v-cloak>
                <div class="code"><img src="images/code.png" alt=""></div>
                <div class="line"></div>
                <p class="tips"><i></i>长按识别二维码 获取神界第一手资讯</p>
            </div>
        </div>
    </div>
</template>
<script>
import select from "../../common/vue-template/select.vue";
import axios from "axios";
export default {
    components: {
        'my-select': select
    },
    props: ['message'],
    data() {
        return {
            layoutArr: this.message,
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
            phonenum:""
        }
    },
    methods: {
        //select封装
        selectComChange() {
            var selectCom = this.$refs.selectCom;
            this.selectValue = selectCom.selectValue;
            this.selectText = selectCom.selectText;
        },
        closeLayout() {
            (this).$emit('layout2-msg');
        },
        //提交预约信息
        submitInfo: function() {
            var flag = 1;
            //检查
            if (!this.selectValue) {
                alert("渠道不能为空!");
                flag = 0;
                return false;
            }
            if (!this.phonenum) {
                alert("号码不能为空!");
                flag = 0;
                return false;
            }
            if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.phonenum))) {
                alert("号码错误!");
                flag = 0;
                return false;
            }
            if (flag) {
                axios.get('./medialist.json', {
                    params: {
                        type: this.selectValue,
                        num: this.phonenum
                    }
                }).then(function(response) {
                    if (response.data.stutas) {
                        this.showBookSuccess();
                    } else {
                        alert(response.data.msg);
                    }
                }, function(response) {

                })
            }
        },
        //预约成功提示
        showBookSuccess: function() {
            this.closeLayout();
            this.layoutArr.layoutbg = true;
            this.layoutArr.layout = true;
            this.layoutArr.layoutTips = true;
        }

    }
}
</script>
