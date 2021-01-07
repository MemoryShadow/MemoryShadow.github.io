/*
 * @Date         : 2021-01-07 23:18:20
 * @Author       : MemoryShadow
 * @LastEditors  : MemoryShadow
 * @LastEditTime : 2021-01-08 01:19:04
 * @Description  : 用于处理依赖的Depend类
 */

/**
 * 将指定资源添加至加载队列中并加载,用于处理依赖
 * @param {String} ResourcesURL 指定资源URL
 */
function Depend(ResourcesURL) {
    // 此资源的URL
    this.ResourcesURL;
    // 此资源的类型
    this.ResourcesType;
    // 此对象在公共队列中的位置
    this.thisObjectIndex;
    // 节点对象
    this.NodeObj = undefined;

    /**
     * 解析当前URL的类型
     * @returns {String} 类型
     */
    this.AnalysisResourcesType = function (e) {
        this.ResourcesType = this.ResourcesURL.split(".").pop();
        return this.ResourcesType;
    }

    /**
     * 注册当前资源
     * @returns {HTMLElement} 已经成功注册的HTMLElement对象
     */
    this.RegisteredNode = function (e) {
        switch (this.ResourcesType) {
            case 'js':
                let script = document.createElement("script");
                script.src = this.ResourcesURL;
                this.NodeObj = document.head.appendChild(script);
                break;
            case 'css':
                let link = document.createElement("link");
                link.href = this.ResourcesURL;
                link.type = "text/css";
                link.rel = "stylesheet";
                this.NodeObj = document.head.appendChild(link);
                break;

            default:
                console.error("暂不支持这个类型的资源");
                return undefined;
        }
        // 记录当前的控制组件
        return this.NodeObj;
    }

    /**
    * 构造器
    * @param {String} ResourcesURL 指定资源URL
    */
    this.constructor = function (ResourcesURL) {
        // 储存URL
        this.ResourcesURL = ResourcesURL;
        // 自动推导资源类型
        this.ResourcesType = this.AnalysisResourcesType();
        // 记录当前索引位置
        this.thisObjectIndex = Depend.ObjectList.length;
        // 将自身添加至对象列
        Depend.ObjectList.push(this);
    }

    this.constructor(ResourcesURL);
}

/**
 * 索引
 * @param {int,String} Key 要用于索引的Key
 * @return {Depend} 指定的控制对象
 */
Depend.indexOf = function (Key) {
    // 判断是数字还是字符串
    switch (typeof Key) {
        case 'number':      // 数字索引就直接索引
            return Depend.ObjectList[Key];
        case 'string':      // 是字符串,就逐一匹配
            for (var index = 0; index < Depend.ObjectList.length; index++) {
                var depend = Depend.ObjectList[index];
                if (depend.ResourcesURL === Key) {
                    return depend;
                }
            }
            return undefined

        default:
            return undefined;
    }
}

/**
 * 获取指定节点的控制对象
 * @param {string} MainNodeID 指定要作为主节点的ID
 * @return {Depend} 指定的控制对象
 */
Depend.valueOf = function (index) {
    // 检查是否存在重复的对象,如果有,就直接返回,没有的情况下才创建新对象
    if (Depend.indexOf(index) == undefined) {
        // 如果没有,就New新的值
        return new Depend(index);
    } else {
        // 如果不为空,就返回指定的内容
        return Depend.indexOf(index);
    }
}

// 数据队列(避免重复导入同一个文件)
Depend.ObjectList = [];