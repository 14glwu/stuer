<template>
  <div class="oas_container">
    <div class="oas_wrap block">
      <div class="oas-header">
        <h2 class="block-title">OA列表</h2>
      </div>
      <div class="oas-main">
        <div class="oas-main-content">
          <ul class="oa-list">
            <li class="oa-list-item" v-for="(oa, index) in oas" :key="index">
              <div class="oa-detail">
                <div class="oa-detail-head">
                  <router-link :to="`/oas/${oa.id}`" target="_blank">{{oa.title}}</router-link>
                </div>
                <div class="oa-detail-foot">
                  <div class="foot-tips">
                    <span>{{oa.academy || '汕头大学'}}</span>&nbsp;
                    <span
                      class="oa-time"
                    >于&nbsp;&nbsp;{{$dayjs(oa.createdAt).format('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;发表</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="11"
            :total="total"
            :page-size="pageSize"
            :current-page="pageIndex"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOas } from '@/api';
import defaultAvatar from '@/assets/default-avatar.png';
export default {
  data() {
    return {
      pageIndex: 1, // 页码
      pageSize: 10, // 页面大小
      total: 0, // 数据总量
      type: 'all', // oa类型
      oas: [],
      defaultAvatar
    };
  },
  async created() {
    await this.getOasData();
  },
  methods: {
    async handleTabClick(index) {
      this.tabActive = index;
      this.order = index + 1;
      await this.getOasData();
    },
    async getOasData() {
      const result = await getOas({
        offset: (this.pageIndex - 1) * this.pageSize,
        pageSize: this.pageSize,
        type: this.type
      });
      if (result.code === 0) {
        this.total = result.data.total;
        this.oas = result.data.data;
      }
    },
    async handlePageChange(index) {
      this.pageIndex = index;
      await this.getOasData();
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@/style/variables.scss';
.oas_container {
  padding: 1rem 0;
  color: #333;
}
.oas-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e2e2;
}
.oas-main {
  padding: 2rem;
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.oas-tabs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2rem;
}
.tabs-item {
  font-size: 1.3rem;
  &-label {
    color: #888;
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
    &.active {
      color: $primary-color;
    }
  }
}
.seperate-pipe {
  margin: 0 1em;
  color: #eee;
}
.oa {
  &-list {
    margin-bottom: 2rem;
    &-item + &-item {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e2e2;
    }
    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  &-avatar {
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  &-detail {
    width: 100%;
    margin-left: 2rem;
    font-size: 1rem;
    a {
      color: #333;
    }
    &-head {
      font-size: 1.3rem;
      height: 1.5rem;
      line-height: 1.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &-foot {
      color: #888;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .foot-opts {
        display: flex;
        align-items: center;
        .opts-num {
          margin-left: 0.5rem;
        }
      }
    }
  }
  &-top {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0 0.2rem;
    border-radius: 4px;
    font-size: 1rem;
    background: #25bb9b;
    color: #fff;
  }
  &-highlight {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0 0.3rem;
    border-radius: 4px;
    font-size: 1rem;
    height: 1.5rem;
    line-height: 1.5rem;
    background: #ff6547;
    color: #fff;
  }
}
.hot-tags {
  // height: 15rem;
}
.tags {
  &-main {
    padding: 1rem;
  }
  &-list {
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    &-item {
      margin: 0.2rem 0.2rem;
      padding: 0 0.8rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 1rem;
      border: 1px solid #e2e2e2;
      cursor: pointer;
      &:hover {
        color: $primary-color;
        border: 1px solid $primary-color;
      }
    }
  }
}
.hot-oas {
  margin-top: 1.5rem;
  &-main {
    padding: 1rem;
    font-size: 1.2rem;
  }
  &-list {
    li + li {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e2e2;
    }
    &-item {
      width: 100%;
      overflow: hidden;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
