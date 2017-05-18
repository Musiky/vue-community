<template>
    <mu-flexbox class="repliesPage"
                orient="vertical">
    
        <!--Title-->
        <div class="title">&nbsp&nbsp{{info.data.reply_count}}条评论</div>
        <!--title-->
    
        <!--Content-->
        <mu-flexbox-item class="content-wrapper"
                         grow="1">
            <replyItem v-for="list in info.data.replies"
                       :list="list"></replyItem>
        </mu-flexbox-item>
        <!--content-->
    
        <!--Comment Bar-->
        <transition enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="comment-bar-wrapper"
                 v-if="replies.commentBarShow">
                <!--close bg-->
                <div class="close-bg"
                     @click="hideCommentBar"></div>
    
                <!--main-->
                <mu-flexbox orient="vertical"
                            justify="center"
                            align="center"
                            class="comment-bar">
                    <textarea v-model="comment_val"></textarea>
                    <mu-flat-button :label="replies.isFetching?'发送中...':'发送'"
                                    color="#41b883"
                                    @click="sendComment"></mu-flat-button>
                </mu-flexbox>
            </div>
        </transition>
        <!--comment bar-->
    
        <!--Appbar-->
        <mu-appbar>
            <!--icon back-->
            <mu-icon-button icon="arrow_back"
                            slot="left"
                            @click="back"></mu-icon-button>
    
            <!--button comment-->
            <div class="btn-comment"
                 @click="showCommentBar">
                &nbsp&nbsp说点什么吧
            </div>
        </mu-appbar>
        <!--appbar-->
    </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import replyItem from '../../components/replyItem/replyItem'
export default {
    data () {
        return {
            comment_val: ''
        }
    },
    props: {
        isNestPage: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState([
            'info',
            'replies'
        ])
    },
    components: {
        replyItem
    },
    methods: {
        ...mapMutations([
            'HIDE_MAIN_OVERFLOW',
            'HIDE_REPLIES_PAGE',
            'SHOW_COMMENT_BAR',
            'HIDE_COMMENT_BAR'
        ]),
        back () {
            if (!this.isNestPage) {
                this.HIDE_MAIN_OVERFLOW()
            } else {
                this.HIDE_REPLIES_PAGE()
            }
        },
        // 切换评论表单
        showCommentBar () {
            this.SHOW_COMMENT_BAR()
        },
        hideCommentBar () {
            this.HIDE_COMMENT_BAR()
        },
        // 发送评论请求
        sendComment () {
            let topicid = this.info.data.id,
                accesstoken = getCookie('accesstoken'),
                content = this.comment_val;
            this.$store.dispatch('sendCommentAction', {
                topicid,
                accesstoken,
                content
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.repliesPage {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $ChildPage;
    width: 100%;
    height: 100%;
    background: $ExtraLightGray;
    .title {
        position: relative;
        width: 100%;
        padding: .32rem;
        box-sizing: border-box;
        &:before {
            display: block;
            content: '';
            position: absolute;
            left: .32rem;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 4px;
            height: .28rem;
            background: $orange;
        }
    }
    .content-wrapper {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .comment-bar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $ChildPage;
        width: 100%;
        height: 100%;
        .close-bg {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .54);
        }
        .comment-bar {
            position: absolute;
            top: 15%;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            width: 80%;
            height: 4rem;
            background: #fff;
            textarea {
                display: block;
                width: 92%;
                height: 2.6rem;
                margin-bottom: .24rem;
                outline: none;
                resize: none;
                border: none;
                background: lighten($ExtraLightGray, 2%);
            }
        }
    }
    .mu-appbar {
        color: $Black !important;
        background: #fff !important;
        .btn-comment {
            flex: 1;
            height: 42px;
            line-height: 42px;
            font-size: .28rem;
            color: darken($Gray, 10%);
            background: $ExtraLightGray;
        }
    }
}
</style>
