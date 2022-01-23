#!/usr/bin/env sh

# エラー時は停止
set -e

# 既存のdistフォルダがあれば削除する
if test -d ./dist; then
  rm -rf ./dist
  echo "Removed dist directory that already existed!"
fi

# ビルド
npm run build

# ビルド出力ディレクトリに移動
cd dist

# カスタムドメインにデプロイする場合
# echo 'www.example.com' > CNAME

git init
git branch -M gh-pages
git add -A
git commit -m 'deploy'

# https://<USERNAME>.github.io にデプロイする場合
git push -f git@github.com:yuichiyasui/yuichiyasui.github.io.git gh-pages

# https://<USERNAME>.github.io/<REPO> にデプロイする場合
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -