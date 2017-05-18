<template>
    <mu-flexbox align="flex-start" class="replyItem">
        <!--Avatar-->
        <div class="avatar">
            <img :src="list.author.avatar_url" alt="">
        </div>
        <!--avatar-->

        <!--Info-->
        <div class="info-wrapper">
            <!--username-->
            <div class="username">
                {{list.author.loginname}}
            </div>

            <!--content-->
            <div class="content" v-html="list.content"></div>
        </div>
        <!--info-->
    </mu-flexbox>
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

<style lang="scss" scoped>
.replyItem {
    padding: .24rem .32rem;
    margin-bottom: .12rem;    
    box-sizing: border-box;
    background: #fff;
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
    }
}
</style>
