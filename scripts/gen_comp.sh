#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages/taro-ui-vue3" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: yarn gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi
NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME
IMPORT_NAME="At$NAME"

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"
mkdir -p "$DIRNAME/__tests__"

cat > $DIRNAME/src/index.vue <<EOF
<template>
  <view>
    <slot></slot>
  </view>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs } from 'vue'

export default defineComponent({
  name: '${IMPORT_NAME}',

  props: { },

  setup(props, { slots, attrs, emit }) {
    // init here

    return {
      // return here
    }
  },
})
</script>

<style lang="scss">
</style>
EOF

cat <<EOF >"$DIRNAME/index.ts"
import { App } from 'vue'
import ${IMPORT_NAME} from './src/index.vue'
export default (app: App): void => {
  app.component(${IMPORT_NAME}.name, ${IMPORT_NAME})
}
EOF

cat > $DIRNAME/package.json <<EOF
{
  "name": "@taro-ui-vue3/$INPUT_NAME",
  "version": "0.0.0",
  "main": "dist/index.js",
  "license": "MIT",
  "peerDependencies": {
    "vue": "^3.0.0",
    "@tarojs/taro": "^3.0.0"
  },
  "devDependencies": {
    "@vue/test-utils": "^2.0.0-beta.3"
  }
}
EOF

cat > $DIRNAME/__tests__/$INPUT_NAME.spec.ts <<EOF
import { mount } from '@vue/test-utils'
import $IMPORT_NAME from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('$IMPORT_NAME.vue', () => {
  test('render test', () => {
    const wrapper = mount($IMPORT_NAME, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
EOF
