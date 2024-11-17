<p align=center>
<img height=90px src="./img/logo.png"/>
</p>

<p align=center> <a href="./README.md">English Readme</a></p>

<p align=center>
启发自 <b>KimiChat</b>，基于 <b>UniAI</b> 开发，集成多种 AI 大模型的文档解析及内容生成平台。
</p>

<p align=center>
<a href="https://lechat.cas-ll.cn" target="_blank">访问乐聊专业版</a>
</p>

## 简介

我们非常喜欢 [月之暗面](https://www.moonshot.cn) 的产品 [KimiChat](https://kimi.moonshot.cn)。
受其启发，我们开发并开源了 **[乐聊（专业版）](https://lechat.cas-ll.cn)**，一款基于生成式大模型和知识图谱的 **文档解析** 和 **问答聊天** 平台，支持全套Office文件解析，PDF解析，图片解析等，使用方式与ChatGPT相同，以聊天形式呈现。

我们的项目比较简单，没有得到商业投资，依赖于开源社区贡献代码，实现更多丰富有趣的功能。我们欢迎您的加入，帮助乐聊升级！

我们没有足够的资金训练自己的大语言模型，但这使我们在模型选择上拥有更大的灵活性，可以对接任何模型。目前 **乐聊（专业版）** 已经支持的模型包括：

-   月之暗面
-   OpenAI
-   讯飞星火
-   百度千帆
-   Google Gemini
-   智谱AI
-   阿里通义千问

你还可以对接更多模型接口，这需要你参与我们另一个开源项目 [UniAI](https://github.com/uni-openai/uniai) 的开发，它是提供乐聊多模型调用的核心类库。

如果你是开源的忠实粉丝，不能接受在项目中使用商业模型，我们也为你提供了对GLM开源模型的支持。如需部署，请按照 <https://github.com/uni-openai/GLM-API> 的指引操作，然后参照后端环境变量配置部分，添加 **GLM_API** 地址即可。

![LeChat Pro](https://raw.githubusercontent.com/uni-openai/uniai/main/icon/lechat-pro.png)

**体验地址：**

👉 <https://lechat.cas-ll.cn>

**后端开源地址：**

👉 <https://github.com/uni-openai/uniai-maas>

**UniAI 核心类库：**

👉 <https://github.com/uni-openai/uniai>

**微信小程序开源地址：**

👉 <https://github.com/uniai-lab/lechat-miniapp-v1>

## 主要功能

-   🧠 多模型切换 ✅
-   📃 全Office文件上传和解析 ✅
-   👀 图片识别 ✅
-   🎨 图片生成 ✅
-   📈 图表生成 ✅

## ChatKG 知识图谱

我们正在开发创新功能，基于知识图谱的聊天——**ChatKG**。

![ChatKG](./img/chat-kg.png)

## 快速开始

_注意：本项目需要使用 UniAI 后端框架。[点击这里](https://github.com/uni-openai/uniai-maas) 部署。_

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
