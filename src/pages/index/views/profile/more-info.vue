<template>
  <div class="more-info" v-if="amI">
    <div class="more-info-head">
      <div class="head-title">更多信息</div>
      <div class="head-opt" v-if="amI">
        <el-button size="small" v-if="isEdit" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" v-if="isEdit" @click="saveUserInfo">保存</el-button>
        <el-button type="primary" size="small" @click="editUserInfo" v-else>编辑</el-button>
      </div>
    </div>
    <div class="more-info-main">
      <el-form
        ref="moreInfoForm"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
        :hide-required-asterisk="true"
      >
        <!-- 编辑状态 -->
        <div v-if="isEdit">
          <el-form-item label="真实姓名：">
            <el-input v-model="form.name" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="我的年龄：">
            <el-input v-model.number="form.age" class="form-input age-input"></el-input>
          </el-form-item>
          <el-form-item label="我的专业：">
            <el-cascader :options="majorOpts" :show-all-levels="false" v-model="selectMajor"></el-cascader>
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-select v-model.number="form.companyId" filterable placeholder="请选择">
              <el-option
                v-for="company in companyOpts"
                :key="company.id"
                :label="company.name"
                :value="company.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="税前月薪：">
            <el-input v-model.number="form.mSalary" class="form-input" placeholder="单位：元"></el-input>
          </el-form-item>
          <el-form-item label="税前年薪：">
            <el-input v-model.number="form.ySalary" class="form-input" placeholder="单位：元"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-input placeholder="证件号码" v-model="form.idCard" class="input-with-select">
              <el-select v-model.number="form.idCardType" slot="prepend" placeholder="请选择">
                <el-option
                  v-for="(idCardType, index) in idCardTypeList"
                  :label="idCardType"
                  :key="index"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
        <!-- 普通状态 -->
        <div v-else>
          <el-form-item label="真实姓名：">
            <span class="value-show">{{ form.name || '-' }}</span>
          </el-form-item>
          <el-form-item label="我的年龄：">
            <span class="value-show">{{ form.age || '-' }}</span>
          </el-form-item>
          <el-form-item label="我的专业：">
            <span class="value-show">{{ getMajorLabel(form.majorId) }}</span>
          </el-form-item>
          <el-form-item label="工作单位：">
            <span class="value-show">{{ getCompanyName(form.companyId) }}</span>
          </el-form-item>
          <el-form-item label="税前月薪：">
            <span class="value-show">{{ form.mSalary }}</span>
          </el-form-item>
          <el-form-item label="税前年薪：">
            <span class="value-show">{{ form.ySalary }}</span>
          </el-form-item>
          <el-form-item :label="getIdCardName(form.idCardType)" v-if="form.idCardType">
            <span class="value-show">{{ form.idCard }}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAllMajors, getCompanies, updateUserInfo } from '@/api';
import { Promise } from 'q';
export default {
  data() {
    return {
      isEdit: false, // 是否是编辑状态
      form: {
        name: '',
        age: undefined,
        majorId: undefined,
        academyId: undefined,
        mSalary: undefined,
        ySalary: undefined,
        companyId: undefined,
        idCard: '',
        idCardType: undefined
      },
      rules: {
        name: [{ max: 10, message: '名字长度需小于10个字符', trigger: 'blur' }]
      },
      majorOpts: [],
      marjorMap: {},
      idCardTypeList: ['身份证', '护照', '港澳通行证', '台胞证', '军官证', '其他'],
      companyOpts: []
    };
  },
  computed: {
    ...mapGetters(['pageUser', 'amI']),
    selectMajor: {
      get() {
        if (this.form.majorId && this.form.academyId) {
          return [this.form.academyId, this.form.majorId];
        }
        return [];
      },
      set(value) {
        this.form.academyId = value[0];
        this.form.majorId = value[1];
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.hash === '#edit') {
        this.isEdit = true;
      }
    },
    pageUser() {
      this.form = Object.assign({}, this.pageUser);
    }
  },
  async created() {
    await Promise.all([this.getMajors(), this.getCompanies()]);
  },
  methods: {
    async getMajors() {
      const result = await getAllMajors();
      if (result.code === 0) {
        this.majorOpts = result.data;
      }
      const tmpMap = {};
      this.majorOpts.forEach((academy) => {
        academy.children.forEach((major) => {
          tmpMap[major.value] = major.label;
        });
      });
      this.marjorMap = tmpMap;
    },
    async getCompanies() {
      const result = await getCompanies();
      if (result.code === 0) {
        this.companyOpts = result.data;
      }
    },
    getCompanyName(companyId) {
      let companyName;
      this.companyOpts.forEach((company) => {
        if (company.id === companyId) {
          companyName = company.name;
        }
      });
      return companyName;
    },
    getIdCardName(type) {
      return `${this.idCardTypeList[type - 1]}：` || '';
    },
    getMajorLabel(id) {
      return this.marjorMap[id] || '-';
    },
    editUserInfo() {
      this.isEdit = true;
    },
    async saveUserInfo() {
      const result = await updateUserInfo(this.form);
      if (result.code === 0) {
        this.$store.commit('setPageUser', result.data);
        this.$store.commit('setUser', result.data);
        this.isEdit = false;
        this.$message.success('保存成功');
        if (this.$route.hash === '#edit') {
          this.$router.push({ ...this.$route, hash: '' });
        }
      } else {
        this.$message.error('保存失败，请重试');
      }
    },
    cancel() {
      this.isEdit = false;
      if (this.$route.hash === '#edit') {
        this.$router.push({ ...this.$route, hash: '' });
      }
    }
  }
};
</script>

<style lang="scss">
@import '~@/style/variables.scss';
.more-info {
  &-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    padding: 0 2rem;
    border-left: 8px solid #5cb85c;
    border-bottom: 1px solid #e2e2e2;
  }
  &-main {
    color: $link-color;
    font-size: 1.3rem;
    padding: 2rem 4rem;
    .input-with-select {
      .el-input-group__prepend {
        background-color: #fff;
      }
      .el-select .el-input {
        width: 10rem;
      }
    }
  }
}
.head-title {
  color: $link-color;
  font-size: 1.5rem;
}
.form-input {
  width: 18rem;
}
.value-show {
  margin-left: 1.2rem;
}
.sex-box {
  display: inline-block;
  text-align: center;
  padding: 0rem 2rem;
  margin-right: 2rem;
  outline: none;
  border-radius: 4px;
  color: #fff;
  background: #bac4c5;
  border: 1px solid #eee;
  font-size: 1.3rem;
  cursor: pointer;
  &.male {
    &:hover {
      background: #1398ff;
    }
    &.selected {
      background: #1398ff;
    }
  }
  &.female {
    &:hover {
      background: #ff3086;
    }
    &.selected {
      background: #ff3086;
    }
  }
  .sex-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    margin-right: 1rem;
    font-size: 1em;
    vertical-align: middle;
  }
}
</style>
