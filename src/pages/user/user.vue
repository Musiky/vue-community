<template>
    <div class="user">
        <!--Children Router-->
        <transition enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutDown">
            <router-view class="details"></router-view>
        </transition>
        <!--children router-->
    
        <!--Snackbar-->
        <snackbar v-show="common.snack.isShow"></snackbar>
        <!--snackbar-->
    
        <!--Progress-->
        <mainProgress v-show="login.isFetching"></mainProgress>
        <!--progress-->
    
        <transition enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    mode="out-in">
            <!--Log In-->
            <mu-flexbox class="login-wrapper"
                        orient="vertical"
                        key="no-login"
                        v-if="!login.data.success">
                <!--auth-->
                <mu-flexbox class="login"
                            align="center"
                            orient="vertical">
                    <!--text field-->
                    <mu-text-field icon="lock_outline"
                                   hintText="accessToken"
                                   v-model="accesstoken"
                                   underlineFocusClass="line-focus" />
    
                    <!--sign up button-->
                    <mu-raised-button label="注册"
                                      :fullWidth="true"
                                      href="https://www.vue-js.com/signup"></mu-raised-button>
    
                    <!--log in button-->
                    <mu-raised-button label="登录"
                                      :fullWidth="true"
                                      backgroundColor="#41b883"
                                      @click.native="tapToLogIn" />
                </mu-flexbox>
    
                <!--tip-->
                <div class="tip">
                    <mu-flexbox class="question">
                        <mu-icon value="help"
                                 :size="18"
                                 color="#e96900"></mu-icon>
                        <p @click="tapToToggleTip">如何获取 accessToken？</p>
                    </mu-flexbox>
    
                    <transition enter-active-class="animated flipInX"
                                leave-active-class="animated flipOutX">
                        <div class="content"
                             v-show="isTipShow">
                            <a href="https://www.vue-js.com/">官方网站</a> 登录后，在设置页面可以看到自己的 <b>accessToken</b>。<br/>
                            将 <b>accessToken</b> 复制，粘贴到⬆文本框，即可登录。
                        </div>
                    </transition>    
                </div>
            </mu-flexbox>
            <!--log in-->
    
            <!--User Info-->
            <mu-flexbox class="userinfo-wrapper"
                        orient="vertical"
                        key="is-login"
                        v-else>
                <!--info-->
                <mu-flexbox class="userinfo">
                    <!--avatar-->
                    <div class="avatar">
                        <img :src="login.data.avatar_url"
                             alt="">
                    </div>
                    <!--info-->
                    <div class="info">
                        <div class="username">{{login.data.loginname}}</div>
                        <div class="userid">ID: {{login.data.id}}</div>
                        <mu-flexbox class="score"
                                    justify="center">
                            <mu-icon value="stars"
                                     color="rgb(252, 192, 21)"
                                     :size="18"></mu-icon>
                            <div>&nbsp{{login.userinfo.score}}</div>
                        </mu-flexbox>
                    </div>
                </mu-flexbox>
    
                <!--action-->
                <mu-flexbox orient="vertical"
                            class="action-wrapper">
                    <!--item-->
                    <mu-flexbox class="action-item"
                                @click.native="tapToUserTopics('我收藏的话题', 'collect_topics')">
                        <mu-icon value="star"
                                 :size="20"
                                 style="color: #fcc015"></mu-icon>
                        <div class="title">
                            我收藏的话题
                        </div>
                        <div class="count"
                             v-if="COLLECTS_COUNT > 0">{{COLLECTS_COUNT}}</div>
                        <mu-icon value="navigate_next"
                                 style="position: absolute;right: 0;color: #D3DCE6"></mu-icon>
                    </mu-flexbox>
    
                    <!--item-->
                    <mu-flexbox class="action-item"
                                @click.native="tapToUserTopics('我参与的话题', 'recent_replies')">
                        <mu-icon value="chat"
                                 :size="20"
                                 style="color: #00b1fe"></mu-icon>
                        <div class="title">
                            我参与的话题
                        </div>
                        <div class="count"
                             v-if="REPLIES_COUNT > 0">{{REPLIES_COUNT}}</div>
                        <mu-icon value="navigate_next"
                                 style="position: absolute;right: 0;color: #D3DCE6"></mu-icon>
                    </mu-flexbox>
    
                    <!--item-->
                    <mu-flexbox class="action-item"
                                @click.native="tapToUserTopics('我最近的话题', 'recent_topics')">
                        <mu-icon value="bubble_chart"
                                 :size="20"
                                 style="color: #f86161"></mu-icon>
                        <div class="title">
                            我最近的话题
                        </div>
                        <div class="count"
                             v-if="MY_TOPICS_COUNT > 0">{{MY_TOPICS_COUNT}}</div>
                        <mu-icon value="navigate_next"
                                 style="position: absolute;top: 50%;right: 0;transform: translate3d(0, -50%, 0);color: #D3DCE6"></mu-icon>
    
                    </mu-flexbox>
                </mu-flexbox>
    
                <!--button-->
                <mu-flexbox class="btn-logout"
                            align="center"
                            justify="center"
                            @click.native="tapToLogOut">
                    退出登录
                </mu-flexbox>
            </mu-flexbox>
            <!--user info-->
        </transition>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import snackbar from '../../components/snackbar/snackbar'
import mainProgress from '../../components/mainProgress/mainProgress'
export default {
    data () {
        return {
            // ----- accesstoken
            accesstoken: '',
            // ----- tip
            isTipShow: false
        }
    },
    created () {
        // 如果 cookie 缓存存在，则显示 accesstoken
        let accesstoken = getCookie('accesstoken');
        if (accesstoken) {
            this.accesstoken = accesstoken
        }
    },
    computed: {
        ...mapState([
            'login',
            'common'
        ]),
        ...mapGetters([
            'REPLIES_COUNT',
            'COLLECTS_COUNT',
            'MY_TOPICS_COUNT'
        ])
    },
    components: {
        snackbar,
        mainProgress
    },
    methods: {
        ...mapMutations([
            'SHOW_MAIN_OVERFLOW',
            'LOGOUT',
            'CLEAR_MSG_DATA'
        ]),
        // ----- log in
        tapToLogIn () {
            // 判断输入
            if (!this.accesstoken) {
                this.$store.dispatch('showSnackbarAction', {
                    msg: 'accesstoken 不能为空',
                    isWarn: true
                })
                return
            }
            // 发送登录请求
            this.$store.dispatch('fetchUserAction', {
                accesstoken: this.accesstoken
            });
        },
        // ----- log out
        tapToLogOut () {
            this.LOGOUT();
            this.CLEAR_MSG_DATA();
            this.$store.dispatch('showSnackbarAction', {
                msg: '已退出登录',
                isWarn: false
            })
        },
        // ----- 跳转到 usertopics
        tapToUserTopics (title, type) {
            // 锁定根路由
            this.$store.commit('SHOW_MAIN_OVERFLOW');
            this.$router.push({ name: 'usertopics', params: { title, type } })
        },
        // 点击切换提示显示
        tapToToggleTip () {
            this.isTipShow = !this.isTipShow
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.user {
    background: $ExtraLightGray;
    .mu-text-field {
        &.focus-state {
            color: $primary !important;
        }
        .line-focus {
            background: $primary !important;
        }
    }
    .mu-raised-button {
        margin-top: .24rem;
    }
    .login-wrapper {
        .login {
            width: 70%;
            margin-top: .54rem;
            @include center-block;
        }
        .tip {
            width: 92%;
            margin-top: .64rem;
            .question {
                p {
                    font-weight: bold;
                    -webkit-margin-before: 0em;
                    -webkit-margin-after: 0em;
                    margin-top: .02rem;
                    margin-left: .08rem;
                }
            }
            .content {
                line-height: .48rem;
                padding: .24rem .4rem;
                box-sizing: border-box;
            }
        }
    }
    .userinfo-wrapper {
        .userinfo {
            width: 100%;
            height: 1.35rem;
            margin-top: .32rem;
            padding: 0 .24rem;
            box-sizing: border-box;
            background: #fff;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            .avatar {
                width: .96rem;
                height: .96rem;
                overflow: hidden;
                border-radius: 4px;
                background: $ExtraLightGray;
                img {
                    width: .96rem;
                    height: .96rem;
                }
            }
            .info {
                position: relative;
                flex: 1;
                margin-left: .24rem;
                .username {
                    font-size: .28rem;
                    font-weight: bold;
                    color: $Black;
                }
                .userid {
                    font-size: .22;
                    margin-top: .08rem;
                }
                .score {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 1.2rem;
                    height: .42rem;
                    border-radius: 5rem;
                    background: $ExtraLightGray;
                }
            }
        }
        .action-wrapper {
            margin-top: .32rem;
            background: #fff;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            .action-item {
                position: relative;
                height: .88rem;
                padding-left: .24rem;
                box-sizing: border-box;
                .title {
                    flex: 1;
                    height: 100%;
                    margin-left: .16rem;
                    border-bottom: 1px solid $LightGray;
                    display: flex;
                    align-items: center;
                    font-size: .28rem;
                }
                .count {
                    position: absolute;
                    top: 50%;
                    right: 24px;
                    transform: translate3d(0, -50%, 0);
                    width: .4rem;
                    height: .4rem;
                    line-height: .4rem;
                    text-align: center;
                    font-size: .2rem;
                    color: $LightBlack;
                    border-radius: 100%;
                    background: $LightGray;
                }
                &:last-child .title {
                    border-bottom: none;
                }
            }
        }
        .btn-logout {
            width: 100%;
            height: .88rem;
            background: #fff;
            margin-top: .32rem;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            font-size: .28rem;
        }
    }
    .details {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $ChildPage;
        width: 100%;
        height: 100%;
        background: $ExtraLightGray;
    }
}
</style>
