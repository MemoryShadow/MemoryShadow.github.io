<!--
 * @Date: 2020-03-23 00:12:04
 * @Author: MemoryShadow
 * @LastEditors: MemoryShadow
 * @LastEditTime: 2020-07-01 17:46:47
 * @Effect: Do not edit
--> 
# MemoryShadow Web站点简介

对于Web站点的拓展化管理与信息库的拓展，目的是创造移植性更高的站点

并具有一定容灾性和增加维护性
[实例地址](https://MemoryShadow.github.io/)

****
|Author|MemoryShadow|
|---|---
|E-mail|MemoryShadow@outlook.com

****

## 索引

* [API](#API)
* [项目](#Projects)


## API

如您所见,这里是对于站点`MemoryShadow.freetzi.com`上API的详细描述

### API索引

* [彩虹屁接口调用](#彩虹屁)
* [ErrorMsg](#ErrorMsg)
* [Google Translate API](#Google-Translate-API)

### 彩虹屁

噢,如您所见,我们这个API来自于[沙雕APP](https://chp.shadiao.app/ "点击前往"),感谢他的支持.

这个接口的调用十分的简单,它仅接收GET请求,而不理会POST请求,每次刷新这个URL都会得到一句新的"彩虹屁"

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=CaiHongPi`

您只需要对此URL提交请求即可.

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容|
|---|---|---
|返回|格式|Text

### ErrorMsg

这是一个对Http错误代码进行友好描述与调侃的项目,在您的网站内容暂时无法访问时,您可以将此处内容作为错误页面返回.

通过向下方URL进行提交请求,将会以Json格式返回您请求的HTTP状态码友好的解释与调侃.

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=ErrorMsg`

直接调用此URL链接并不会返回数据,因为缺少了重要的组成部分,您应该以GET方式提交`ErrorCode`项,值是你想要获取的HTTP状态码.例如以下URL将会返回一句对HTTP错误码503的错误原因与调侃:

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=ErrorMsg&ErrorCode=503`

* 注意：不能超过GET方法字数上限，可能需要对数据切片

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容|
|---|---|---
|参数|ErrorCode|一个合格的HTTP状态码
|返回|格式|Json

### Google Translate API

`此项目前正在编辑中`

Google Translate,全球最好的翻译平台,许多人在尝试调用它的API时都会因为它多变的验证格式头疼,在这里您可以直接调用,其他的交给我们来处理

通过对于以下URL提交GET请求,将会按照你的要求向Google Translate的服务器提交翻译请求

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Translate`

和[ErrorMsg](#ErrorMsg)项目一样,直接打开这个链接不会真正的有效,因为还缺少关键的参数`Query`,对上面这个链接以GET请求的模式附上这个提交,例如:

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Translate&Query=Hello%20world`

将会翻译Query中的单词.其他的参数在下方的列表中可以查到.

* 注意：不能超过GET方法字数上限，可能需要对数据切片

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容|备注|
|---|---|---|---
|参数|Query|要翻译的文本|必须
|参数|SourceLanguage|指定一个源语言的语言代码|[暂未开放]可选,默认为自动识别
|参数|Language|指定目标语言的语言代码|[暂未开放]可选,默认为zh-CN
|参数|Source|指定翻译服务商|[暂未开放]可选,默认为Google(也只有此项)
|返回|格式|Json|

## Projects

### 项目索引

* [3DBox](#3DBox)

### 3DBox

`此项目前正在编辑中`

一个为Minecraft玩家们准备的Web资源,借助3DBox,可以快速的在Web上构建方块,例如展示您的主城
