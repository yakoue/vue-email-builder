<template>
  <div :id="editorID" class="yakoue-editor" />
</template>
<script>
import {
  debounce,
  getEditorNamespace,
} from '@/common/yakoue-integrations-common.js'

export default {
  name: 'YakoueEditor',
  props: {
    editorUrl: {
      type: String,
      default: 'http://localhost/iframe/embed.js', // 'https://editor.yakoue.com/embed.js', //
    },
    config: {
      type: Object,
      default: null,
    },
    template: {
      default: null,
    },
  },
  data() {
    return {
      editorID: 'yakoue-editor-001',
    }
  },
  mounted() {
    this.loadYakoue()
  },
  methods: {
    loadYakoue() {
      getEditorNamespace(this.editorUrl, (namespace) => {
        this.$emit('namespaceloaded', namespace)
      }).then(() => {
        if (!window.Yakoue) {
          this.$emit('error', { code: 1, message: 'Failed to load editor' })
          return
        }
        this.options = this.options || {}
        this.options.id = this.editorID
        this.options.config = this.config
        this.options.template = this.template
        this.instance = window.Yakoue
        const vm = this
        this.instance.create(this.options, function () {
          console.error(' loaded')
          vm.$emit('load', window.Yakoue)
        })
      })
    },
    saveTemplate(callback) {
      this.instance.addEvent('onSave', callback)
      this.instance.save()
    },
    exportHtml(callback) {
      this.instance.addEvent('onExport', callback)
      this.instance.export()
    },
  },
}
</script>
<style scoped>
.yakoue-editor {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
