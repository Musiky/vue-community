<template>
  <div class="topics">
    <!--Info Page-->
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
      <infoPage v-show="info.isInfoPageShow"></infoPage>
    </transition>
    <!--info page-->
  
    <!--Tabs-->
    <div class="tabs-wrapper">
      <mu-tabs :value="activeTab"
               lineClass="active-line"
               @change="handleTabChange">
        <mu-tab value="all"
                title="全部" />
        <mu-tab value="good"
                title="精华" />
        <mu-tab value="weex"
                title="weex" />
        <mu-tab value="share"
                title="分享"></mu-tab>
        <mu-tab value="ask"
                title="问答"></mu-tab>
        <mu-tab value="job"
                title="招聘"></mu-tab>
      </mu-tabs>
    </div>
    <!--tabs-->
  
    <!--Refresh Control-->
    <mu-refresh-control :refreshing="common.refresh.isShow"
                        :trigger="trigger"
                        @refresh="refresh" />
    <!--refresh control-->

    <!--Content-->
    <div class="content-wrapper">
      <content-item v-for="list in topics.data"
                    :list="list"
                    @info="tapToInfo"
                    @userInfo="tapToUserInfo"></content-item>
    </div>
    <!--content-->
  
    <!--Infinite Scroll-->
    <mu-infinite-scroll loadingText="正在加载..."
                        :scroller="scroller"
                        :loading="topics.isFetching"
                        @load="loadMore" />
    <!--infinite scroll-->
  
    <!--No More Data-->
    <noMoreData v-if="this.topics.noMoreData"></noMoreData>
    <!--no more data-->
  
    <!--Error Data-->
    <noMoreData v-if="this.topics.errData"
                title="网络出错了，稍后再试"></noMoreData>
    <!--error data-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import infoPage from '../../components/infoPage/infoPage'
import contentItem from '../../components/contentItem/contentItem'
import noMoreData from '../../components/noMoreData/noMoreData'
export default {
  data () {
    return {
      // ----- tabs
      activeTab: 'all',
      // ----- infinit scroll
      scroller: null,
      page: 0,
      // ----- refresh control
      trigger: null
    }
  },
  mounted () {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  created () {
    // 初始化第一组数据；
    // 加入条件判断，只有 data 数组为空时发送请求；
    // 否则跳转到其他页面，再回来时会重复请求
    if (this.topics.data.length === 0) {
      this.http('all', 0, 20);
      this.page = 1;
    }
  },
  computed: {
    ...mapState([
      'topics',
      'info',
      'login',
      'common'
    ]),
    topicsDataLen () {
      return this.topics.data.length
    }
  },
  components: {
    contentItem,
    noMoreData,
    infoPage
  },
  methods: {
    ...mapMutations([
      'CLEAR_STATE_DATA',
      'TOGGLE_NO_MORE_DATA_STATE',
      'TOGGLE_ERROR_DATA_STATE',
      'SHOW_MAIN_OVERFLOW',
      'TOGGLE_INFO_PAGE_DISPLAY',
      'SUC_COLLECT',
      'DEL_COLLECTED'
    ]),
    // 切换 tabs
    // ========
    handleTabChange (val) {
      this.activeTab = val;     // 切换选项卡
      this.CLEAR_STATE_DATA();  // 清楚历史数据

      // 如果 noMoreData 为 true，让它变成 false
      if (this.topics.noMoreData) {
        this.TOGGLE_NO_MORE_DATA_STATE();
      };

      // 如果 errData 为 true，让它变成 false
      if (this.topics.errData) {
        this.TOGGLE_ERROR_DATA_STATE();
      };

      this.page = 1;

      switch (val) {
        case 'all':
          this.http('all', 0, 20);
          break;
        case 'good':
          this.http('good', 0, 20);
          break;
        case 'weex':
          this.http('weex', 0, 20);
          break;
        case 'share':
          this.http('share', 0, 20);
          break;
        case 'ask':
          this.http('ask', 0, 20);
          break;
        case 'job':
          this.http('job', 0, 20);
          break;
      }
    },
    // 公共请求方法
    // ==========
    http (tab, page, limit, isRefresh) {
      this.$store.dispatch('fetchTopicsAction', {
        tab, page, limit, isRefresh
      })
    },
    // 上拉加载更多
    // ==========
    loadMore () {
      if (!this.topics.isFetching && !this.topics.noMoreData) {
        this.page += 1;
        this.http(this.activeTab, this.page, 20);
      }
    },
    // 下拉刷新
    // =======
    refresh () {
      this.CLEAR_STATE_DATA();
      this.http(this.activeTab, 0, 20, true);
      this.page = 1;
    },
    // 跳转详情页
    // ========
    tapToInfo (topicid, userid) {
      this.SHOW_MAIN_OVERFLOW();
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
    },
    // 跳转用户详情页
    // ============
    tapToUserInfo (topicid, userid, username) {
      alert(username)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';

.topics {
  position: relative;
  background: $ExtraLightGray;
  .mu-circle {
    border-top-color: $primary !important;
    border-right-color: $primary !important;
    border-left-color: $primary !important;
  }
  .tabs-wrapper {
    width: 100%;
    height: 48px;
    .mu-tabs {
      position: fixed;
      top: 56px;
      background: #fff !important;
      .mu-tab-link {
        color: rgba(31, 45, 61, .7);
      }
      .mu-tab-active {
        font-size: .3rem;
        color: rgba(31, 45, 61, 1);
      }
    }
    .active-line {
      background: $primary !important;
    }
  }
  .mu-infinite-scroll {
    padding: .24rem 0;
    .mu-infinite-scroll-text {
      font-size: .28rem;
    }
  }
}
</style>
