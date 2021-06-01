const path = require("path")
const shell = require('shelljs')

const taroInternalComponents = [
  "view", "icon", "progress", "rich-text", "text", "button", "checkbox", "checkbox-group",
  "form", "input", "label", "picker", "picker-view", "picker-view-column", "radio", "radio-group",
  "slider", "switch", "cover-image", "textarea", "cover-view", "movable-area", "movable-view",
  "scroll-view", "swiper", "swiper-item", "navigator", "audio", "camera", "image", "live-player",
  "video", "canvas", "ad", "web-view", "block", "map", "open-data", "custom-wrapper", "canvas"
]

const transformAssetUrls = {
  video: ['src', 'poster'],
  'live-player': ['src'],
  audio: ['src'],
  source: ['src'],
  image: ['src'],
  'cover-image': ['src']
}

const resolveFile = (p) => path.resolve(__dirname, '..', p)

const writeToFile = (code, filename) => shell.ShellString(code).to(filename)
const cleanFile = (filename) => shell.rm('-f', filename)
const readFile = (filename) => shell.cat(filename).toString()

function isCustomElement(tag) {
  return taroInternalComponents.includes(tag)
}

function removeCommentVnode(node, ctx) {
  if (node.type === 3 /* NodeTypes.COMMENT */) {
    ctx.removeNode(node)
  }
}

function transformTags(forH5 = false) {
  return (node, ctx) => {
    removeCommentVnode(node, ctx)

    if (
      node.type === 1 /* NodeTypes.ELEMENT */ &&
      taroInternalComponents.includes(node.tag) /* is built-in tag*/
    ) {
      // miniapp tags should be prefixed with `taro-` 
      // and be resolved by `resolveComponent` in h5
      if (Boolean(forH5)) {
        node.tag = `taro-${node.tag}`
      }

      // make all tags to be resolved by `resolveComponent`
      node.tagType = 1 /* ElementTypes.COMPONENT */
    }
  }
}

module.exports = {
  readFile,
  cleanFile,
  writeToFile,
  resolveFile,
  transformTags,
  isCustomElement,
  removeCommentVnode,
  transformAssetUrls,
  taroInternalComponents
}