# 博客中公用资源描述

============================================

>`如果您不知道如何使用博客中那些资源,在对应的目录下应该有对应的内容`

这里就是关于公共资源-JavaScript脚本部分的详细介绍

****
|Author|MemoryShadow|
|---|---
|E-mail|MemoryShadow@outlook.com

****

## 索引

* [3DBox](#3DBox)
* [Loading](#Loading)
* [Minecraft Texture](#Minecraft-Texture)
* [Tools](#Tools)

****

## 3DBox

这里是关于文件[3DBox.js](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/3DBox.js "访问源代码")
的详细介绍.

这个JavaScript文件包含了一个类(语法糖),使得您可以像项目简介中那样去引用它
  |类名|类备注|
  |---|---|
  |Class_Box|类名|

这个类包含的动态接口有以下这些:

  |接口名称|接口注释|接口备注|
  |---|---|---|
  |Mouse(Info, value = event)|鼠标信息捕获函数|Info只支持以下字符串内容:`MouseDown` `MouseMove` `MouseWheel` `MouseUp`|
  |getBoxDefaultConfig()|盒子默认配置信息储存表||
  |setBoxDefaultConfig()|设置盒子数据为默认||
  |getBoxInfo()|返回盒子的配置信息||
  |setBoxInfo(key, value = undefined)|设置盒子的配置信息|`key:要修改的根键` `value:要设置的内容`|
  |setBoxLen(Len = undefined)|配置盒子边长|`Len:长度`|
  |setBoxShadowColor(Color = undefined)|设置描边颜色|`Color:要设置的颜色,例如#fff`|
  |setBoxShadowSpread(Len = undefined)|设置描边宽度|`Len:要设置的长度`|
  |setBoxShadowBlur(Len = undefined)|设置描边虚化长度|`Len:要设置的长度`|
  |setBoxTranslate({ X = undefined, Y = undefined, Z = undefined } = {})|设置方块位置信息|这个参数是修改对应位置的|
  |setBoxRotate({ X = undefined, Y = undefined, Z = undefined } = {})|设置旋转信息|这个参数是修改对应位置的|
  |setBackground(index, Value_String)|设置背景|`index:设置的面代号,3是顶部,6是底部,其他按照顺序排放` `Value_String:可以是img函数的返回值或者base64的内容`|
  |RefreshBox()|刷新界面(从配置取读信息然后更新信息)|请在写完另外接口后调用此接口进行刷新|
  
  这个类包含的静态接口有以下这些:
  
  |接口名称|接口注释|接口备注|
  |---|---|---|
  |addBoxObject(id, {...})|将指定id的div部署为一个Box,并且按照配置部署好,并新增控制对象到静态变量BoxList|`id:要转换并绑定的id` `参数2:一个完整(可以省略部分的`[配置数据](#配置数据 "什么是配置数据")`)` |
  |setBoxObject_Eye(id)|将指定id部署为一个Eye,并且按照配置部署好,用于接收全局以外的事件|`id:要转换并绑定的div的id`|
  |MouseUp(id = undefined)|鼠标释放默认事件|`id:是从哪个方块对象上传来的这个事件`|
  |MouseMove(id = undefined)|鼠标移动默认事件|`id:是从哪个方块对象上传来的这个事件`|
  |MouseDown(id = undefined)|鼠标按下默认事件|`id:是从哪个方块对象上传来的这个事件`|
  |MouseWheel(id = undefined)|滚轮滚动默认事件|`id:是从哪个方块对象上传来的这个事件`|
  |getMouseMoveValue(value = event)|计算鼠标偏移量|传递回e就好|
  |getBoxObject(id = undefined)|获得指定id的Box对象||
  
  这个类包含的静态数据(维护数据头)有以下这些:
  
  |数据名称|数据注释|数据备注|
  |---|---|---|
  |Class_Box.BoxList|数据对查表|所有智能维护的数据对象都在这个表里|
  |Class_Box._MouseUp|鼠标松开属性|鼠标松开时为true|
  |Class_Box._MouseDown|鼠标是否按下|如果按下将会标明按下的控件id|
  |Class_Box._MouseMoveOld_|记录坐标与计算值|为计算下一次偏移量|
  |Class_Box.BoxEye|记录眼睛div的id||

### 配置数据

* 以下将会向你展示这个类中每个对象的配置数据格式(Json):

```Json
  {
    "BoxLen": 300,
    "BoxShadow": {
      "Blur": 30,
      "Spread": 5,
      "Color": "#fff",
      "Inset": "none"
    },
    "Surface": {
      "1": {
        "background": ""
      },
      "2": {
        "background": ""
      },
      "3": {
        "background": ""
      },
      "4": {
        "background": ""
      },
      "5": {
        "background": ""
      },
      "6": {
        "background": ""
      },
    },
    "translate3d": {
      "X": -60,
      "Y": 200,
      "Z": 0
    },
    "rotate": {
       "X": 35,
       "Y": 45,
       "Z": 90
     }
  }
```

## Loading

这里是关于文件[Loading.js](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/Loading.js "访问源代码")
的详细介绍.

此文件包含了一个类`Loading_Control`,该类接受以下参数作为构造器:

|参数|类型|描述|用途|
|---|---|---|---
|ID|string|要作为加载控件的`canvas`节点ID|通过此ID,将会将指定的节点设为`Loading`等待控件|

此类还有一些预设的成员:

|成员类型|成员名|表达式类型|用途/功能|
|---|---|---|---|
|属性|loading_canvas|Object|储存了指定`canvas`节点的**控制**对象|
|属性|ctx|Object|储存了指定`canvas`节点的**绘制**对象|
|属性|Schedule|Number|储存了可以表达的最大百分比|
|属性|startID|String|储存了周期任务的任务ID|
|属性|canvasID|String|储存了指定`canvas`的ID|
|属性|canvasIndex|Number|指明自身在内部维护的储存库中的编号|
|属性|ClickFlag|Number|控件动画播放的状态|
|方法|[Init_CTX](#LoadingInit_CTX "详细信息")|Object|初始化内部的绘图对象`ctx`,返回`this.ctx`|
|方法|[Init](#LoadingInit "详细信息")|Object|初始化自身,会自动调用`this.Init_CTX`,返回`this`|
|方法|[setSchedule](#LoadingsetSchedule "详细信息")|Object|直接设定`Schedule`的值,返回`this`|
|方法|[PercentageValue2ShowValue](#LoadingPercentageValue2ShowValue "详细信息")|Number|将百分比的值转换为用于显示的值|
|方法|[Refresh](#LoadingRefresh "详细信息")|void|根据配置渲染页面|
|方法|[start](#Loadingstart "详细信息")|Object|开始动画,返回`this`|
|方法|[stop](#Loadingstop "详细信息")|Object|停止动画,返回`this`|
|方法|[onClick](#LoadingonClick "详细信息")|Object|如果传参为非`false`就认为是开启点击事件响应功能,返回`this`|
|静态方法|[indexOf](#Loadingstatic-indexOf "详细信息")|Object|取得指定的`Loading_Control`对象|

### Loading.Init_CTX

>初始化内部的绘图对象`ctx`

* 参数:无
* 返回值:`canvas`绘制控制对象

### Loading.Init

>初始化自身,会自动调用`this.Init_CTX`

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|ID|String|要指定的控件ID|

* 返回值:所在对象自身

### Loading.setSchedule

>直接设定`Schedule`的值

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|Percentage|Number|要设定的最大进度|

* 返回值:所在对象自身

### Loading.PercentageValue2ShowValue

>将百分比的值转换为用于显示的系数

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|params|Number|要转换的数值|

* 返回值:用于显示的公式系数之一,在内部参与运算

### Loading.Refresh

>根据配置渲染页面

* 参数:无
* 返回值:无返回值

### Loading.start

>开始动画

* 参数:无
* 返回值:所在对象自身

### Loading.stop

>停止动画

* 参数:无
* 返回值:所在对象自身

### Loading.onClick

>如果传参为非`false`就认为是开启点击事件响应功能

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|value|Boolean|如果传入`false`,将会关闭此事件监听器,反之`true`就是打开|

* 返回值:所在对象自身

### Loading.static-indexOf

>取得指定的`Loading_Control`对象

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|index|Number/String|依据指定的索引编号或者`canvas`节点的ID,返回对应的`Loading_Control`对象|

* 返回值:指定的对象
* 错误返回值:undefined

### Loading 示例

HTML:

```HTML
...
<canvas id="loading_canvas">
    Your browser does not support the canvas element.
</canvas>
...
```

JavaScript:

```JavaScript
...
var loading_Control = new Loading_Control("loading_canvas");
loading_Control.setSchedule(95).onClick(true).start();
...
```

## Minecraft Texture

这里是关于文件[MinecraftTexture.js](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/MinecraftTexture.js "访问源代码")
的详细介绍.

这里面都是Minecraft的方块贴图,目前截至在1.12.2版本,要使用他们你只要加载它,然后你的全局变量中就会加载数组TextureList,通过TextureList['文件名(不包括后缀)']即可获取base64数据

下面是一个使用示例:

```JavaScript
data:image/png;base64,' + TextureList['dirt']
```

* 里面有好多图标,不定期更新到最新版(其实我在等1.16)

## Tools

这里是关于文件[Tools.js](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/Tools.js "访问源代码")
的详细介绍.

该文件有以下方法:

|方法名|方法用途|返回值|
|---|---|---|
|[_GET](#Tools_GET)|解析当前页面中由GET方法传递过来的值|Array|
|[GetXmlHttp](#ToolsGetXmlHttp)|取得一个Ajax对象|Object|
|[Ajax](#ToolsAjax)|发送一次Ajax请求|void|

### Tools._GET

>解析当前页面中由GET方法传递过来的值

* 参数:无
* 返回值:一个数组,其值由GET方法提交的键名,或者提交的顺序(Number)来索引获得

### Tools.GetXmlHttp

>取得一个Ajax对象

* 参数:无
* 返回值:一个`XMLHttpRequest`对象

### Tools.Ajax

>发送一次Ajax请求

参数列表:  
|参数名|参数类型|参数描述|
|---|---|---|
|method|String|指定参数发送的方法,只接受GET和POST|
|Url|String|指定要请求的页面URL|
|search|String|请求的参数,不同字段之间使用&符进行分隔|
|method|callback|回调函数,参数1将会传入一个`XMLHttpRequest`对象|

* 返回值:无

方法示例:

```JavaScript
/** 
 * 获取一条彩虹屁
 * @param {String} id 要盛放返回值的HTML节点ID
*/
function CaiHongPi(id) {
    Ajax("GET",
        "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/",
        "Mode=Ajax&Function=CaiHongPi",
        function (XmlHttp) {
            // 当响应达成，并且成功的时候，就修改数据
            if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
                document.getElementById(id).innerHTML = XmlHttp.responseText;
            }
        }
    );
}
```
