#!/usr/bin/bash

# build h5
yarn build:h5

cp src/assets/images/favicon.ico dist/h5/favicon.ico

# cd to dist/h5
cd dist/h5

# add nojykell
touch .nojekyll

# git ops
git init
git add -A
git commit -m "Deploy"

# push to gh-pages branch
git push -f git@github.com:b2nil/taro-ui-vue3-demo.git main:gh-pages