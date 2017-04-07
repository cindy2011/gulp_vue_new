<template>
    <!-- 头部公用开始 -->
    <div class="fixbg">
        <dl>
            <dt class="icon fl"></dt>
            <dd class="fl">
                <h1>神话永恒</h1>
                <p>炫酷魔幻巅峰巨作</p>
            </dd>
        </dl>
        <a href="javascript:void(0)" class="book pa" @click="showBook"></a>
    </div>
    <!--  头部公用结束 -->
</template>
<script>
    export default{
        data(){
            return {}
        },
        methods:{
            showBook() {
                this.$emit('top-msg');
            }
        }
    }
</script>