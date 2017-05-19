<template>
  <mu-flexbox class="usertopics"
              orient="vertical">
    <!--Info Page-->
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
      <infoPage v-show="info.isInfoPageShow"
                :isNestPage="true"></infoPage>
    </transition>
    <!--info page-->
  
    <!--Appbar-->
    <mu-appbar :title="this.$route.params.title + '(' + count + ')'">
      <mu-icon value="close"
               slot="left"
               @click.native="back"></mu-icon>
    </mu-appbar>
    <!--appbar-->
  
    <!--Content-->
    <div class="content-wrapper">
      <content-item v-for="list in lists"
                    :list="list"
                    :simple="true"
                    @info="tapToInfo"></content-item>
    </div>
    <!--content-->
  </mu-flexbox>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import infoPage from '../../../../components/infoPage/infoPage'
import contentItem from '../../../../components/contentItem/contentItem'
export default {
  data () {
    return {
      lists: [],
      count: 0
    }
  },
  created () {
    let routetype = this.$route.params.type,
      lists = [],
      count = 0

    // 判断路由类型，并使用相应的 getters
    switch (routetype) {
      case 'collect_topics':
        lists = this.login.userinfo.collect_topics;
        count = this.COLLECTS_COUNT;
        break;
      case 'recent_replies':
        lists = this.login.userinfo.recent_replies;
        count = this.REPLIES_COUNT;
        break;
      case 'recent_topics':
        lists = this.login.userinfo.recent_topics;
        count = this.MY_TOPICS_COUNT;
        break;
    };

    this.lists = lists;
    this.count = count;
  },
  computed: {
    ...mapState([
      'login',
      'info'
    ]),
    ...mapGetters([
      'COLLECTS_COUNT',
      'REPLIES_COUNT',
      'MY_TOPICS_COUNT'
    ])
  },
  components: {
    infoPage,
    contentItem
  },
  methods: {
    ...mapMutations([
      'HIDE_MAIN_OVERFLOW',
      'TOGGLE_INFO_PAGE_DISPLAY',
      'SUC_COLLECT',
      'DEL_COLLECTED'
    ]),
    back () {
      this.$router.go(-1);
      this.$store.commit('HIDE_MAIN_OVERFLOW')
    },
    // 跳转详情页
    // ========
    tapToInfo (topicid, userid) {
      this.TOGGLE_INFO_PAGE_DISPLAY();
      this.$store.commit('COMMIT_ID', {
        id: topicid, userid
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/sass/_base.scss';
.usertopics {
  width: 100%;
  height: 100%;
  .mu-appbar {
    background: $primary !important;
  }
  .content-wrapper {
    flex: 1;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
