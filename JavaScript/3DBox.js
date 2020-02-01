// Box类(用于准备与公用环境隔离)
class Class_Box {
    // 数据
    _id = '0';
    _Config = this.getBoxDefaultConfig();

    // 构造器(需要指定要绑定的id)
    constructor(id, { Len = undefined, ShadowColor = undefined, translate_X = undefined, translate_Y = undefined, translate_Z = undefined, rotate_X = undefined, rotate_Y = undefined, rotate_Z = undefined } = {}) {
        // 绑定id
        this._id = id;
        // 对于目标数据进行初始化
        this.setBoxDefaultConfig();
        this.setBoxLen(Len);
        this.setBoxShadowColor(ShadowColor);
        this.setBoxTranslate({ X: translate_X, Y: translate_Y, Z: translate_Z });
        this.setBoxRotate({ X: rotate_X, Y: rotate_Y, Z: rotate_Z });
    }

    // 鼠标信息捕获函数
    Mouse(Info, value = event) {
        switch (Info) {
            case 'MouseDown':
                // 打开鼠标按下标记
                Class_Box._MouseDown = this._id;
                // 初始化MouseMoveOld_(并且记录值)
                Class_Box._MouseMoveOld_ = { "X": (value ? value.clientX : 0), "Y": (value ? value.clientY : 0) };
                break;
            case 'MouseMove':
                if (Class_Box._MouseDown) {
                    // 更新配置
                    if (value.altKey) {
                        this.setBoxRotate({ X: Class_Box.getMouseMoveValue().X, Y: Class_Box.getMouseMoveValue().Y });
                    } else if (value.ctrlKey) {
                        this.setBoxRotate({ Z: Class_Box.getMouseMoveValue().X, Y: Class_Box.getMouseMoveValue().Y });
                    } else if (value.shiftKey) {
                        this.setBoxTranslate({ X: Class_Box.getMouseMoveValue().X / 2, Y: Class_Box.getMouseMoveValue().Y / 2 });
                    } else {
                        // 默认拖拽事件
                        this.setBoxTranslate({ X: Class_Box.getMouseMoveValue().X, Y: Class_Box.getMouseMoveValue().Y });
                    }
                    Class_Box._MouseMoveOld_ = { "X": (value ? value.clientX : 0), "Y": (value ? value.clientY : 0) };
                }
                break;
            case 'MouseWheel':
                if (value.wheelDelta) {
                    if (value.wheelDelta > 0) {
                        // console.log('缩小');
                        this.setBoxLen(this.getBoxInfo()['BoxLen'] - 1);
                    }
                    if (value.wheelDelta < 0) {
                        // console.log('放大');
                        this.setBoxLen(this.getBoxInfo()['BoxLen'] + 1);
                    }
                }
                break;
            case 'MouseUp':
                // 关闭鼠标按下标记
                Class_Box._MouseDown = false;
                // 清空MouseMoveOld_
                Class_Box._MouseMoveOld_ = { "X": 0, "Y": 0 };
                break;
            default:
                console.log('Not know Data Info: ' + Info + ' is What');
                break;
        }
    }

    // 盒子默认配置信息储存表
    getBoxDefaultConfig() {
        return {
            // 盒子的大小
            "BoxLen": 300,
            "BoxShadow": {
                // 描边虚化半径
                "Blur": 30,
                // 盒子描边
                "Spread": 5,
                // 盒子描边颜色
                "Color": "#fff",
                // 盒子阴影颜色过渡色
                "Inset": "none"
            },
            // 盒子每个面的配置
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
            // 盒子移动位置
            "translate3d": {
                "X": -60,
                "Y": 200,
                "Z": 0
            },
            // 盒子旋转角度
            "rotate": {
                "X": 35,
                "Y": 45,
                "Z": 90
            }
        };
    }

    // 设置盒子数据为默认
    setBoxDefaultConfig() {
        this._Config = this.getBoxDefaultConfig();
        this.RefreshBox();
    }

    // 返回盒子的配置信息
    getBoxInfo() {
        return this._Config;
    }

    // 设置盒子的配置信息
    setBoxInfo(key, value = undefined) {
        // 写入数据(检测数据是否为undefined,如果为空就设置为当前的配置)
        this._Config[key] = (value != undefined ? value : this._Config[key]);
        // 执行刷新函数
        this.RefreshBox();
    }

    // 配置接口
    setBoxLen(Len = undefined) {
        this.setBoxInfo("BoxLen", Len != undefined ? Len : this.getBoxInfo()['BoxLen']);
    }

    // 设置描边颜色
    setBoxShadowColor(Color = undefined) {
        var BoxShadow_Config = this.getBoxInfo()['BoxShadow'];
        BoxShadow_Config['Color'] = Color != undefined ? Color : this.getBoxInfo()['BoxShadow']['Color'];
        this.setBoxInfo("BoxShadow", BoxShadow_Config);
    }

    // 设置描边宽度
    setBoxShadowSpread(Len = undefined) {
        var BoxShadow_Config = this.getBoxInfo()['BoxShadow'];
        BoxShadow_Config['Spread'] = Len != undefined ? Len : this.getBoxInfo()['BoxShadow']['Spread'];
        this.setBoxInfo("BoxShadow", BoxShadow_Config);
    }

    // 设置描边虚化长度
    setBoxShadowBlur(Len = undefined) {
        var BoxShadow_Config = this.getBoxInfo()['BoxShadow'];
        BoxShadow_Config['Blur'] = Len != undefined ? Len : this.getBoxInfo()['BoxShadow']['Blur'];
        this.setBoxInfo("BoxShadow", BoxShadow_Config);
    }

    // 设置位置信息
    setBoxTranslate({ X = undefined, Y = undefined, Z = undefined } = {}) {
        // 取出值
        var Temp_Translate_Data = this.getBoxInfo()['translate3d'];
        // 如果为-1就采用默认值
        var Temp_NewTranslate_Data = {
            "X": X != undefined ? X + Temp_Translate_Data['X'] : Temp_Translate_Data['X'],
            "Y": Y != undefined ? Y + Temp_Translate_Data['Y'] : Temp_Translate_Data['Y'],
            "Z": Z != undefined ? Z + Temp_Translate_Data['Z'] : Temp_Translate_Data['Z']
        }
        this.setBoxInfo('translate3d', Temp_NewTranslate_Data);
    }

    // 设置旋转信息
    setBoxRotate({ X = undefined, Y = undefined, Z = undefined } = {}) {
        // 取出值
        var Temp_Rotate_Data = this.getBoxInfo()['rotate'];
        // 如果为-1就采用默认值
        var Temp_NewRotate_Data = {
            "X": X != undefined ? X + Temp_Rotate_Data['X'] : Temp_Rotate_Data['X'],
            "Y": Y != undefined ? Y + Temp_Rotate_Data['Y'] : Temp_Rotate_Data['Y'],
            "Z": Z != undefined ? Z + Temp_Rotate_Data['Z'] : Temp_Rotate_Data['Z']
        }
        this.setBoxInfo('rotate', Temp_NewRotate_Data);
    }

    // 设置背景
    setBackground(index, Value_String) {
        // 确保索引在1_6
        if (index > 0 && index < 7) {
            // 获取各个面配置
            var Background_Config = this.getBoxInfo()['Surface'];
            // 修改目标数据
            Background_Config[index]['background'] = Value_String;
            // 将对应的值修改
            this.setBoxInfo('Surface', Background_Config);
        }
    }

    // 刷新界面(从配置取读信息然后更新信息)
    RefreshBox() {
        // 取出信息
        var BoxConfigInfo = this.getBoxInfo(this._id);
        // 获取盒子对象
        var BoxObject = document.getElementById(this._id);
        // 更新数据
        BoxObject.style.width = BoxConfigInfo['BoxLen'] + "px";
        BoxObject.style.height = BoxConfigInfo['BoxLen'] + "px";
        BoxObject.style.transform = "skew(0deg) translate3d(" + BoxConfigInfo['translate3d']['X'] + "px, " + BoxConfigInfo['translate3d']['Y'] + "px, " + BoxConfigInfo['translate3d']['Z'] + "px) rotateX(" + BoxConfigInfo['rotate']['X'] + "deg) rotateY(" + BoxConfigInfo['rotate']['Y'] + "deg) rotateZ(" + BoxConfigInfo['rotate']['Z'] + "deg)";
        // 更新子对象
        for (var index = 1; index <= 6; index++) {
            // 面对象
            var Surface_Object = document.querySelector('#' + this._id + ' > div:nth-child(' + index + ')');
            Surface_Object.style.boxShadow =
                "0 0 " + BoxConfigInfo['BoxShadow']['Blur'] + "px " + BoxConfigInfo['BoxShadow']['Spread'] + "px " + BoxConfigInfo['BoxShadow']['Color'];
            // 背景图片设置
            if (BoxConfigInfo['Surface'][index]['background'] != "") {
                // 如果不为空,就检查是否有img信息
                var image = document.querySelector('#' + this._id + ' > div:nth-child(' + index + ') img');
                if (image === null) {
                    // 如果没有img,就创建对象并设置内容
                    var image = Surface_Object.appendChild(document.createElement("img"));
                }
                // 阻止图片被拖拽
                image.draggable = false;
                // 设置图片
                image.src = BoxConfigInfo['Surface'][index]['background'];
                image.style.width = "100%";
                image.style.height = "100%";
            }
        }
        document.querySelector('#' + this._id + ' > div:nth-child(6)').style.transform = "translateZ(" + BoxConfigInfo['BoxLen'] + "px)";
    }

    // 将指定id的div部署为一个Box,并且按照配置部署好,并新增控制对象到静态变量BoxList
    static addBoxObject(id, { Len = undefined, ShadowColor = undefined, translate_X = undefined, translate_Y = undefined, translate_Z = undefined, rotate_X = undefined, rotate_Y = undefined, rotate_Z = undefined } = {}) {
        // 准备构架DIV
        var id_Obj = document.getElementById(id);
        for (var index = 1; index <= 6; index++) {
            id_Obj.appendChild(document.createElement("div"));
        }
        // 设置DIV
        id_Obj.className = "box";
        // 将新对象按照ID放进BoxList中
        Class_Box.BoxList[id] = new Class_Box(id, { Len: Len, ShadowColor: ShadowColor, translate_X: translate_X, translate_Y: translate_Y, translate_Z: translate_Z, rotate_X: rotate_X, rotate_Y: rotate_Y, rotate_Z: rotate_Z });
        id_Obj.onmousedown = function () { Class_Box.MouseDown(this.id); }
        id_Obj.onmousemove = function () { Class_Box.MouseMove(this.id); }
        id_Obj.onmousewheel = function () { Class_Box.MouseWheel(this.id); }
        id_Obj.onmouseup = function () { Class_Box.MouseUp(this.id); }
    }

    // 将指定id部署为一个Eye,并且按照配置部署好,用于接收全局以外的事件
    static setBoxObject_Eye(id) {
        Class_Box.BoxEye = id;
        var id_Obj = document.getElementById(id);
        // 设置样式
        id_Obj.className = "sence";
        // 绑定事件
        id_Obj.onmouseup = Class_Box.MouseUp;
        id_Obj.onmousemove = Class_Box.MouseMove;
    }

    // 鼠标释放事件
    static MouseUp(id = undefined) {
        Class_Box._MouseUp = !Class_Box._MouseUp;
        if (Class_Box._MouseDown) {
            Class_Box.BoxList[Class_Box._MouseDown].Mouse('MouseUp');
        }
    }

    // 鼠标移动事件
    static MouseMove(id = undefined) {
        // 如果没有点击时,就不启动调用
        if (Class_Box._MouseDown) {
            Class_Box.BoxList[Class_Box._MouseDown].Mouse('MouseMove');
        }
    }

    // 鼠标按下事件(如果按下的是正常id,就提交)
    static MouseDown(id = undefined) {
        if (typeof (id) != "undefined") {
            Class_Box.BoxList[id].Mouse('MouseDown');
        }
    }

    // 滚轮滚动事件
    static MouseWheel(id = undefined) {
        if (typeof (id) != "undefined") {
            Class_Box.BoxList[id].Mouse('MouseWheel');
        }
    }

    // 计算鼠标偏移量
    static getMouseMoveValue(value = event) {
        // 更新位置
        var MouseMoveData = {
            "X": ((value ? value.clientX : 0) - Class_Box._MouseMoveOld_.X),
            "Y": ((value ? value.clientY : 0) - Class_Box._MouseMoveOld_.Y)
        };
        return MouseMoveData;
    }

    // 获得指定id的Box对象
    static getBoxObject(id = undefined) {
        return Class_Box.BoxList[id];
    }
}

// 静态数据
// 数据对查表
Class_Box.BoxList = {
    "Box": {}
};
// 鼠标松开属性
Class_Box._MouseUp = true;
// 鼠标是否按下(如果按下将会标明按下的控件id)
Class_Box._MouseDown = false;
// 记录坐标与计算值(为计算下一次偏移量)
Class_Box._MouseMoveOld_ = { "X": 0, "Y": 0 };
// 记录眼睛id
Class_Box.BoxEye = '';

console.log("加载类 Class_Box 完成,请确保CSS被正常加载");