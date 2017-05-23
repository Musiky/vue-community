<template>
    <mu-flexbox class="editPage" orient="vertical">
        <!--Tabs-->
        <mu-tabs :value="activeTab"
                 lineClass="line"
                 @change="handleTabChange">
            <mu-tab value="edit"
                    title="编辑" />
            <mu-tab value="preview"
                    title="预览" />
        </mu-tabs>
        <!--tabs-->
    
        <!--Edit-->
        <mu-flexbox-item class="edit"
             v-if="activeTab === 'edit'">
            <mu-text-field v-model="content"
                           label="正文"
                           hintText="建议使用 Markdown 语法"
                           multiLine
                           :rows="10"
                           :rowsMax="12"
                           :fullWidth="true"
                           labelFocusClass="label-focus"
                           underlineFocusClass="underline-focus" />
        </mu-flexbox-item>
        <!--edit-->
    
        <!--Preview-->
        <mu-flexbox-item class="preview"
             v-html="markedContent"
             v-if="activeTab === 'preview'">
        </mu-flexbox-item>
        <!--preview-->
    
        <!--Button Group-->
        <mu-flexbox class="button-group"
                    justify="flex-end">
            <mu-flat-button label="保存"
                            color="#41b883"
                            @click="saveEdit"></mu-flat-button>
            <mu-flat-button label="取消"
                            color="#8492A6"
                            @click="cancelEdit"></mu-flat-button>
        </mu-flexbox>
        <!--button group-->
    </mu-flexbox>
</template>

<script>
import marked from 'marked'
export default {
    data () {
        return {
            // ----- tabs
            activeTab: 'edit',
            // ----- content
            content: ''
        }
    },
    computed: {
        markedContent () {
            return marked(this.content)
        }
    },
    methods: {
        // 切换选项卡
        handleTabChange (val) {
            this.activeTab = val
        },
        // 取消编辑
        cancelEdit () {
            this.$emit('cancel')
        },
        // 保存编辑
        saveEdit () {            
            this.$emit('save', this.markedContent)
        }
    }
}
</script>

<style lang="scss">
@import '../../../assets/sass/_base.scss';
.editPage {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: $ChildPage;
    .mu-tabs {
        background: $primary;
        .line {
            background: #fff;
        }
    }
    .edit {
        width: 88% !important;
        margin-top: .32rem;
        @include center-block;
        .label-focus {
            color: $primary
        }
        .underline-focus {
            background: $primary
        }
    }
    .preview {
        width: 100%;
        padding: .32rem;
        margin-top: 0 !important;
        box-sizing: border-box;
        background: $ExtraLightGray;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .button-group {
        width: 88%;
        margin: .32rem 0;  
        @include center-block;
    }
}
</style>
