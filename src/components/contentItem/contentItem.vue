<template>
    <mu-paper class="content-item"
              :zDepth="1">
        <!--Top Box-->
        <div class="top-box">
            <!--avatar-->
            <div class="avatar">
                <img :src="list.author.avatar_url"
                     alt="">
            </div>
            <!--info-->
            <div class="info">
                <p class="username">{{list.author.loginname}}</p>
                <p class="title">{{list.title}}</p>
                <div class="tab">{{list.tab}}</div>
            </div>
        </div>
        <!--top box-->
    
        <!--Bottom Box-->
        <div class="bottom-box">
            <!--state-->
            <div class="state">
                <!--visit-->
                <div class="item">
                    <mu-icon value="visibility"
                             :size="14"
                             color="#99A9BF"></mu-icon>
                    <div class="text">{{list.visit_count}}</div>
                </div>
                <!--reply-->
                <div class="item">
                    <mu-icon value="textsms"
                             :size="14"
                             color="#99A9BF"></mu-icon>
                    <div class="text">{{list.reply_count}}</div>
                </div>
            </div>
    
            <!--time-->
            <div class="time">
                {{list.last_reply_at}}
            </div>
        </div>
        <!--bottom box-->
    </mu-paper>
</template>

<script>
export default {
    props: {
        list: {
            type: Object
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.content-item {
    width: 92%;
    padding: .24rem;
    margin-top: .32rem;
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
                color: $Silver;
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
                    color: $Black;
                    margin-left: .08rem;
                }
            }
        }
        .time {
            flex: 1;
            text-align: end;
            font-size: .24rem;
            color: $Black;
        }
    }
}
</style>
