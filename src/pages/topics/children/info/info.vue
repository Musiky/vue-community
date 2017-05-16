<template>
    <mu-flexbox orient="vertical" class="info">
        <!--Progress-->
        <mainProgress v-show="info.isFetching"></mainProgress>
        <!--progress-->

        <!--Appbar-->
        <mu-appbar :title="info.data.author.loginname">
            <mu-icon-button icon="arrow_back"
                            slot="left"
                            @click="back"></mu-icon-button>
        </mu-appbar>
        <!--appbar-->

        <!--Content-->
        <mu-flexbox-item grow="1" class="content">
            <!--title-->
            <p class="title">
                {{info.data.title}}
            </p>
            <!--information-->
            <mu-flexbox class="information">
                <!--userinfo-->
                <mu-flexbox class="userinfo">
                    <div class="avatar">
                        <img :src="info.data.author.avatar_url" alt="">
                    </div>
                    <p class="username">{{info.data.author.loginname}}</p>
                </mu-flexbox>
                <!--time-->
                <mu-flexbox-item class="time">
                    {{info.data.last_reply_at}}
                </mu-flexbox-item>
            </mu-flexbox>
        </mu-flexbox-item>
        <!--content-->
    </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import mainProgress from '../../../../components/mainProgress/mainProgress'
export default {
    computed: {
        ...mapState([
            'info'
        ])
    },
    components: {
        mainProgress
    },
    methods: {
        // 返回到父级路由
        // ============
        back () {
            this.$router.go(-1);
        }
    },
    data () {
        return {
            info_id: this.$route.params.id,
            user_id: this.$route.params.userid
        }
    },
    created () {
        this.$store.dispatch('fetchInfoActions', {
            id: this.info_id
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/sass/_base.scss';
.info {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $ChildPage;
    width: 100%;
    height: 100%;
    background: #fff;    
    .content {
        width: 92%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        @include center-block();
        .title {
            font-size: .36rem;
            font-weight: bold;
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
    }
}
</style>
