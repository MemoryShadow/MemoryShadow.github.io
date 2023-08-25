---
title: API使用示例
date: 2023-08-25 06:33:30
tags:
---

<script>
function CaiHongPi(id) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        // 当响应达成，并且成功的时候，就修改数据
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
            document.getElementById(id).innerHTML = XmlHttp.responseText;
        }
    }
    XmlHttp.open("GET", "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=CaiHongPi", true);
    XmlHttp.send();
}
function GetErrorMsg(ErrorCode) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        // 当响应达成，并且成功的时候，就修改数据
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
            document.getElementById('ErrorCode').value = JSON.parse(XmlHttp.responseText).ErrorCode;
            document.getElementById('ErrorText').innerHTML = JSON.parse(XmlHttp.responseText).ErrorText;
            document.getElementById('ErrorPrint').innerHTML = JSON.parse(XmlHttp.responseText).ErrorPrint;
            document.getElementById('ErrorInfo').innerHTML = XmlHttp.responseText;
        }
    }
    XmlHttp.open("GET", "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=ErrorMsg&ErrorCode=" + ErrorCode, true);
    XmlHttp.send();
}
var Data;
function Translate(Query) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        // 当响应达成，并且成功的时候，就修改数据
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
            Data = XmlHttp.responseText;
            document.getElementById('TranslateResult').innerHTML = JSON.parse(XmlHttp.responseText).sentences[0].trans;
            document.getElementById('TranslateResultSource').innerHTML = XmlHttp.responseText;
        }
    }
    XmlHttp.open("GET", "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Translate&Query=" + Query, true);
    XmlHttp.send();
}
function Get_CaptchaData(Id) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        // 当响应达成，并且成功的时候，就修改数据
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
            Data = XmlHttp.responseText;
            document.getElementById(Id).Token = JSON.parse(XmlHttp.responseText).Token;
            document.getElementById(Id).src = "data:image/png;base64," + JSON.parse(XmlHttp.responseText).CaptchaImgValue;
        }
    }
    XmlHttp.open("GET", "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Captcha&OperateMode=GetData&DataType=Json", true);
    XmlHttp.send();
}

function Post_CaptchaData(Id, InputValue) {
    var XmlHttp = GetXmlHttp();
    XmlHttp.onreadystatechange = function () {
        // 当响应达成，并且成功的时候，就修改数据
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
            Data = XmlHttp.responseText;
            document.getElementById('Result').innerHTML = (XmlHttp.responseText == "False") ? "验证失败,验证码无效或发生错误" : "验证成功,验证码有效";
            // 并且在响应后刷新验证码
            Get_CaptchaData('CaptchaImg');
        }
    }
    XmlHttp.open("POST", "https://memoryshadow.freetzi.com/Template/Public/ToolAPI/?Mode=Ajax&Function=Captcha&OperateMode=SubmitData&SubmitType=ConfirmCaptcha", true);
    XmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XmlHttp.send("Token=" + document.getElementById(Id).Token + "&InputValue=" + InputValue);
    document.getElementById(Id).placeholder = InputValue;
    document.getElementById(Id).value = "";
}
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
function Init() {
    CaiHongPi('CaiHongPi');
    GetErrorMsg(ErrorCode.value);
    Translate(TranslateSource.value);
    Get_CaptchaData('CaptchaImg');
}

window.onload = Init
</script>

### 彩虹屁接口调用示例(感谢沙雕APP)

<span id="CaiHongPi"></span><button onclick="CaiHongPi('CaiHongPi');"><i class="fa-solid fa-arrows-rotate"></i></button>

### ErrorMsg项目示例

错误代码: <input onblur="this.style.border = 'none';GetErrorMsg(this.value)" onclick="this.style.border = ''"
    style="border:none;font-size: 17px;" id="ErrorCode" value="503"></input>
错误描述: <span id="ErrorText"></span>
调侃/吐槽: <span id="ErrorPrint"></span>
完整返回: <span id="ErrorInfo"></span>

### 翻译接口(Google 翻译)

源内容: <input onblur="this.style.border = 'none';Translate(this.value)" onclick="this.style.border = ''"
    style="border:none;font-size: 17px;" id="TranslateSource" value="TranslateSource"></input>
翻译后的内容: <span id="TranslateResult"></span>
返回具体内容: <span id="TranslateResultSource"></span>

### 验证码功能示例

<img height="40px" width="120px" id="CaptchaImg" onclick="Get_CaptchaData('CaptchaImg')" />
<input type="text" value=""
    onblur="this.placeholder = this.value;this.value = '';Post_CaptchaData('CaptchaImg', this.placeholder);" />
<span id="Result"></span>

[打开项目页面](https://github.com/MemoryShadow/MemoryShadow.github.io "点击打开") | [打开支持官网](https://MemoryShadow.freetzi.com "点击打开")
