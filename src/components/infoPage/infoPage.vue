<template>
    <mu-flexbox orient="vertical"
                class="info">
    
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
                <div class="reply-count">{{info.infoData.reply_count}}</div>
            </div>
    
            <!--button collection-->
            <mu-icon-button icon="star_border"
                            slot="right"></mu-icon-button>
        </mu-appbar>
        <!--appbar-->
    </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import mainProgress from '../../components/mainProgress/mainProgress'
import repliesPage from '../../components/repliesPage/repliesPage'
export default {
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
        filterTime (val) {
            if (!val) return '';
            // 测试时间戳: 1495159106281 => 2017/5/19 9:58
            // 正式时间戳: new Date(val).getTime()
            let creaTime = new Date(val).getTime(),
                curTime = new Date().getTime(),
                diffTime = curTime - creaTime,                // 毫秒差
                diffSecounds = Math.floor(diffTime / 1000),   // 秒差
                diffMinutes = Math.floor(diffSecounds / 60),  // 分钟差
                diffHours = Math.floor(diffMinutes / 60),     // 小时差
                diffDays = Math.floor(diffHours / 24);        // 天差
            
            if (diffMinutes === 0) {
                return diffSecounds + '秒前'
            }
            if (diffHours === 0) {
                return diffMinutes + '分钟前'
            }
            if (diffDays === 0) {
                return diffHours + '小时前'
            }
            if (diffDays > 0) {
                return diffDays + '天前'
            }
        }
    },
    methods: {
        ...mapMutations([
            'HIDE_MAIN_OVERFLOW',
            'TOGGLE_INFO_PAGE_DISPLAY',
            'SHOW_REPLIES_PAGE'
        ]),
        // 返回到父级路由
        // ============
        back () {
            if (!this.isNestPage) {
                this.HIDE_MAIN_OVERFLOW();
            }
            this.TOGGLE_INFO_PAGE_DISPLAY();
        },
        // 点击进入评论页面
        // =============
        tapToComment () {
            this.SHOW_REPLIES_PAGE()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/_base.scss';
.info {
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
        .textblock {
            
        }
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
    }
}
</style>
