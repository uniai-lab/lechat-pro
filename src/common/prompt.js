/** @format */

export const resumePrompt = `
解析并提取上传的简历中的关键信息，并只输出一个格式化后的JSON，不要返回其他的信息。简历可以是 PDF、Word 文档、图片等格式，也可以是经格式化后的JSON。请将简历内容分解并归类到以下模块中，其中若有的项上传的文件中没有体现，则置为空字符串""，特别的，如果未指明性别则置为null，如果未指明年龄则置为0，"GPA满分"这一项只存在"4.0"或者"5.0"两项，"过程时间"这一项将始终返回一个格式化的字符串数组，具体格式在示例中有说明，如果有多个"教育经历"、"项目经历"、"实习经历"，则返回其对应的数组：

1. **个人信息**:
   - 姓名
   - 性别
   - 年龄
   - 联系电话
   - 电子邮件
   - 地址
   - 微信
   - 个人博客 
   - Github个人页

2. **教育经历**:
   - 学位
   - 专业
   - 学校名称
   - 过程时间
   - GPA
   - GPA分制
   - 荣誉或奖项

3. **项目经历**:
   - 项目名称
   - 项目描述
   - 技术栈
   - 个人贡献
   - 项目时间
   - 项目链接

4. **实习经历**:
   - 实习公司名称
   - 实习职位
   - 实习时间
   - 主要职责
   - 主要成就

5. **附加信息**:
   - 个人技能
   - 其他信息

请以结构化的 JSON 格式返回提取的信息，例如：

json
{
  "basic": {
    "name": "张三",
    "gender":"男",
    "age":22,
    "phone": "123-456-7890",
    "email": "zhangsan@example.com",
    "address": "上海市浦东新区",
    "site": "https://www.zhangsan.icu",
    "github":"https://github.zhangsan.io.com"
  },
  "education": [
    {
      "degree": "计算机科学学士",
      "major": "计算机科学",
      "school": "上海交通大学",
      "range": ["2021-06","2025-09"],
      "gpa": "3.8",
      "full": "4.0",
      "honor": "优秀毕业生"
    },
    {
      "degree": "计算机科学硕士",
      "major": "计算机科学与技术",
      "school": "北京大学",
      "range": ["2025-06","2028-09"],
      "gpa": "3.9",
      "full": "4.0",
      "honor": "优秀毕业生"
    }
  ],
  "project": [
    {
      "name": "在线购物平台",
      "description": "开发了一个全栈的在线购物平台。",
      "tech": "React, Node.js, MongoDB",
      "work": "负责前端界面的设计与开发。",
      "range": ["2021-06","2021-09"],
      "url": "https://shopping-platform.com"
    },
    {
      "name": "农业图像识别系统",
      "description": "开发了一个苹果成熟是否的识别系统。",
      "tech": "Vue3, Node.js, Python",
      "work": "负责具体苹果图像识别",
      "range": ["2020-06","2020-09"],
      "url": "https://argri-platform.com"
    }
  ],
  "work": [
    {
      "company": "阿里巴巴集团",
      "position": "前端开发实习生",
      "range": ["2022-03","2023-01"],
      "mission": "协助开发新的前端功能。",
      "output": "提升了页面加载速度20%"
    },
    {
      "company": "腾讯音乐集团",
      "position": "算法工程师",
      "range": ["2024-06","2024-12"],
      "mission": "对大模型进行调参并确立算法。",
      "output": "提升了加载速度40%"
    }
  ],
  "addition": {
    "skill":"编程语言：JavaScript、python；技术工具：git、docker；语言能力：英语四六级",
    "other":"羽毛球高手、乐团声部长"
  }
}
  
`
