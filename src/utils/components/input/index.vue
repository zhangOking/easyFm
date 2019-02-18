<template>
<el-input
  v-model="model"
  :placeholder="placeholder"
  :suffix-icon="suffixIcon"
  :prefix-icon="prefixIcon"
  :type="type"
  :rows="rows"
  :value="value"
  :size="size"
  :maxlength="maxlength"
  :autosize="autosize"
  :readonly="readonly"
  :autofocus="autofocus"
  :resize="resize"
  :name:="name"
  :disabled="disabled"
  @blur="blur"
  @focus="focus"
  @change="change">
  <slot slot='suffix' name='suffix'></slot>
  <slot slot='prefix' name='prefix'></slot>
</el-input>
</template>

<script>
export default {
  props: {
    placeholder: { // 输入框占位文本
      type: String,
      default: ''
    },
    suffixIcon: {
      default: '',
      type: String
    },
    prefixIcon: {
      default: '',
      type: String
    },
    type: { // 类型  text/textarea
      default: 'text',
      type: String
    },
    rows: { // 输入框行数，只对 type="textarea" 有效
      default: 1,
      type: Number
    },
    value: { // input 值
      default: ''
    },
    size: { // large small mini type為'text'時可用
      type: String
    },
    maxlength: { // large small mini type為'text'時可用
      type: Number
    },
    autosize: { // 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }
      default: false,
      type: [ Boolean, Object ]
    },
    readonly: { // 原生属性，是否只读
      default: false,
      type: Boolean
    },
    autofocus: { // 自动获取焦点
      default: false,
      type: Boolean
    },
    resize: { // 控制是否能被缩放 none, both, horizontal, vertical
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    name: null // 原生属性
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    model(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.model = val
    }
  },
  methods: {

    // 在 Input 失去焦点时触发
    blur(ev) {
      this.$emit('blur', ev)
    },

    // 在 Input 获得焦点时触发
    focus(ev) {
      this.$emit('focus', ev)
    },

    // 在 Input 获得焦点时触发
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang='less'>
  .el-input__prefix, .el-input__suffix {
    width: 25px;
  }
  .el-input__prefix i.icon, .el-input__suffix i.icon {
    width: 25px;
    text-align: center;
    -webkit-transition: all .3s;
    transition: all .3s;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
</style>

