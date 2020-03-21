博客中资源的使用实例项目
============================================

如果您不知道如何使用博客中那些资源,在对应的目录下应该有对应的内容

****
|Author|MemoryShadow|
|---|---
|E-mail|MemoryShadow@outlook.com

****

# 索引

* [3DBox](#3DBox)

****

# 3DBox

您可能有注意到,此页面中只有两个方块和一段提示,除此之外并没有其他内容.
而这个项目的目的在于向您演示如何调用来自于另一个目录下的公共数据: [Minecraft贴图](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/README.md#MinecraftTexture "查看描述文件")数据,[方块构成](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/JavaScript/README.md#3DBox "查看描述文件")脚本以及[方块基础样式文件](https://github.com/MemoryShadow/MemoryShadow.github.io/blob/master/Template/Public/Style/README.md#3DBox "查看描述文件"),使用以下代码,即可迅速构建一个Minecraft方块:
* JavaScript部分:
```JavaScript
// 此行申请一个'眼睛'用于监控屏幕操作一个页面只需要申请一次,这个眼睛是一个id为Sence的div,将在下面的代码中创建
Class_Box.setBoxObject_Eye('Sence');
// 将一个名为Box的Div初始化为一个盒子,并且设定边长为120px
Class_Box.addBoxObject('Box', { Len: 120 });
// 通过getBoxObject方法获取Box对象并且设置它的阴影(和css同效)
Class_Box.getBoxObject('Box').setBoxShadowSpread(0);
Class_Box.getBoxObject('Box').setBoxShadowBlur(0);
// 使用for为它的每个面都贴上贴图,贴图的名字和Minecraft中文件名相同
for (let Box_index = 1; Box_index <= 6; Box_index++) {
  // 通过接口设置对应面的贴图,调用TextureList数组的数据进行贴图处理
  Class_Box.getBoxObject('Box').setBackground('' + Box_index + '', 'data:image/png;base64,' + TextureList['dirt']);
}
```
* HTML部分为:
```html
<!DOCTYPE html>
<head>
  <link href="https://MemoryShadow.github.io/Template/Public/Style/3DBox.css" rel="stylesheet" />
</head>
...
<script src="https://MemoryShadow.github.io/Template/Public/JavaScript/3DBox.js"></script>
<script src="https://MemoryShadow.github.io/Template/Public/JavaScript/MinecraftTexture.js"></script>
<div id="Sence">
  <div id="Box"></div>
</div>
```
