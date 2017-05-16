<template>
  <div class="topics">
    <!--Progress-->
    <!--<div class="progress-wrapper"
           v-show="">
        <mu-circular-progress :size="30"
                              color="#41b883" />
      </div>-->
    <!--progress-->
  
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
  
    <!--Content-->
    <div class="content-wrapper">
      <content-item v-for="list in topics.data"
                    :list="list"></content-item>
    </div>
    <!--content-->
  
    <!--Infinite Scroll-->
    <mu-infinite-scroll :scroller="scroller"
                        :loading="topics.isFetching"
                        @load="loadMore" />
    <!--infinite scroll-->

    <!--No More Data-->
    <noMoreData v-if="this.topics.noMoreData"></noMoreData>
    <!--no more data-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import contentItem from '../../components/contentItem/contentItem'
import noMoreData from '../../components/noMoreData/noMoreData'
export default {
  data () {
    return {
      // ----- tabs
      activeTab: 'all',
      // ----- infinit scroll
      scroller: null,
      page: 0
    }
  },
  mounted () {
    this.scroller = this.$el;
  },
  created () {
    // 初始化第一组数据
    this.http('all', 0, 20);
    this.page = 1;
  },
  computed: {
    ...mapState([
      'topics'
    ]),
    topicsDataLen () {
      return this.topics.data.length
    }
  },
  components: {
    contentItem,
    noMoreData
  },
  methods: {
    ...mapMutations([
      'CLEAR_STATE_DATA',
      'TOGGLE_NO_MORE_DATA_STATE'
    ]),
    // 切换 tabs
    // ========
    handleTabChange (val) {
      this.activeTab = val;
      this.CLEAR_STATE_DATA();
      if (this.topics.noMoreData) {
        this.TOGGLE_NO_MORE_DATA_STATE();
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
    http (tab, page, limit) {
      this.$store.dispatch('fetchTopicsActions', {
        tab, page, limit
      })
    },
    // 上拉加载更多
    // ==========
    loadMore () {
      if (!this.topics.isFetching && !this.topics.noMoreData) {
        this.page += 1;
        this.http(this.activeTab, this.page, 20);
        console.log(this.page)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';

.topics {
  .progress-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: $LoadingIndex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, .54);
    .mu-circular-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
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
}
</style>
