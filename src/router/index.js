import Vue from 'vue'
import Router from 'vue-router'
import topics from '../pages/topics/topics.vue'
import user from '../pages/user/user.vue'
/* -- */ import collection from '../pages/user/children/collection/collection.vue'
/* -- */ import replies from '../pages/user/children/replies/replies.vue'
/* -- */ import mytopic from '../pages/user/children/mytopic/mytopic.vue'
import message from '../pages/message/message.vue'

Vue.use(Router)

const routes = [
  {
    name: 'topics',
    path: '/topics/:title',
    component: topics
  },
  {
    name: 'user',
    path: '/user/:title',
    component: user,
    children: [
      {
        name: 'collection',
        path: 'collection/:title',
        component: collection
      },
      {
        name: 'replies',
        path: 'replies/:title',
        component: replies
      },
      {
        name: 'mytopic',
        path: 'mytopic/:title',
        component: mytopic
      }
    ]
  },
  {
    name: 'message',
    path: '/message/:title',
    component: message
  }
]

const router = new Router({
  routes
})

router.push({name: 'topics', params: {title: '话题'}})

export default router