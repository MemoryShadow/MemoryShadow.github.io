/*
 * @Date: 2020-04-29 10:13:23
 * @LastEditors  : MemoryShadow
 * @LastEditTime : 2021-01-08 00:32:42
 * @Effect: 内置类ControlNode,用于控制节点,并包含一些内置的控件,可以快速创建
 * //!注:此类未完全完成,请勿用于生产环境
 */

/**
 * 节点控制器
 */

function ControlNode(MainNodeID) {

    /**
     * 储存对象名称"ID"
     */
    this.Name;

    /**
     * 储存主节点
     */
    this.MainNodeObject;

    /**
     * RegisteredNode自动维护的输入框对象表，用于追踪目标对象
     */
    this.Node_Data_List = [];

    /**
     * 此对象在公共队列中的位置
     */
    this.thisObjectIndex;

    /**
     * 构造器
     * @param {string} MainNodeID 指定要作为主节点的ID
     */
    this.constructor = function (MainNodeID) {
        this.MainNodeObject = document.getElementById(MainNodeID);
        // 储存自己的名字(ID)
        this.Name = MainNodeID;
        // 在添加前储存索引
        this.thisObjectIndex = ControlNode.ObjectList.length;
        ControlNode.ObjectList.push(this);
    }

    /**
     * 向此对象主节点注册指定的节点,使其被应用到页面中
     * @param {HTMLElement} NodeObj 节点对象
     * @return {void}
     */
    this.RegisteredNode = function (NodeObj) {
        var NodeObject = this.MainNodeObject.appendChild(NodeObj);
        this.Node_Data_List.push(NodeObject);
    }

    /**
     * 获取当前控制节点子节点长度
     */
    this.length = function () {
        return this.Node_Data_List.length;
    }

    /**
     * 清空所有子节点
     */
    this.remove = function () {
        this.MainNodeObject.remove();
    }

    /**
     * 用于移除自动管理的控件
     * @param {int} Key 要删除的键
     * @return {HTMLElement} 被删除的节点控件
     */
    this.removeChild = function (Key) {
        // 判断是数字还是字符串
        switch (typeof Key) {
            case 'number':
                var Del_Node = this.MainNodeObject.removeChild(this.Node_Data_List[Key]);
                this.Node_Data_List.splice(Key, 1);
                return Del_Node;
            case 'string':
                for (var index = 0; index < this.length(); index++) {
                    var Node = this.indexOf(index);
                    if (Node.id == Key) {
                        var Del_Node = this.MainNodeObject.removeChild(this.Node_Data_List[index]);
                        this.Node_Data_List.splice(index, 1);
                        return Del_Node;
                    }
                }
                return undefined

            default:
                return undefined;
        }
    }

    /**
     * 用于索引自动管理的控件
     * @param {int} Key 要索引的键
     * @return {HTMLElement} 被索引的节点控件
     */
    this.indexOf = function (Key) {
        // 判断是数字还是字符串
        switch (typeof Key) {
            case 'number':
                return this.Node_Data_List[Key];
            case 'string':
                for (var index = 0; index < this.length(); index++) {
                    var Node = this.Node_Data_List[index];
                    if (Node.id === Key) {
                        return Node;
                    }
                }
                return undefined

            default:
                return undefined;
        }
    }

    // 初始化
    this.constructor(MainNodeID);
}

/**
     * 新增指定类型的节点对象,在注册后将会被应用到页面中
     * @param {JSON} NodeDescription 节点描述，以下为特殊的属性(区分大小写)
     * [Tag: 标签,Text: 文本内容,Child: 子节点的描述,Checked: 如果是按钮,是否处于选中状态]
     * 其他都会被设置到属性上
     * @return {HTMLElement} 节点控制对象
     */
ControlNode.NewNode = function (NodeDescription) {
    // 创建当前节点描述
    var node = ControlNode.getNode(NodeDescription.Tag);

    // 遍历属性，将其添加到属性中
    Object.keys(NodeDescription).forEach(Attributes_Name => {
        // 除非这个属性名在这个列表中
        switch (Attributes_Name) {
            case "Tag":
            case "Child":
                // 这部分是要跳过的属性类型,此部分的内容将在其他位置处理
                break;
            case "Text":
                // 处理文本(简称)
                node.innerText = NodeDescription[Attributes_Name];
                break;
            case "Checked":
                // 处理选项信息,在这里额外处理
                node.checked = NodeDescription[Attributes_Name];
                break;
            case "Disabled":
                node.disabled = NodeDescription[Attributes_Name];
                break;

            default:
                var AttributesObject = document.createAttribute(Attributes_Name);
                AttributesObject.value = NodeDescription[Attributes_Name];
                node.setAttributeNode(AttributesObject);
                break;
        }
    });

    // 检查是否有下级节点
    if (NodeDescription.Child != undefined) {
        // 如果有，就遍历此节点并添加至自身
        NodeDescription.Child.forEach(Child => {
            var Child_node = ControlNode.NewNode(Child);
            // 将子节点添加至自身
            node.appendChild(Child_node);
        });
    }

    return node;
}

/**
 * 获取一个新的节点对象
 * @param {string} NodeType 节点类型
 * @return {HTMLElement} 指定的节点类型对象
 */
ControlNode.getNode = function (NodeType) {
    return document.createElement(NodeType);
}

/**
 * 获取一个指定样式的输入框
 * @param {String} NodeDataType 节点数据类型,以下是支持的值
 * [boolean/switch,Integer,Range,String]
 * 当此参数为Range时,必须提供Candidate参数
 * @param {*} Value 默认值
 * @param {Array} Candidate 待选列表
 * @param {boolean} isDisable 是否禁用此输入框的操作(暂未开放)
 * @return {JSON} 此输入控件的描述JSON对象
 */
ControlNode.getInputNode = function (NodeDataType, Value, Candidate, isDisable) {
    switch (NodeDataType) {
        case 'boolean':
        case 'switch':
            return JSON.parse(JSON.stringify({
                "Tag": "input",
                "type": "checkbox",
                "Class": "switch",
                "Checked": Value,
                "InputType": "Switch"
            }));
        case 'Integer':
            return JSON.parse(JSON.stringify({
                "Tag": "input",
                "type": "number",
                "placeholder": parseInt(Value),
                "value": parseInt(Value),
                "InputType": "Integer"
            }));
        case 'Range':
            return JSON.parse(JSON.stringify({
                "Tag": "div",
                "InputType": "Range",
                "Child": [
                    {
                        "Tag": "span",
                        "Text": Value
                    },
                    {
                        "Tag": "input",
                        "type": "range",
                        "onchange": "",
                        "value": parseInt(Value),
                        "min": parseInt(Candidate[0].Value.split('..')[0]),
                        "max": parseInt(Candidate[0].Value.split('..')[1])
                    }
                ]
            }));


        case 'String':
            return JSON.parse(JSON.stringify({
                "Tag": "input",
                "placeholder": Value,
                "value": Value,
                "InputType": "String",
            }));

        default:
            return JSON.parse(JSON.stringify({
                "Tag": "input"
            }));
    }
}

/**
 * 获取一个指定样式的按钮
 * @param {String} NodeDataType 节点数据类型,以下是支持的值
 * [default: 默认形式, link: 链接形式]
 * @param {String} Value 按钮的显示内容
 * @param {function,String} onClick 点击后产生的效果,随着NodeDataType改变
 * [default: {function} 一个回调函数,link: {String} 一个链接地址]
 * @param {boolean} isDisable 是否禁用此按钮的操作
 * @return {JSON} 此输入控件的描述JSON对象
 */
ControlNode.getButtonNode = function (NodeDataType, Value, onClick, isDisable) {
    let NodeObj = {};
    switch (NodeDataType) {
        case 'link':
            NodeObj = JSON.parse(JSON.stringify({
                "Tag": "a",
                "Class": isDisable ? "button disable" : "button enable",
                "Href": onClick,
                "Text": Value
            }));
            break;
        default:
            NodeObj = JSON.parse(JSON.stringify({
                "Tag": "button",
                "Disabled": isDisable ? "disable" : false,
                "OnClick": onClick,
                "Text": Value
            }));
            NodeObj['OnClick'] = onClick;
            break;
    }
    return NodeObj;
}

/**
 * 索引
 * @param {int,String} Key 要用于索引的Key
 * @return {ControlNode} 指定的控制对象
 */
ControlNode.indexOf = function (Key) {
    // 判断是数字还是字符串
    switch (typeof Key) {
        case 'number':
            return ControlNode.ObjectList[Key];
        case 'string':
            for (var index = 0; index < ControlNode.ObjectList.length; index++) {
                var controlNode = ControlNode.ObjectList[index];
                if (controlNode.Name == Key) {
                    return controlNode;
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
ControlNode.valueOf = function (MainNodeID) {
    // 检查是否存在重复的对象,如果有,就直接返回,没有的情况下才创建新对象
    if (ControlNode.indexOf(MainNodeID) == undefined) {
        // 如果没有,就New新的值
        return new ControlNode(MainNodeID);
    } else {
        // 如果不为空,就返回指定的内容
        return ControlNode.indexOf(MainNodeID);
    }
}

/**
 * 将指定ID的控制节点转为一个JSON格式的节点描述
 * @param {String,Object} NodeID 
 * @return {JSON_Object} JSON字符串
 */
ControlNode.HTMLElement2JSON_NodeDescription = function (NodeID) {
    // 创建描述
    var NodeDescription = Object();
    // 取得对象
    switch (typeof NodeID) {
        case 'string':
            var NodeObj = document.getElementById(NodeID);
            break;
        case 'object':
            var NodeObj = NodeID;
            break;
        default:
            var NodeObj = NodeID;
            break;
    }
    // 解析当前节点配置
    for (var Node_index = 0; Node_index < NodeObj.attributes.length; Node_index++) {
        var attributeName = NodeObj.attributes[Node_index].name;
        NodeDescription[attributeName] = NodeObj.getAttribute(attributeName);
    }
    // 解析特殊内容
    NodeDescription['Tag'] = NodeObj.tagName;
    // 检查是否有子节点
    if (NodeObj.childNodes.length > 0) {
        for (var Child_index = 0; Child_index < NodeObj.childNodes.length; Child_index++) {
            var Child = NodeObj.childNodes[Child_index];
            // 如果无法查到子节点的标签,就说明是文本类型,存入Text中
            if (Child.tagName == undefined) {
                NodeDescription["Text"] = Child.data;
            } else {
                if (NodeDescription.Child == undefined)
                    NodeDescription.Child = [];
                NodeDescription.Child.push(ControlNode.HTMLElement2JSON_NodeDescription(Child));
            }
        }
    }
    return NodeDescription;
}

/**
 * ControlNodeObject自动维护的输入框对象表，用于追踪操作对象
 */
ControlNode.ObjectList = [];