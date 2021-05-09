# Yakoue Email Editor

## Install

### CDN

```html
<script src="https://unpkg.com/@yakoue/vue-email-builder"></script>
```

### NPM

```
$ npm install @yakoue/vue-email-builder --save
or
$ yarn @yakoue/vue-email-builder

```

## component

```vue
<template>
  <div id="example">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <button @click="saveDesign">Save Design</button>
        <button @click="exportHtml">Export HTML</button>
      </div>

      <YakoueEditor ref="emailbuilder" :config="config" @init="editorLoaded" />
    </div>
  </div>
</template>

<script>
import { YakoueEditor } from '../components'
import templateData from '../data/template1.js'
export default {
  name: 'Example',
  components: {
    YakoueEditor,
  },
  data() {
    return {
      config: {},
      /* template: templateData, */
    }
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    editorLoaded() {
      // this.$refs.emailbuilder.instance.setTemplate(templateData)

      this.$refs.emailbuilder.instance.addEvent('onExport', (data) => {
        console.log('exportHtml', data)
      })
    },
    saveDesign() {
      // console.log(' template ' + JSON.stringify(templateData, null, 2))
      this.$refs.emailbuilder.instance.addEvent('onSave', (design) => {
        console.log('saveDesign', JSON.stringify(design, null, 2))
      })
      this.$refs.emailbuilder.instance.save()
    },
    exportHtml() {
      this.$refs.emailbuilder.instance.export()
    },
  },
}
</script>
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
