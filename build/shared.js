const path = require("path")
const shell = require('shelljs')
const { toCamelCase } = require("@tarojs/shared")

const taroInternalComponents = [
  "view", "icon", "progress", "rich-text", "text", "button", "checkbox", "checkbox-group",
  "form", "input", "label", "picker", "picker-view", "picker-view-column", "radio", "radio-group",
  "slider", "switch", "cover-image", "textarea", "cover-view", "movable-area", "movable-view",
  "scroll-view", "swiper", "swiper-item", "navigator", "audio", "camera", "image", "live-player",
  "video", "canvas", "ad", "web-view", "block", "map", "open-data", "custom-wrapper", "canvas"
]

const resolveFile = (p) => path.resolve(__dirname, '..', p)

const writeToFile = (code, filename) => shell.ShellString(code).to(filename)
const cleanFile = (filename) => shell.rm('-f', filename)
const readFile = (filename) => shell.cat(filename).toString()

function removeCommentVnode(node, ctx) {
  if (node.type === 3 /* NodeTypes.COMMENT */) {
    ctx.removeNode(node)
  }
}

// transform prop attributes to camelCase
function transformPropAttributes(node) {
  if (node.type === 1) {
    node.props.forEach((prop, index) => {
      if (prop.type === 6) {
        if (prop.value === undefined) {
          prop.value = {
            type: 4,
            content: true,
            constType: 0
          }
        }
        prop.name = toCamelCase(prop.name)
      } else if (prop.type === 7 &&
        prop.name === 'bind' &&
        prop.arg && !['class', 'style'].includes(prop.arg.content)
      ) {
        prop.arg.content = toCamelCase(prop.arg.content)
      }
    })
  }
}

module.exports = {
  readFile,
  cleanFile,
  writeToFile,
  resolveFile,
  removeCommentVnode,
  transformPropAttributes,
  taroInternalComponents
}