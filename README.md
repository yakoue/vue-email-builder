# Yakoue Email Editor

![Yakoue Email builder](https://my-ykmail-bucket.s3.eu-west-3.amazonaws.com/icons/yakoue-vuejs1.png)

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

## Usage

Next, you'll need to import the Email Builder component to your app.

```vue
<template>
  <div id="example">
    <div class="container">
      <div id="bar">
        <h1>Vue Email Editor (Demo)</h1>

        <button @click="saveDesign">Save Design</button>
        <button @click="exportHtml">Export HTML</button>
      </div>

      <EmailBuilder ref="emailbuilder" :config="config" @load="editorLoaded" />
    </div>
  </div>
</template>

<script>
import EmailBuilder from '@yakoue/vue-email-builder'
export default {
  name: 'Example',
  components: {
    EmailBuilder,
  },
  data() {
    return {
      config: {},
      emailTemplate: `<mjml> 
<mj-body> 
    <mj-section> 
        <mj-column> 
            <mj-text>
                <h1> Hey Title! </h1> 
            </mj-text>
                <mj-button> Hi nestor! </mj-button>
        </mj-column>
    </mj-section>  
</mj-body> 
</mjml>`,
    }
  },
  methods: {
    editorLoaded(instance) {
      //
      this.instance = instance
      this.instance.addEvent('onExport', (data) => {
        console.log('exportHtml', data)
      })
      this.instance.setTemplate(emailTemplate)
    },
    saveTemplate() {
      this.addEvent('onSave', (template) => {
        console.log('saveTemplate', JSON.stringify(template, null, 2))
      })
      this.instance.save()
    },
    exportHtml() {
      this.instance.export()
    },
  },
}
</script>
```

## Methods

| Method           | Param             | description                                             |
| ---------------- | ----------------- | ------------------------------------------------------- |
| **load**         | Builder Instance  | Callback function on builder load                       |
| **setTemplate**  | template          | Take the template and load it to the builder            |
| **saveTemplate** | Function callback | Returns the design JSON and HTML in a callback function |
| **exportHtml**   | Function callback | Returns the design HTML in a callback function          |

## Properties

**template** _object_ or _string_ You can set MJML Json on MJML XML as string to this props
**config** _object_ You can use this props to config and customize the builder
**onLoad** _function callback_ You can use this to set call back function on builder load

### Configuration Options

---

| Attribute                           | Required |                                                                                                      |
| :---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| **brand**<br/>_object_              | No       | This is the Brand Object from Yakoue. You can get it from the Brand settings page.                   |
| **locale**<br/>_string_             | No       | This is the locale you want to load the editor in. We have many translations available.              |
| **fusionTags**<br/> _object_        | No       | This is an array of objects. You can pass the merge tags and special links to display in the editor. |
| **token**<br/>_string_              | No       | String token for authentication. It is required to enable user saved blocks.                         |
| **tools**<br/>_object_              | No       | These are the options for tools and custom tools.                                                    |
| **blocks**<br/>_object_             | No       | This is an array of objects. You can pass custom blocks here.                                        |
| **drows**<br/>_object_              | No       | This is an array of objects. You can pass custom rows (sections) here.                               |
| **body**<br/>_object_               | No       | This objects to custom default template settings                                                     |
| **editor** <br/>_object_            | No       | These are some editor options for different functions of the editor.                                 |
| **fonts** <br/>_object_             | No       | You can pass custom fonts here.                                                                      |
| **toolsDefaultValues**<br/>_object_ | No       | You can pass default tools properties here.                                                          |
| **callbacks** <br/>_array_          | No       | Array of callbacks functions                                                                         |

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

For any report please write to contact@yakoue.com
