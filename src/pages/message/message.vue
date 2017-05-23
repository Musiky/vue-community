<template>
    <div class="message">
        <!--Refresh Control-->
        <mu-refresh-control :refreshing="common.refresh.isShow"
                            :trigger="trigger"
                            @refresh="refresh" />
        <!--refresh control-->
    
        <!--Info Page-->
        <transition enter-active-class="animated slideInUp"
                    leave-active-class="animated slideOutDown">
            <infoPage v-show="info.isInfoPageShow"></infoPage>
        </transition>
        <!--info page-->
    
        <!--Login-->
        <mu-flexbox class="login"
                    orient="vertical"
                    v-if="!login.data.success">
            <!--image-->
            <img class="img"
                 src="./images/mountain.png"
                 alt="">
    
            <!--title-->
            <p class="title">登录后可查看未读消息</p>
    
            <!--button-->
            <div class="button-wrapper">
                <mu-raised-button label="登录"
                                  backgroundColor="#41b883"
                                  :fullWidth="true"
                                  @click="tapToLogin"></mu-raised-button>
            </div>
        </mu-flexbox>
        <!--login-->
    
        <!--Content-->
        <div class="content"
             v-else>
            <!--new msgs-->
            <div class="new-msgs">
                <!--title-->
                <div class="title">
                    &nbsp&nbsp&nbsp新消息({{HAS_NOT_READ_MESSAGES_COUNT}})
                    <div class="btn-mark-all"
                         @click="tapMarkAll"
                         v-show="HAS_NOT_READ_MESSAGES_COUNT">
                        {{message.isMarkAllFetching?'正在标记...':'全部已读'}}
                    </div>
                </div>
    
                <!--lists-->
                <div class="lists">
                    <!--tip-->
                    <p class="tip"
                       v-show="message.data.hasnot_read_messages.length === 0">没有消息</p>
    
                    <!--list-->
                    <div class="list"
                         :data-topicid="list.topic.id"
                         v-for="list in message.data.hasnot_read_messages"
                         @click="tapToInfo($event)">
    
                        <!--from-->
                        <mu-flexbox justify="space-between">
                            <div class="username">来自
                                <b>{{list.author.loginname}}</b>
                            </div>
                            <div class="time">{{list.reply.create_at | filterTime}}</div>
                        </mu-flexbox>
    
                        <!--body-->
                        <div class="body">
                            <span>回复了你的话题&nbsp</span>
                            <span class="topic-title">
                                {{list.topic.title}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    
            <!--past msgs-->
            <div class="past-msgs">
                <!--title-->
                <div class="title">
                    &nbsp&nbsp&nbsp已读消息
                </div>
                <!--lists-->
                <div class="lists">
                    <!--tip-->
                    <p class="tip"
                       v-show="message.data.has_read_messages.length === 0">没有消息</p>
                    <!--list-->
                    <div class="list"
                         :ref="'list_' + index"
                         :data-topicid="list.topic.id"
                         v-for="(list, index) in message.data.has_read_messages"
                         @click="tapToInfo($event)">
                        <!--from-->
                        <mu-flexbox justify="space-between">
                            <div class="username">来自
                                <b>{{list.author.loginname}}</b>
                            </div>
                            <div class="time">{{list.reply.create_at | filterTime}}</div>
                        </mu-flexbox>
    
                        <!--body-->
                        <div class="body">
                            <span>回复了你的话题&nbsp</span>
                            <span class="topic-title">
                                {{list.topic.title}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--content-->
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import { filterTime } from '../../assets/js/filters.js'
import infoPage from '../../components/infoPage/infoPage'
export default {
    data () {
        let accesstoken = getCookie('accesstoken');
        return {
            accesstoken,
            // ----- refresh control
            trigger: null
        }
    },
    mounted () {
        this.trigger = this.$el;
    },
    computed: {
        ...mapState([
            'login',
            'message',
            'info',
            'common'
        ]),
        ...mapGetters([
            'HAS_NOT_READ_MESSAGES_COUNT'
        ])
    },
    components: {
        infoPage
    },
    filters: {
        filterTime
    },
    methods: {
        ...mapMutations([
            'SHOW_MAIN_OVERFLOW',
            'TOGGLE_INFO_PAGE_DISPLAY',
            'SUC_COLLECT',
            'DEL_COLLECTED'
        ]),
        // 点击登录
        // =======
        tapToLogin () {
            if (!this.login.data.success) {
                this.$router.replace({ name: 'user' });
                this.$store.commit('HANDLE_CHANGE', 'user');
            }
        },
        // 标记全部已读
        // ==========
        tapMarkAll () {
            let accesstoken = this.accesstoken
            this.$store.dispatch('fetchMarkAllAction', {
                accesstoken
            })
        },
        // 进入详情页
        // =========
        tapToInfo (e) {
            let topicid = e.currentTarget.dataset.topicid;

            this.SHOW_MAIN_OVERFLOW();
            this.TOGGLE_INFO_PAGE_DISPLAY();
            this.$store.commit('COMMIT_ID', {
                id: topicid
            });

            // 请求数据放在了父级元素；
            // 因为不是 router 模式，子元素在没有获得 id 的情况下，就执行了 created
            this.$store.dispatch('fetchInfoAction', {
                topicid
            });

            // 点击打开详情页时匹配该文章是否被收藏
            this.checkCollected(this.login.userinfo.collect_topics, topicid)
        },
        // 检查该文章是否被收藏
        // ================
        checkCollected (collectedArr, topicid) {
            function contains (arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i].id === obj) {
                        return true
                    }
                }
                return false
            };

            if (contains(collectedArr, topicid)) {
                this.SUC_COLLECT()
            } else {
                this.DEL_COLLECTED()
            }
        },
        // 上拉刷新
        // =======
        refresh () {
            let accesstoken = this.accesstoken
            this.$store.dispatch('fetchMessageAction', {
                accesstoken,
                isRefresh: true
            })
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.message {
    background: #fff;
    .login {
        margin-top: 2rem;
        .img {
            width: 1.5rem;
            height: 1.5rem;
        }
        .title {
            font-size: .32rem;
            color: $ExtraLightBlack;
        }
        .button-wrapper {
            width: 2.5rem;
        }
    }
    .content {
        .new-msgs,
        .past-msgs {
            width: 100%;
            .title {
                position: relative;
                width: 100%;
                height: .66rem;
                line-height: .66rem;
                background: $ExtraLightGray;
                &:before {
                    content: '';
                    display: block;
                    width: 6px;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background: $Gray;
                }
                .btn-mark-all {
                    position: absolute;
                    right: .32rem;
                    top: 0;
                    font-size: .22rem;
                    color: $primary;
                }
            }
            .lists {
                .tip {
                    width: 100%;
                    text-align: center;
                }
                .list {
                    width: 100%;
                    padding: .32rem;
                    box-sizing: border-box;
                    color: $ExtraLightBlack;
                    border-bottom: 1px solid $ExtraLightGray;
                    &:last-child {
                        border-bottom: none;
                    }
                    .username,
                    .time {
                        color: lighten($ExtraLightBlack, 40%);
                    }
                    .body {
                        margin-top: .12rem;
                    }
                }
            }
        }
        .past-msgs {
            .lists {
                .list {
                    .time {
                        color: lighten($ExtraLightBlack, 50%) !important;
                    }
                    .body {
                        color: lighten($ExtraLightBlack, 50%);
                    }
                }
            }
        }
    }
}
</style>
