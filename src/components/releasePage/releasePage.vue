<template>
    <div class="releasePage">
        <!--Dialog-->
        <tipdialog></tipdialog>
        <!--dialog-->
    
        <!--Edit page-->
        <transition enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutDown">
            <editPage v-show="edit_page_show"
                      @cancel="cancelEdit"
                      @save="saveEdit"></editPage>
        </transition>
        <!--edit page-->
    
        <!--Appbar-->
        <mu-appbar title="发布">
            <!--back button-->
            <mu-icon-button icon="arrow_back"
                            slot="left"
                            @click="back"></mu-icon-button>
        </mu-appbar>
        <!--appbar-->
    
        <!--Text Block-->
        <mu-flexbox class="textblock"
                    orient="vertical"
                    align="center">
            <!--type select field-->
            <mu-select-field v-model="tab"
                             :fullWidth="true"
                             label="选择模块"
                             labelFocusClass="label-focus"
                             underlineFocusClass="underline-focus">
                <mu-menu-item value="ask"
                              title="问答" />
                <mu-menu-item value="share"
                              title="分享" />
                <mu-menu-item value="job"
                              title="招聘" />
            </mu-select-field>
    
            <!--title field-->
            <mu-text-field v-model="title"
                           label="标题"
                           hintText="10个字符以上"
                           :fullWidth="true"
                           labelFocusClass="label-focus"
                           underlineFocusClass="underline-focus" />
    
            <!--content textarea-->
            <div class="edit-button"
                 @click="showEdit">
                &nbsp&nbsp{{content?'文本已保存，可直接发布':'点击编辑正文'}}
            </div>
    
            <!--btn-->
            <mu-flat-button class="button-release"
                            @click="tapToRelease">{{release.isReleaseFetching?'发布中':'发布'}}</mu-flat-button>
        </mu-flexbox>
        <!--text block-->
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import tipdialog from '../../components/tipdialog/tipdialog'
import editPage from './editPage/editPage'
export default {
    data () {
        return {
            // ----- text filed
            tab: 'ask',
            title: '',
            content: '',
            // ----- edit page
            edit_page_show: false
        }
    },
    computed: {
        ...mapState([
            'login',
            'release'
        ])
    },
    components: {
        tipdialog,
        editPage
    },
    methods: {
        ...mapMutations([
            'HIDE_RELEASE_PAGE',
            'HIDE_MAIN_OVERFLOW',
            'SHOW_TIP_DIALOG',
            'HIDE_TIP_DIALOG'
        ]),
        // 返回上一页
        // ========
        back () {
            this.HIDE_RELEASE_PAGE();
            this.HIDE_MAIN_OVERFLOW();
        },
        // 点击发布话题
        // ==========
        tapToRelease () {
            let accesstoken = getCookie('accesstoken'),
                tab = this.tab,
                title = this.title,
                content = this.content,
                SucMsg = '发布成功',
                ErrMsg = '发布失败，请检查网络，或文本格式是否正确';

            // 前端过滤判断    
            if (!tab.length) {
                this.open('请选择模块');
                return
            }
            else if (title.length < 10) {
                this.open('话题标题字数不能小于10个')
                return
            } else if (!content.length) {
                this.open('文章内容不能为空')
                return
            };

            // 发送请求
            this.$store.dispatch('fetchReleaseAction', {
                accesstoken, title, tab, content, SucMsg, ErrMsg
            })
        },
        // dialog 显示
        open (text) {
            this.$store.commit('SHOW_TIP_DIALOG', {
                msg: text
            })
        },
        // edit page 显示
        showEdit () {
            this.edit_page_show = true;
        },
        cancelEdit () {
            this.edit_page_show = false;
        },
        saveEdit (content) {
            this.content = content;
            this.cancelEdit();
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.releasePage {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $ChildPage;
    width: 100%;
    height: 100%;
    background: #fff;
    .mu-appbar {
        background: $primary !important;
    }
    .textblock {
        width: 88%;
        margin-top: .32rem;
        @include center-block;
        .label-focus {
            color: $primary
        }
        .underline-focus {
            background: $primary
        }
        .edit-button {
            width: 100%;
            height: .88rem;
            margin-top: .24rem;
            line-height: .88rem;
            border-radius: 4px;
            color: $ExtraLightBlack;
            background: $ExtraLightGray;
        }
    }
    .button-release {
        margin-top: .54rem;
    }
}

.mu-menu-item-wrapper.active {
    color: $primary !important;
}
</style>
