/*
 * @Date         : 2020-12-26 14:56:27
 * @Author       : MemoryShadow
 * @LastEditors  : MemoryShadow
 * @LastEditTime : 2020-12-26 15:40:50
 * @Description  : 通用工具库
 */

/**
 * 获取当前页面GET方法提交的参数
 */
function _GET(e) {
    var searchStr = location.search.split('?')[1];
    if ((typeof searchStr) != 'undefined') {

        var searchStrList = searchStr.split('&');
        var searchData = [];
        for (var searchIndex in searchStrList) {
            // 取出属性
            var search = searchStrList[searchIndex].split('=');
            // 将属性加入数组
            searchData.push(search[1]);
            searchData[search[0]] = search[1];
        }
        return searchData;
    } else {
        return undefined;
    }
}

/**
 * 取得一个AJAX对象
 */
function GetXmlHttp() {
    var XmlHttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        XmlHttp = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XmlHttp;
}

/**
 * 发起一个Ajax请求
 * @param {string} method   只接受GET和POST
 * @param {string} Url      请求目标URL
 * @param {string} search   请求的内容,不同字段之间用&符号分隔
 * @param {Function} callback 回调函数，接受一个参数，那个参数是Ajax对象
 */
function Ajax(method, Url, search, callback) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        callback(XmlHttp);
    }
    XmlHttp.open(method === "GET" ? "GET" : "POST",
        Url + "?" + search,
        true);
    XmlHttp.send();
}