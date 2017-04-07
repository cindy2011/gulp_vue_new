<template>
    <div class="select-box select-version" @click="showSelectUl"><i class="select-text" v-html="selectText"></i> <span></span>
        <ul v-show="selectUl">
            <li v-for="item in selectData" @click.stop="hideSelectUl(item.value,item.text)" v-html="item.text"></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
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
}
</script>
