<template>
  <div class="basic-info">
    <div class="basic-info-head">
      <div class="head-title">基本信息</div>
      <div class="head-opt" v-if="amI">
        <el-button size="small" v-if="isEdit" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" v-if="isEdit" @click="saveUserInfo">保存</el-button>
        <el-button type="primary" size="small" @click="editUserInfo" v-else>编辑</el-button>
      </div>
    </div>
    <div class="basic-info-main">
      <el-form
        ref="basicInfoForm"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
        :hide-required-asterisk="true"
      >
        <!-- 编辑状态 -->
        <div v-if="isEdit">
          <el-form-item :label="`${meOrHim}的昵称：`" prop="nickName">
            <el-input v-model="form.nickName" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="个性签名：" prop="personSign">
            <el-input v-model="form.personSign"></el-input>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的性别：`">
            <a
              href="javascript:void(0);"
              :class="{'sex-box':true, 'male':true,'selected':form.gender === 1}"
              @click="setGender(1)"
            >
              <svg class="sex-icon" aria-hidden="true">
                <use xlink:href="#icon-male"></use>
              </svg>
              <span>男生</span>
            </a>
            <a
              href="javascript:void(0);"
              :class="{'sex-box':true, 'female':true,'selected':form.gender === 0}"
              @click="setGender(0)"
            >
              <svg class="sex-icon" aria-hidden="true">
                <use xlink:href="#icon-female"></use>
              </svg>
              <span>女生</span>
            </a>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的学历：`">
            <el-select v-model="form.eduLevel" placeholder="请选择">
              <el-option
                v-for="(item,index) in eduLevelOpt"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式：">
            <el-input v-model="form.phone" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="身份类型：" v-if="form.role <= 3">
            <el-radio-group v-model.number="form.role">
              <el-radio :label="1">毕业生</el-radio>
              <el-radio :label="2">在校生</el-radio>
              <el-radio :label="3">教师</el-radio>
              <el-radio :label="4" v-if="form.role === 7">运营管理员</el-radio>
              <el-radio :label="5" v-if="form.role === 7">学校管理员</el-radio>
              <el-radio :label="6" v-if="form.role === 7">企业管理员</el-radio>
              <el-radio :label="7" v-if="form.role === 7">超级管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的学号：`" v-if="form.role === 1 || form.role === 2">
            <el-input v-model.number="form.stuNum" class="form-input"></el-input>
          </el-form-item>
          <el-form-item label="教师编号：" v-if="form.role === 3">
            <el-input v-model.number="form.teaNum" class="form-input"></el-input>
          </el-form-item>
        </div>

        <!-- 普通状态 -->
        <div v-else>
          <el-form-item :label="`${meOrHim}的昵称：`" prop="nickName">
            <span class="value-show">{{ form.nickName || '-' }}</span>
          </el-form-item>
          <el-form-item label="个性签名：" prop="personSign">
            <span class="value-show">{{ form.personSign || '-' }}</span>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的性别：`">
            <div class="sex-icon-box">
              <svg class="sex-icon" aria-hidden="true" v-if="form.gender === 1">
                <use xlink:href="#icon-male2"></use>
              </svg>
              <svg class="sex-icon" aria-hidden="true" v-if="form.gender === 0">
                <use xlink:href="#icon-female2"></use>
              </svg>
            </div>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的学历：`">
            <span class="value-show">{{ form.eduLevel || '-' }}</span>
          </el-form-item>
          <el-form-item label="联系方式：">
            <span class="value-show">{{ form.phone || '-' }}</span>
          </el-form-item>
          <el-form-item label="身份类型：" v-if="form.role <= 3">
            <span class="value-show">{{ getRoleName(form.role) }}</span>
          </el-form-item>
          <el-form-item :label="`${meOrHim}的学号：`" v-if="form.role === 1 || form.role === 2">
            <span class="value-show">{{ form.stuNum }}</span>
          </el-form-item>
          <el-form-item label="教师编号：" v-if="form.role === 3">
            <span class="value-show">{{ form.teaNum }}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { updateUserInfo } from '@/api';
export default {
  data() {
    return {
      isEdit: false, // 是否是编辑状态
      form: {
        nickName: '',
        personSign: '',
        gender: undefined,
        eduLevel: '',
        phone: '',
        role: undefined,
        stuNum: '',
        teaNum: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 20, message: '昵称长度需小于20个字符', trigger: 'blur' }
        ],
        personSign: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 100, message: '个性签名长度需小于100个字符', trigger: 'blur' }
        ]
      },
      eduLevelOpt: ['博士后', '博士', '硕士', '本科']
    };
  },
  computed: {
    ...mapGetters(['pageUser', 'amI']),
    meOrHim() {
      return this.amI ? '我' : '他';
    }
  },
  watch: {
    $route(to, from) {
      if (to.hash === '#edit') {
        this.isEdit = true;
      }
    },
    pageUser(pageUser) {
      this.form = Object.assign({}, pageUser);
    }
  },
  created() {
    if (this.$route.hash === '#edit') {
      this.isEdit = true;
    }
    this.form = Object.assign({}, this.pageUser);
  },
  methods: {
    getRoleName(role) {
      const map = {
        1: '毕业生',
        2: '在校生',
        3: '老师',
        4: '运营管理员',
        5: '学校管理员',
        6: '企业管理员',
        7: '超级管理员'
      };
      return map[role] || '毕业生';
    },
    setGender(sexNo) {
      this.form.gender = sexNo;
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

<style scoped lang="scss">
@import '~@/style/variables.scss';
.basic-info {
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
  }
}
.head-title {
  color: $link-color;
  font-size: 1.5rem;
}
.form-input {
  width: 24rem;
  &.age-input {
    width: 8rem;
  }
}
.value-show {
  margin-left: 1.2rem;
}
.sex-box {
  display: inline-block;
  text-align: center;
  padding: 0rem 1.5rem;
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
.sex-icon-box {
  font-size: 1.3rem;
  .sex-icon {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    margin-left: 1.2rem;
    font-size: 1.5em;
    vertical-align: middle;
  }
}
</style>
