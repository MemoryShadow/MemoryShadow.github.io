/*
 * @Date         : 2021-01-07 23:18:20
 * @Author       : MemoryShadow
 * @LastEditors  : MemoryShadow
 * @LastEditTime : 2021-01-08 00:32:33
 * @Description  : 用于处理依赖的Depend类
 */

/**
 * 将指定资源添加至加载队列中并加载,用于处理依赖
 * @param {String} ResourcesURL     指定资源URL
 */
function Depend(ResourcesURL) {
    // 此资源的URL
    this.ResourcesURL;
    // 此资源的类型
    this.ResourcesType;
    // 此对象在公共队列中的位置
    this.thisObjectIndex;

    /**
     * 解析当前URL的类型
     * @returns {String} 类型
     */
    this.AnalysisResourcesType = function (e) {
        this.ResourcesType = this.ResourcesURL.split(".").pop();
        return this.ResourcesType;
    }

    /**
    * 构造器
    * @param {String} ResourcesURL     指定资源URL
    */
    this.constructor = function (ResourcesURL) {
        this.ResourcesURL = ResourcesURL;
        this.ResourcesType = this.AnalysisResourcesType();
        this.thisObjectIndex = Depend.ObjectList.length;
        // 将自身添加至对象列
        Depend.ObjectList.push(this);
    }

    this.constructor(ResourcesURL, ResourcesType);
}

/**
 * 索引
 * @param {int,String} Key 要用于索引的Key
 * @return {ControlNode} 指定的控制对象
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
 * @return {ControlNode} 指定的控制对象
 */
Depend.valueOf = function (index) {
    // 检查是否存在重复的对象,如果有,就直接返回,没有的情况下才创建新对象
    if (ControlNode.indexOf(index) == undefined) {
        // 如果没有,就New新的值
        return new ControlNode(index);
    } else {
        // 如果不为空,就返回指定的内容
        return ControlNode.indexOf(index);
    }
}

// 数据队列(避免重复导入同一个文件)
Depend.ObjectList = [];