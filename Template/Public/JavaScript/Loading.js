/*
 * @Date         : 2020-12-25 20:36:22
 * @Author       : MemoryShadow
 * @LastEditors  : MemoryShadow
 * @LastEditTime : 2020-12-26 18:01:16
 * @Description  : 创建一个正在加载的界面
 */

function Loading(ID) {
    /**
     * 储存对象名称"ID"
     */
    this.Name;
    /**
     * 储存主节点
     */
    this.MainNodeObject = {};

    /**
     * 绘制对象
     */
    this.ctx = {};

    /**
     * 此对象在公共队列中的位置
     */
    this.thisObjectIndex;

    // 储存信息
    this.set = {
            Canvas_Info: {
                CenterPoint: {
                    X: 0,
                    Y: 0
                }
            },
            Round_Info: {
                Rodius: 0
            }
        }
        // 最大显示进度(百分比)
    this.Schedule = 0;
    // 自由显示进度(自动维护的属性)
    this._A_show_Schedule = 0;
    this._A_show_Direction = 1;
    this._A_show_Angle = 0;
    // 任务控制ID
    this.startID = 0;
    // 记录自身在内部的编号
    this.canvasIndex = 0;
    // 记录点击标志
    this.ClickFlag = 0;
    // 初始化绘图对象
    this.Init_CTX = function(e) {
            this.ctx = this.MainNodeObject.getContext("2d");
            // 移动绘制中心的位置到画布中心
            this.ctx.lineWidth = (this.MainNodeObject.width >= this.MainNodeObject.height) ?
                this.MainNodeObject.height / 10 :
                this.MainNodeObject.width / 10;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.ctx.strokeStyle = "#419fdf";
            this.ctx.translate(this.set.Canvas_Info.CenterPoint.X, this.set.Canvas_Info.CenterPoint.Y);
            this.ctx.rotate(-90 * Math.PI / 180);
            return this.ctx;
        }
        // 初始化
    this.constructor = function(ID) {
            // 对输入进行检查,如果是对象就尝试转换
            // 初始化本对象
            switch (typeof ID) {
                case "string":
                    this.MainNodeObject = document.getElementById(ID);
                    if (this.MainNodeObject === null) {
                        return undefined;
                    }
                    if (Loading.indexOf(ID) !== undefined) {
                        return Loading.indexOf(ID);
                    }
                    break;
                case "object":
                    // 依旧尝试进行处理,但是要求此属性必须要有ID的属性
                    if (ID.id === "") {
                        this.MainNodeObject = document.getElementById(ID.id);
                        if (Loading.indexOf(ID.id) !== undefined) {
                            return Loading.indexOf(ID.id);
                        }
                    } else {
                        return undefined;
                    }
                    break;
                default:
                    return undefined;
            }

            // 计算绘制对象实际高度
            this.MainNodeObject.height = this.MainNodeObject.offsetHeight;
            this.MainNodeObject.width = this.MainNodeObject.offsetWidth;
            // 计算画布的中心位置
            this.set.Canvas_Info.CenterPoint.X = this.MainNodeObject.width / 2;
            this.set.Canvas_Info.CenterPoint.Y = this.MainNodeObject.height / 2;
            // 描述绘制对象(下方计算依赖于此处计算的数据)
            this.Init_CTX();
            // 计算圆的半径信息
            this.set.Round_Info.Rodius = (this.MainNodeObject.width >= this.MainNodeObject.height) ?
                (this.MainNodeObject.height / 2) - (this.ctx.lineWidth / 2) :
                (this.MainNodeObject.width / 2) - (this.ctx.lineWidth / 2);
            // 注册本对象
            this.Name = ID;
            this.thisObjectIndex = Loading.ObjectList.length;
            Loading.ObjectList.push(this);
            return this;
        }
        // 设置最大进度
    this.setSchedule = function(Percentage) {
            this.Schedule = Percentage;
            return this;
        }
        // 将百分比数值转换为用于显示的数值
    this.PercentageValue2ShowValue = function(params) {
            switch (params) {
                case 100:
                    return 2;
                case 0:
                    return 0;
                default:
                    return (100 - params) / 100 * 2;
            }
        }
        // 渲染
    this.Refresh = function(e) {
            this._A_show_Schedule = parseInt(this._A_show_Schedule) + this._A_show_Direction;
            // 大于360°就重置
            this._A_show_Angle = this._A_show_Angle > 360 ? parseInt(0) : parseInt(this._A_show_Angle) + 1;
            // 只要新数据不低于0并且不高于this.Schedule就继续
            if ((this._A_show_Schedule >= 0) && (this._A_show_Schedule <= this.Schedule)) {
                // 如果符合,就继续渲染
                // 擦除数据
                this.ctx.clearRect(-(this.MainNodeObject.width / 2), -(this.MainNodeObject.height / 2), this.MainNodeObject.width, this.MainNodeObject.height);
                this.ctx.beginPath();
                this.ctx.rotate((-90 + this._A_show_Angle) * Math.PI / 180);
                this.ctx.arc(0, 0, this.set.Round_Info.Rodius, 0, this.PercentageValue2ShowValue(this._A_show_Schedule) * Math.PI, true);
                this.ctx.stroke();
            } else {
                // 否则反向this._A_show_Direction
                this._A_show_Direction = -this._A_show_Direction;
            }
        }
        // 启动
    this.start = function(e) {
            this.ClickFlag = 1;
            this.startID = setInterval(function(ID) {
                Loading.indexOf(ID).Refresh();
            }, 50, this.canvasIndex);
            return this;
        }
        // 停止
    this.stop = function(e) {
            this.ClickFlag = -1;
            clearInterval(this.startID);
            this.startID = 0;
            return this;
        }
        // 设置事件接收器
    this.onClick = function(value) {
            // 如果是false或者0, 就设数据为0,并且在移除监听器后退出
            if (value === false) {
                this.ClickFlag = 0;
                this.MainNodeObject.onclick = null;
            } else {
                // 就检测值,如果此时为负数就执行start,如果此时为正数,就执行stop
                // 重新设置监听器
                this.MainNodeObject.onclick = function onclick(event) {
                    Loading.indexOf(this.id).onClick();
                };
                this.ClickFlag < 0 ? this.start() : this.stop();
            }
            return this;
        }
        // 执行代码
    return this.constructor(ID);
}

Loading.ObjectList = [];
// 获取指定的索引
Loading.indexOf = function(index) {
    switch (typeof index) {
        case "number":
            return Loading.ObjectList[index];
        case "string":
            // 索引指定ID的内容
            for (var key in Loading.ObjectList) {
                var LoadingObj = Loading.ObjectList[key];
                if (LoadingObj.Name === index) {
                    // 如果符合就直接返回
                    return LoadingObj;
                }
                // 如果没有,就初始化内容并返回
                return new Loading(index);
            }
            break;
        default:
            return undefined;
    }
}
