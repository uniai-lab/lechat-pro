<p align=center>
<img height=90px src="./img/logo.png"/>
</p>

<p align=center>
<b>KimiChat</b> 启发，基于 <b>UniAI</b> 开发，集成多种 AI 大模型的文档分析应用。
</p>

<p align=center> <a href="./README.md">English Readme</a></p>

## 简介

我们欣赏[月之暗面](https://www.moonshot.cn/)及其旗下产品 [KimiChat](https://kimi.moonshot.cn/)。受其启发，我们开发并开源了 LeChat，这是一款基于大模型的文件解析工具，支持全套Office文件解析，功能紧跟 KimiChat 开发！

与获得红杉资本10亿投资的 KimiChat不同，我们的项目显得较为简陋。我们没有投资，项目团队仅由一位不知名科研院所的全职工程师（也就是我本人）和一位即将毕业的实习生组成。目前项目实习生已离职，只有我一个人在维护，因个人精力和资金有限（项目目前允许免费有限使用），我们决定开源所有代码，包括前端、后端以及核心类库。如果你对项目感兴趣，不妨给我们 Star 或贡献代码，这是我们持续研发的动力来源。

我们并未拥有自己的大模型，但这使我们拥有更大的灵活性，可以对接任何模型。部署本项目需要至少注册下列大模型之一的API：

- 月之暗面
- OpenAI
- 讯飞星火
- 百度千帆
- Google Gemini
- 智谱AI

你还可以对接更多模型接口，参与我们另一个开源项目 [UniAI](https://github.com/uni-openai/uniai) 核心类库的开发。

如果你是开源的忠实粉丝，不能接受在项目中使用商业模型，我们也为你提供了对 ChatGLM-6B 的支持。如需部署，请按照 https://github.com/uni-openai/GLM-API 的指引操作，然后参照后端环境变量配置部分，添加 GLM_API 地址即可。

![preview](https://raw.githubusercontent.com/uni-openai/uniai/main/icon/lechat-pro.png)

体验地址：

👉 <https://lechat.cas-ll.cn>

后端开源地址：

👉 <https://github.com/uni-openai/uniai-maas>

核心类库：

👉 <https://github.com/uni-openai/uniai>

## 实现功能

- 多模型接入/切换 ✅
- 全格式Office文件上传和解析 ✅
- 图片识别 ✅
- 图片生成 ✅
- 图表生成 ✅

## 快速开始

*注意：本项目需要使用 UniAI 后端框架。[点击这里](https://github.com/uni-openai/uniai-maas) 访问。*

在开始之前，请确保您已正确安装 Node.js 运行时环境。如果您尚未安装 Node.js，请 [点击这里下载](https://nodejs.org/)。

准备就绪后，请进入项目的根目录并运行以下命令启动项目：

```bash
npm install
npm run dev
```

或

```bash
yarn
yarn dev
```

成功执行后，您通常会看到（请参考具体输出）：

```bash
VITE v3.2.5 启动完成，用时 294 毫秒

➜ 本地: http://localhost:5173/
➜ 网络: 使用 --host 暴露
```

按住 `Ctrl` 或 `Command` 并单击本地链接，在浏览器中打开项目。您可以通过扫描二维码或手机验证码登录，从而开始使用该应用程序。

如果您打算打包项目以进行本地部署，请参考 [这里](/docs/electron-packaging-guide.md)。

## 作者
[虞威龙](https://github.com/mrkk1)

[黄有为](https://github.com/devilyouwei)

本项目采用 [MIT 许可协议](LICENSE)。
