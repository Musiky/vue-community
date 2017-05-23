<template>
    <mu-flexbox class="infopage"
                orient="vertical">
    
        <!--Replies Page-->
        <transition enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutDown">
            <repliesPage :isNestPage="true"
                         v-show="info.isRepliesPageShow"></repliesPage>
        </transition>
        <!--replies page-->
    
        <!--Progress-->
        <mainProgress v-show="info.isInfoFetching"></mainProgress>
        <!--progress-->
    
        <!--Content-->
        <mu-flexbox-item grow="1"
                         class="content-wrapper">
            <div class="content">
                <!--title-->
                <p class="title">
                    {{info.infoData.title}}
                </p>
    
                <!--information-->
                <mu-flexbox class="information">
                    <!--userinfo-->
                    <mu-flexbox class="userinfo">
                        <div class="avatar">
                            <img :src="info.infoData.author.avatar_url"
                                 alt="">
                        </div>
                        <p class="username">{{info.infoData.author.loginname}}</p>
                    </mu-flexbox>
                    <!--time-->
                    <mu-flexbox-item class="time">
                        {{info.infoData.last_reply_at | filterTime}}
                    </mu-flexbox-item>
                </mu-flexbox>
    
                <!--textblock-->
                <div class="textblock"
                     v-html="info.infoData.content"></div>
            </div>
        </mu-flexbox-item>
        <!--content-->
    
        <!--Appbar-->
        <mu-appbar>
            <!--icon back-->
            <mu-icon-button icon="arrow_back"
                            slot="left"
                            @click="back"></mu-icon-button>
    
            <!--button comment-->
            <div class="btn-comment"
                 @click="tapToComment">
                &nbsp&nbsp说点什么吧
            </div>
    
            <!--button reply-->
            <div class="btn-reply"
                 slot="right"
                 @click="tapToComment">
                <mu-icon-button icon="chat"></mu-icon-button>
                <div class="reply-count" v-show="info.infoData.reply_count > 0">{{info.infoData.reply_count}}</div>
            </div>
    
            <!--button collection-->
            <mu-icon-button icon="star_border"
                            iconClass="collect"
                            slot="right"
                            v-show="!info.isCollected"
                            key="collect"
                            @click="tapToToggleCollect"></mu-icon-button>
            <mu-icon-button icon="star"
                            iconClass="collected"
                            slot="right"
                            v-show="info.isCollected"
                            key="collected"
                            @click="tapToToggleCollect"></mu-icon-button>
        </mu-appbar>
        <!--appbar-->
    </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import { filterTime } from '../../assets/js/filters.js'
import mainProgress from '../../components/mainProgress/mainProgress'
import repliesPage from '../../components/repliesPage/repliesPage'
export default {
    data () {
        return {
            isCollected: false
        }
    },
    props: {
        // ----- 是否是嵌套的页面
        isNestPage: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState([
            'info',
            'login'
        ])
    },
    components: {
        mainProgress,
        repliesPage
    },
    filters: {
        filterTime
    },
    methods: {
        ...mapMutations([
            'HIDE_MAIN_OVERFLOW',
            'TOGGLE_INFO_PAGE_DISPLAY',
            'CLEAR_INFO_DATA',
            'SHOW_REPLIES_PAGE',
            'HIDE_REPLIES_PAGE',
            'SUC_COLLECT',
            'DEL_COLLECTED'
        ]),
        // 返回到父级路由
        // ============
        back () {
            if (!this.isNestPage) {
                this.HIDE_MAIN_OVERFLOW();
            }
            this.TOGGLE_INFO_PAGE_DISPLAY();
            this.CLEAR_INFO_DATA();
        },
        // 点击进入评论页面
        // =============
        tapToComment () {
            this.SHOW_REPLIES_PAGE()
        },
        // 点击切换收藏状态
        // =============
        tapToToggleCollect () {
            let accesstoken = getCookie('accesstoken'),
                topicid = this.info.id,
                loginname = this.login.data.loginname;

            // 未登录
            if (!this.login.data.success) {
                this.$router.replace({ name: 'user' });
                this.TOGGLE_INFO_PAGE_DISPLAY();
                this.HIDE_REPLIES_PAGE();
                this.HIDE_MAIN_OVERFLOW();
                this.$store.commit('HANDLE_CHANGE', 'user');

                // 显示提示
                this.$store.dispatch('showSnackbarAction', {
                    msg: '请先登录',
                    isWarn: true
                });                
            } 
            // 已登录
            else {
                if (!this.info.isCollected) {
                    this.$store.dispatch('collectTopic', {
                        accesstoken, topicid, loginname
                    })
                }
                else if (this.info.isCollected) {
                    this.$store.dispatch('delCollectedTopic', {
                        accesstoken, topicid, loginname
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.infopage {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $ChildPage !important;
    width: 100%;
    height: 100%;
    background: #fff;
    .content-wrapper {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        @include center-block();
        .content {
            width: 92%;
            @include center-block;
        }
        .title {
            font-size: .36rem;
            font-weight: bold;
            line-height: .72rem;
            color: $Black;
        }
        .information {
            .userinfo {
                width: 2.5rem;
                .avatar {
                    width: .66rem;
                    height: .66rem;
                    border-radius: 100%;
                    overflow: hidden;
                    img {
                        width: .66rem;
                        height: .66rem;
                    }
                }
                .username {
                    color: $Black;
                    margin-left: .16rem;
                }
            }
            .time {
                text-align: end;
                color: $Gray;
            }
        }
        .textblock {}
    }
    .mu-appbar {
        color: $Black !important;
        background: #fff !important;
        .mu-icon-button {
            color: $Black !important;
        }
        .btn-comment {
            width: 3.8rem;
            height: 42px;
            line-height: 42px;
            font-size: .28rem;
            color: darken($Gray, 10%);
            background: $ExtraLightGray;
        }
        .btn-reply {
            position: relative;
            .reply-count {
                position: absolute;
                right: .08rem;
                top: .02rem;
                width: .35rem;
                height: .35rem;
                line-height: .35rem;
                border-radius: 100%;
                background: $orange;
                text-align: center;
                font-size: .2rem;
                color: #fff;
            }
        }
        .collected {
            color: $yellow;
        }
    }
}
</style>
