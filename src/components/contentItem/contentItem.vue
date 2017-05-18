<template>
    <div class="content-item">
        <!--Top Box-->
        <div class="top-box">
            <!--avatar-->
            <div class="avatar"
                 :data-id="list.id"
                 :data-userid="list.author_id"
                 @click="tapToUserInfo">
                <img :src="list.author.avatar_url"
                     alt="">
            </div>
            <!--info-->
            <div class="info"
                 :data-id="list.id"
                 :data-userid="list.author_id"
                 @click="tapToInfo($event)">
                <p class="username">{{list.author.loginname}}</p>
                <p class="title">{{list.title}}</p>
    
                <!--tab-->
                <div class="tab"
                     v-if="!simple">{{list.tab}}</div>
            </div>
        </div>
        <!--top box-->
    
        <!--Bottom Box-->
        <div class="bottom-box"
             v-if="!simple">
            <!--state-->
            <div class="state">
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
    
            <!--time-->
            <div class="time">
                {{list.last_reply_at}}
            </div>
        </div>
        <!--bottom box-->
    </div>
</template>

<script>
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
    methods: {
        tapToInfo (e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid
            this.$emit('info', info_id, user_id);
        },
        tapToUserInfo (e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid
            this.$emit('userInfo', info_id, user_id);
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
    .top-box {
        position: relative;
        @include clearfix();
        .avatar {
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
            overflow: hidden;
            @include float();
            img {
                width: 1rem;
                height: 1rem;
            }
        }
        .info {
            width: 70%;
            margin-left: .24rem;
            @include float();
            .username {
                font-size: .32rem;
                font-weight: bold;
                color: $Black;
                padding: 0 !important;
                -webkit-margin-before: 0em;
                -webkit-margin-after: 0em;
            }
            .title {
                -webkit-margin-before: .5em;
                color: $ExtraLightBlack;
            }
            .tab {
                position: absolute;
                right: 0;
                top: 0;
                padding: .01rem .08rem;
                border: 1px solid $Silver;
                border-radius: 4px;
                font-size: .24rem;
                color: $ExtraLightBlack;
            }
        }
    }
    .bottom-box {
        display: flex;
        .state {
            display: flex;
            .item {
                display: flex;
                align-items: center;
                &:first-child {
                    margin-right: .16rem;
                }
                .text {
                    font-size: .24rem;
                    color: darken($Gray, 20%);
                    margin-left: .08rem;
                }
            }
        }
        .time {
            flex: 1;
            text-align: end;
            font-size: .24rem;
            color: $Gray;
        }
    }
}
</style>
