<template>
    <!-- 公用部分弹框开始 -->
    <div class="layoutbg" v-show="layoutObj.layoutbg" @click="closeLayout" v-cloak>
        <!-- 分享提示 -->
        <div class="layout-share" v-show="layoutObj.layoutShare" v-cloak>
            <div class="share-arrow"></div>
            <div class="share-text">
                点击右上角按钮分享给小伙伴
            </div>
        </div>
    </div>
    <!-- 公用部分弹框结束 -->
</template>
<script>
export default {
    props: ['message'],
    data() {
        return {
            layoutObj: this.message
        }
    },
    methods: {
        closeLayout(){
            (this).$emit('layout1-msg');
        }
    }
}
</script>
