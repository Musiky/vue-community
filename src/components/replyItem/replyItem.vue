<template>
    <mu-flexbox class="replyItem"
                align="flex-start">
        <!--thumb up-->
        <mu-flexbox class="thumb-up-wrapper">
            <mu-icon-button icon="thumb_up"
                            iconClass="icon"
                            :data-replyid="list.id"
                            @click="tapThumbUp($event)"></mu-icon-button>
    
            <div class="ups-count">{{list.ups.length}}</div>
        </mu-flexbox>
    
        <!--Avatar-->
        <div class="avatar">
            <img :src="list.author.avatar_url"
                 alt="">
        </div>
        <!--avatar-->
    
        <!--Info-->
        <div class="info-wrapper">
            <!--username-->
            <div class="username">
                {{list.author.loginname}}
            </div>
    
            <!--reply time-->
            <div class="reply-time">
                {{list.create_at | filterTime}}
            </div>
    
            <!--content-->
            <div class="content"
                 v-html="list.content"></div>
        </div>
        <!--info-->
    </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import { filterTime } from '../../assets/js/filters.js'
export default {
    data () {
        let accesstoken = getCookie('accesstoken');
        return {
            accesstoken
        }
    },
    props: {
        list: {
            type: Object
        }
    },
    computed: {
        ...mapState([
            'info',
            'login'
        ])
    },
    filters: {
        filterTime
    },
    methods: {
        ...mapMutations([
            'TOGGLE_INFO_PAGE_DISPLAY',
            'HIDE_REPLIES_PAGE',
            'HIDE_MAIN_OVERFLOW'
        ]),
        tapThumbUp (e) {
            let replyid = e.currentTarget.dataset.replyid,
                topicid = this.info.id,
                accesstoken = this.accesstoken;

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
                })
            } else {
                this.$store.dispatch('toggleThumbAction', {
                    replyid, topicid, accesstoken
                })
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.replyItem {
    position: relative;
    padding: .24rem .32rem;
    margin-bottom: .12rem;
    box-sizing: border-box;
    background: #fff;
    .thumb-up-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 20%;
        .icon {
            color: $Gray;
            font-size: .38rem;
        }
        .ups-count {
            font-size: .24rem;
            color: $ExtraLightBlack;
            margin-left: -.18rem;
        }
    }
    .avatar {
        width: .88rem;
        height: .88rem;
        border-radius: 100%;
        overflow: hidden;
        img {
            width: .88rem;
            height: .88rem;
        }
    }
    .info-wrapper {
        flex: 1;
        margin-left: .24rem;
        .username {
            font-weight: bold;
        }
        .content {
            margin-top: -.12rem;
        }
        .reply-time {
            margin-top: .12rem;
            font-size: .2rem;
            color: lighten($ExtraLightBlack, 20%);
        }
    }
}
</style>
