<template>
  <div class="oa-wrap">
    <div class="oa-box block" v-if="oaExist">
      <div class="oa-box-head">
        <h1 class="oa-title">{{oa.title}}</h1>
        <div class="oa-detail">
          <div class="oa-legend">
            <span class="oa-user">发布者：&nbsp;{{oa.academy_name || '汕头大学'}}</span>
            <div class="oa-time">
              <span>发表于&nbsp;{{oa.createdAt?$dayjs(oa.createdAt).format('YYYY-MM-DD HH:mm:ss'): '-'}}&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
      <div class="oa-box-main">
        <div class="oa-content-box">
          <div v-html="oa.content"></div>
        </div>
      </div>
    </div>

    <div class="oaNotFound block" v-if="!oaExist">OA不存在</div>
    <div class="toIndex" v-if="!oaExist">
      <el-button type="primary" @click="routeToIndex">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default-avatar.png';
import { getOaById } from '@/api';
export default {
  data() {
    return {
      oa: {
        title: '',
        content: '',
        userId: undefined,
        createdAt: undefined,
        updateAt: undefined
      },
      oaExist: true // oa是否存在，默认为true
    };
  },
  async mounted() {
    await this.initOa();
  },
  methods: {
    async initOa() {
      const id = this.$route.params.id;
      const result = await getOaById(id);
      if (result.code === 0) {
        this.oa = result.data;
      } else {
        this.oaExist = false;
      }
    },
    routeToIndex() {
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
@import '~@/style/variables.scss';
.oa-wrap {
  padding: 1rem 0;
  color: #333;
}
.oa-box {
  &-head {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e2e2;
  }
  &-main {
    padding: 1.5rem 2rem;
  }
}
.oa {
  &-title {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;
    &:before {
      background: #25bb9b;
      content: '';
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      margin-right: 0.6rem;
      margin-bottom: 0.2rem;
      vertical-align: middle;
    }
  }
  &-content-box {
    font-size: 1.25rem;
    line-height: 1.5;
    padding: 0.4rem 0.8rem;
    margin: 1rem 0;
    p {
      margin: 0.4rem 0;
      font-size: 1.25rem;
      line-height: 1.5;
    }
  }
}
.oa {
  &-detail {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    margin: 1rem 2rem 0 2rem;
    font-size: 1rem;
  }
  &-user {
    font-size: 1.2rem;
    color: #333;
  }
  &-time {
    span {
      margin-right: 1rem;
    }
  }
  &-legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888;
  }
}
.oaNotFound {
  padding: 4rem;
  font-size: 2rem;
  color: $link-color;
  text-align: center;
}
.toIndex {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
