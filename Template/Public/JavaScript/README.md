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
* [Minecraft Texture](#Minecraft-Texture)

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

## Minecraft Texture

这里是关于文件[MinecraftTexture.js](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/MinecraftTexture.js "访问源代码")
的详细介绍.

这里面都是Minecraft的方块贴图,目前截至在1.12.2版本,要使用他们你只要加载它,然后你的全局变量中就会加载数组TextureList,通过TextureList['文件名(不包括后缀)']即可获取base64数据

下面是一个使用示例:

```JavaScript
data:image/png;base64,' + TextureList['dirt']
```

* 里面有好多图标,不定期更新到最新版(其实我在等1.16)
