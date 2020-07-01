# MemoryShadow Web站点简介

对于Web站点的拓展化管理与信息库的拓展，目的是创造移植性更高的站点

并具有一定容灾性和增加维护性
[实例地址](https://MemoryShadow.github.io/ "点击前往")

****
|Author|MemoryShadow|
|---|---
|E-mail|MemoryShadow@outlook.com

****

## 索引

* [API](#API "点击前往")
* [项目](#Projects "点击前往")

## API

如您所见,这里是对于站点`MemoryShadow.freetzi.com`上API的详细描述

* 注意,除非另行说明,否则这里的所有参数都是区分大小写的

### API索引

* [彩虹屁接口调用](#彩虹屁 "点击前往")
* [ErrorMsg](#ErrorMsg "点击前往")
* [Google Translate API](#Google-Translate-API "点击前往")
* [Captcha](#Captcha "点击前往")

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
|GET参数|ErrorCode|一个合格的HTTP状态码
|返回|格式|Json

### Google Translate API

Google Translate,全球最好的翻译平台,许多人在尝试调用它的API时都会因为它多变的验证格式头疼,在这里您可以直接调用,其他的交给我们来处理

通过对于以下URL提交GET请求,将会按照你的要求向Google Translate的服务器提交翻译请求

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Translate`

和[ErrorMsg](#ErrorMsg "点击前往")项目一样,直接打开这个链接不会真正的有效,因为还缺少关键的参数`Query`,对上面这个链接以GET请求的模式附上这个提交,例如:

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Translate&Query=Hello%20world`

将会翻译Query中的单词.其他的参数在下方的列表中可以查到.

* 注意：不能超过GET方法字数上限，可能需要对数据切片

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容|备注|
|---|---|---|---
|GET参数|Query|要翻译的文本|必须
|GET参数|SourceLanguage|指定一个源语言的语言代码|[暂未开放]可选,默认为自动识别
|GET参数|Language|指定目标语言的语言代码|[暂未开放]可选,默认为zh-CN
|GET参数|Source|指定翻译服务商|[暂未开放]可选,默认为Google(也只有此项)
|返回|格式|Json|

### Captcha

这个功能实现了一个完整的验证码功能,一共有两个接口,我来为您一一阐述.

* [获取验证码](#Get-Captcha "点击前往")
* [核对验证码](#Confirm-Captcha "点击前往")

#### Get Captcha

此接口可以获取一个验证码和它的令牌,验证码令牌是验证的重要凭据,通过令牌和验证值来校验输入验证是否通过,以下是获取数据的URL,直接打开此链接也是不可行的,您需要通过GET方式提交您需要以何种方式获取

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Captcha&OperateMode=GetData`

您需要附加创建一个名为`DataType`的GET项,它的值只能是Html或者Json,注意,这是区分大小写的.
比如下方的URL就可以正常工作.

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Captcha&OperateMode=GetData&DataType=Json`

将会返回一个Json数据,其中包含了一个项为`Token`的令牌,以及名为`CaptchaImgValue`的,Base64后的验证码图片,您需要自己在前方手动加上`data:image/png;base64,`,注意不要漏掉逗号.

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容|备注|
|---|---|---|---
|GET参数|DataType|要获取的格式|只接受Json或者Html作为值
|返回|格式|Json或者Html|

#### Confirm Captcha

此接口将会帮助您验证输入的验证码是否合规.让我们看看下方的URL,这是接收数据的地址,这个接口为了安全,只接受并且只理会POST数据.这个接口要求提交两个POST项,分别是项`Token`和项`InputValue`,顾名思义,项`Token`就是这个数据的Token,而项`InputValue`则是用户的输入,每个Token只能被验证1次,您不能使用同一个Token重复提交.

`https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Captcha&OperateMode=SubmitData&SubmitType=ConfirmCaptcha`

* 注意：不能超过POST方法数据上限(部分浏览器有限制)，可能需要对数据切片

* 注意：使用Ajax时需要联系我授权域名,否则可能会因为用户浏览器的默认设置,请求会被拦截

|类型|项名|内容
|---|---|---
|POST参数|Token|要核对的验证码令牌
|POST参数|InputValue|用户输入的验证码值
|返回|格式|字符串`True`或是`False`

## Projects

### 项目索引

* [3DBox](#3DBox "点击前往")

### 3DBox

`此项目前正在编辑中`

一个为Minecraft玩家们准备的Web资源,借助3DBox,可以快速的在Web上构建方块,例如展示您的主城
