<template>
    <div class="content-item">
        <!--Complete Template-->
        <div class="complete"
             v-if="!simple">
            <!--Top Box-->
            <div class="top-box">
                <!--avatar-->
                <div class="avatar"
                     :data-id="list.id"
                     :data-userid="list.author_id"
                     :data-username="list.author.loginname"
                     @click="tapToUserInfo($event)">
                    <img :src="list.author.avatar_url"
                         alt="">
                </div>
                <!--info-->
                <div class="info"
                     :data-id="list.id"
                     :data-userid="list.author_id"
                     @click="tapToInfo($event)">
                    <p class="title">{{list.title}}</p>
    
                    <!--tab-->
                    <div class="tab">{{list.tab}}</div>
                </div>
            </div>
            <!--top box-->
    
            <!--Bottom Box-->
            <div class="bottom-box">
                <!--left-->
                <div class="left">
                    <!--username-->
                    <p class="username">{{list.author.loginname}}</p>
                    <!--time-->
                    <div class="time">
                        {{list.last_reply_at | filterTime}}
                    </div>
                </div>
    
                <!--right-->
                <div class="right">
                    <!--visit-->
                    <div class="item">
                        <mu-icon value="visibility"
                                 :size="14"
                                 color="#D3DCE6"></mu-icon>
                        <div class="text">{{list.visit_count}}</div>
                    </div>
                    <!--reply-->
                    <div class="item">
                        <mu-icon value="textsms"
                                 :size="14"
                                 color="#D3DCE6"></mu-icon>
                        <div class="text">{{list.reply_count}}</div>
                    </div>
                </div>
            </div>
            <!--bottom box-->
        </div>
        <!--complete template-->
    
        <!--Simple Template-->
        <mu-flexbox class="simple"
                    v-if="simple">
            <!--avatar-->
            <div class="avatar"
                 :data-id="list.id"
                 :data-userid="list.author_id"
                 :data-username="list.author.loginname"
                 @click="tapToUserInfo($event)">
                <img :src="list.author.avatar_url"
                     alt="">
            </div>
    
            <!--info-->
            <div class="info"
                 :data-id="list.id"
                 :data-userid="list.author_id"
                 @click="tapToInfo($event)">
                <!--title-->
                <div class="title">{{list.title}}</div>
    
                <!--userinfo-->
                <mu-flexbox class="userinfo">
                    <div class="username">{{list.author.loginname}}</div>
                    <div class="time">{{list.last_reply_at | filterTime}}</div>
                </mu-flexbox>
            </div>
        </mu-flexbox>
        <!--simple template-->
    </div>
</template>

<script>
import { filterTime } from '../../assets/js/filters.js'
export default {
    props: {
        list: {
            type: Object
        },
        // 是否采用简洁模版
        simple: {
            type: Boolean,
            default: false
        }
    },
    filters: {
        filterTime
    },
    methods: {
        // 点击进入详情页
        // ============
        tapToInfo (e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid
            this.$emit('info', info_id, user_id);
        },
        // 点击进入用户详情页
        // ===============
        tapToUserInfo (e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid,
                username = e.currentTarget.dataset.username;
            this.$emit('userInfo', info_id, user_id, username);
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.content-item {
    width: 100%;
    padding: .32rem;
    margin-top: .12rem;
    background: #fff;
    box-sizing: border-box;
    @include center-block;
    .complete {
        .top-box {
            position: relative;
            @include clearfix();
            .avatar {
                width: 1rem;
                height: 1rem;
                border-radius: 100%;
                overflow: hidden;
                background: $ExtraLightGray;
                @include float();
                img {
                    width: 1rem;
                    height: 1rem;
                }
            }
            .info {
                width: 65%;
                margin-left: .24rem;
                @include float();
                .title {
                    font-size: .28rem;
                    line-height: .46rem;
                    -webkit-margin-before: .5em;
                    color: $Black;
                }
                .tab {
                    position: absolute;
                    right: 0;
                    top: .18rem;
                    padding: .01rem .08rem;
                    background: $Gray;
                    border-radius: 4px;
                    font-size: .24rem;
                    color: #fff;
                }
            }
        }
        .bottom-box {
            display: flex;
            margin-top: .24rem;
            color: darken($Gray, 20%);
            .left {
                flex: 1;
                display: flex;
                align-items: center;
                .username {

                    padding: 0 !important;
                    -webkit-margin-before: 0em;
                    -webkit-margin-after: 0em;
                }
                .time {
                    margin-left: .24rem;
                    font-size: .24rem;
                }
            }
            .right {
                display: flex;
                .item {
                    display: flex;
                    align-items: center;
                    &:first-child {
                        margin-right: .16rem;
                    }
                    .text {
                        font-size: .24rem;
                        margin-left: .08rem;
                    }
                }
            }
        }
    }
    .simple {
        .avatar {
            width: .88rem;
            height: .88rem;
            background: $ExtraLightGray;
            border-radius: 100%;
            overflow: hidden;
            img {
                width: .88rem;
                height: .88rem;
            }
        }
        .info {
            flex: 1;
            margin-left: .24rem;
            .title {
                font-size: .28rem;
            }
            .userinfo {
                margin-top: .08rem;
                .username,
                .time {
                    font-size: .2rem;
                    color: darken($Gray, 20%);
                }
                .time {
                    margin-left: .12rem;
                }
            }
        }
    }
}
</style>
