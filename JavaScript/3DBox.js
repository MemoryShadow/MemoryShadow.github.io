// Box类(用于准备与公用环境隔离)
class Class_Box {
    // 数据
    _id = '0';
    _Config = this.getBoxDefaultConfig();
    // 鼠标是否按下(如果按下将会标明按下的id)
    // _MouseDown = false;
    // 记录坐标与计算值(为计算下一次偏移量)
    // _MouseMoveOld_ = { "X": 0, "Y": 0 };

    // 构造器(需要指定要绑定的id)
    constructor(id, { Len = undefined, Color = undefined, translate_X = undefined, translate_Y = undefined, translate_Z = undefined, rotate_X = undefined, rotate_Y = undefined, rotate_Z = undefined } = {}) {
        // 绑定id
        this._id = id;
        // 对于目标数据进行初始化
        this.setBoxLen(Len);
        this.setBoxColor(Color);
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
        // Debug打印块

        if (Class_Box._MouseDown) {
            console.log(Info + ':' + this._id + (value ? ('[' + value.clientY + ',' + value.clientX + ']') : ''));
            // 检查数据
            console.log("MouseMoveData");
            console.log(Class_Box.getMouseMoveValue());
        }
    }

    // 盒子默认配置信息储存表
    getBoxDefaultConfig() {
        return {
            "BoxLen": 300,
            "BoxColor": "fff",
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
        };
    }

    // 设置盒子数据为默认
    setBoxDefaultConfig() {
        this.Config = getBoxDefaultConfig();
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

    // 设置颜色
    setBoxColor(Color = undefined) {
        this.setBoxInfo("BoxColor", Color != undefined ? Color : this.getBoxInfo()['BoxColor']);
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
            document.querySelector('#' + this._id + ' > div:nth-child(' + index + ')').style.backgroundSize = BoxConfigInfo['BoxLen'] + "px " + BoxConfigInfo['BoxLen'] + "px";
            document.querySelector('#' + this._id + ' > div:nth-child(' + index + ')').style.boxShadow = "0 0 30px 5px #" + BoxConfigInfo['BoxColor'];
        }
        document.querySelector('#' + this._id + ' > div:nth-child(6)').style.transform = "translateZ(" + BoxConfigInfo['BoxLen'] + "px)";
    }

    // 将指定id的div部署为一个Box,并且按照配置部署好,返回一个此对象的控制模块(必须赋值给先前定义名字的对象)
    static addBoxObject(id, { Len = undefined, Color = undefined, translate_X = undefined, translate_Y = undefined, translate_Z = undefined, rotate_X = undefined, rotate_Y = undefined, rotate_Z = undefined } = {}) {
        // 准备构架DIV
        var id_Obj = document.getElementById(id);
        for (var index = 1; index <= 6; index++) {
            id_Obj.appendChild(document.createElement("div"));
        }
        // 设置DIV
        id_Obj.className = "box";
        // 将新对象按照ID放进BoxList中
        Class_Box.BoxList[id] = new Class_Box(id, { Len: Len, Color: Color, translate_X: translate_X, translate_Y: translate_Y, translate_Z: translate_Z, rotate_X: rotate_X, rotate_Y: rotate_Y, rotate_Z: rotate_Z });
        id_Obj.onmousedown = function () { Class_Box.MouseDown(this.id); }
        id_Obj.onmousemove = function () { Class_Box.MouseMove(this.id); }
        id_Obj.onmousewheel = function () { Class_Box.MouseWheel(this.id); }
        id_Obj.onmouseup = function () { Class_Box.MouseUp(this.id); }
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
        // 检测id状态,如果为空就跳过
        // id = (typeof (id) != "undefined" ? id : Class_Box._MouseDown);
        // console.log(id);
        if (typeof (id) != "undefined") {
            console.log("id为: " + id + " 的盒子,获取了控制权");
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