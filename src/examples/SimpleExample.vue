<template>
  <div id="demo">
    <b-container
      style="
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        over-flow: hidden;
      "
    >
      <b-row>
        <b-col cols="9">
          <img :src="logoURL" alt="Logo" width="100" height="20" /> (Demo with
          vuejs component)
        </b-col>
        <b-col>
          <b-btn variant="outline-success" @click="saveDesign">
            Save MJML JSON
          </b-btn>

          <b-btn variant="outline-dark" @click="exportHtml">
            Export HTML
          </b-btn>
          <br />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="builder-wrapper">
            <YakoueEditor
              ref="emailbuilder"
              :config="config"
              @load="editorLoaded"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { YakoueEditor } from '../components'
import templateData from '../data/template2.json.js'
import logo from '../assets/logo.png'
export default {
  name: 'Example',
  components: {
    YakoueEditor,
  },
  data() {
    return {
      config: {},
      logoURL: logo,
      /* template: templateData, */
    }
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    editorLoaded(param) {
      // this.$refs.emailbuilder.instance.setTemplate(templateData)
      this.instance = param
      this.instance.addEvent('onExport', (data) => {
        console.log('exportHtml', data)
      })
      this.instance.addEvent('onSave', (design) => {
        console.log('saveDesign', JSON.stringify(design, null, 2))
      })
      this.instance.setTemplate(templateData)
    },
    saveTemplate() {
      // console.log(' template ' + JSON.stringify(templateData, null, 2))

      this.instance.save()
    },
    exportHtml() {
      this.instance.export()
    },
  },
}
</script>

<style>
.builder-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 800px;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 5px;
  box-shadow: 0px -10px 38px 4px rgb(40 58 72 / 23%),
    0 2px 2px hsl(0deg 0% 100% / 14%), 0 3px 1px -2px hsl(0deg 0% 100% / 12%);
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
}
#demo {
  height: 100%;
}
</style>
