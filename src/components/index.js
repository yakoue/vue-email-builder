import Vue from 'vue'
import YakoueEditor from './YakoueEditor.vue'

const Components = {
  YakoueEditor,
}

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name])
})

export { YakoueEditor }
export default Components
