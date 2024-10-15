# Vue 3 + TypeScript + Vite

## 推荐设置

开发工具：[VS Code](https://code.visualstudio.com/)

Vue3 插件：[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

代码规范：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)(useFlatConfig) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

CSS 提示：[CSS Class Intellisense]() + [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

i18n 插件：[i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)

其他插件：[Goto definition alias](https://marketplace.visualstudio.com/items?itemName=antfu.goto-alias)

## Docker Build

```bash
docker buildx build . -t dash-frontend:latest

docker run --rm -it -p 8080:80 dash-frontend:latest
```
