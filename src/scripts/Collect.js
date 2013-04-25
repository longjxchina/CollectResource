chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var collect = new Collect(window.location.hostname);

    collect.send();
});

function Collect(host) {    
    this.selector;
    this.host = host;

    this.selector = new SelectorFactory(host).createSelector();

    if (typeof Collect.prototype.send !== "function") {
        Collect.prototype.send = function () {
            if (!this.selector.title) {
                return;
            }

            if ($(this.selector.title).length > 0 && $(this.selector.content).length > 0) {
                this.showMessage("正在保存...");
                // ajax post
                console.log($(this.selector.title).html());
                console.log($(this.selector.content).html());
                setTimeout(function () {
                    Collect.prototype.showMessage("保存成功！", false);
                }, 4000);
            }
        }

        Collect.prototype.showMessage = function (msg, autoHide) {
            if ($("#HSBM_STYLE").length == 0) {
                var html = '<div>'
                html += '<style type="text/css" id="HS_BM_STYLE">*{font-family:微软雅黑;}#HS_BM_OVERLAY{visibility:hidden;position:fixed;top:0px !important;left:0px !important;width:100% !important;height:80px;-webkit-box-shadow:0px 0px 20px rgba(0,0,0,0.4);-moz-box-shadow:0px 0px 20px rgba(0,0,0,0.4);-o-box-shadow:0px 0px 20px rgba(0,0,0,0.4);box-shadow:0px 0px 20px rgba(0,0,0,0.4);z-index:2147483647;background:rgb(239,239,239);background:-moz-linear-gradient(top,rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(239,239,239,0.98)),color-stop(100%,rgba(253,253,253,0.98)));background:-webkit-linear-gradient(top,rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background:-o-linear-gradient(top,rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background:-ms-linear-gradient(top,rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background:linear-gradient(top,rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#efefef",endColorstr="#fdfdfd",GradientType=0 );font-size:20px !important;font-family:HelveticaNeue,Helvetica,Arial !important;line-height:80px !important;text-align:left;color:#4b4b4b !important;-webkit-backface-visibility:hidden;-webkit-perspective:1000;-webkit-transition:height 0.5s linear 0s;visibility:visible;overflow:hidden;}#HS_BM_OVERLAY.HS_BM_OVERLAY_Hidden{-webkit-transition:height 0.5s linear 0s;height:0!important;overflow:hidden;}#HS_BM_OVERLAY.CLOSE{-webkit-transition:height 0.5s linear 2s;height:0!important;overflow:hidden;}#HS_BM_RAINBOWDASH{width:100%;height:6%;}#HS_BM_RAINBOWDASH div{float:left;width:25%;height:100%;}#HS_BM_OVERLAY_LOGO{display:block;width:200px;height:75px;float:left;background:url(http://getpocket.com/i/v3/pocket_logo.png) left center no-repeat;}.HS_mobile #HS_BM_OVERLAY_LOGO{display:none;}.HS_desktop #HS_BM_OVERLAY_LABEL{position:absolute;top:0px;left:0px;text-align:center;width:100%;height:100%;z-index:-1;padding:0px;line-height:80px !important;font-weight:bold;}#HS_BM_OVERLAY_WRAPPER{padding-left:7%;padding-right:7%;height:100%;}.HS_BM_BTN{float:right;margin-top:22px;margin-left:20px;width:80px;height:30px;line-height:30px;visibility:hidden;border:1px solid #a4a4a4;-webkit-box-shadow:0px 1px 0px white;-moz-box-shadow:0px 1px 0px white;-o-box-shadow:0px 1px 0px white;box-shadow:0px 1px 0px white;-webkit-border-radius:6px;-moz-border-radius:6px;-o-border-radius:6px;border-radius:6px;text-align:center !important;font-size:0.7em !important;color:black;font-weight:bold !important;background:rgb(250,213,64);background:-moz-linear-gradient(top,rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(250,213,64,1)),color-stop(100%,rgba(251,182,74,1)));background:-webkit-linear-gradient(top,rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background:-o-linear-gradient(top,rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background:-ms-linear-gradient(top,rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background:linear-gradient(top,rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#fad540",endColorstr="#fbb64a",GradientType=0 );text-decoration:none !important;}.HS_BM_BTN:hover{background:rgb(251,182,74);background:-moz-linear-gradient(top,rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(251,182,74,1)),color-stop(100%,rgba(250,213,64,1)));background:-webkit-linear-gradient(top,rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background:-o-linear-gradient(top,rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background:-ms-linear-gradient(top,rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background:linear-gradient(top,rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#fbb64a",endColorstr="#fad540",GradientType=0 );cursor:pointer;}.HS_BM_BTN.gray{background:#f9f9f9;background:-moz-linear-gradient(top,#f9f9f9 0%,#ebecec 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#f9f9f9),color-stop(100%,#ebecec));background:-webkit-linear-gradient(top,#f9f9f9 0%,#ebecec 100%);background:-o-linear-gradient(top,#f9f9f9 0%,#ebecec 100%);background:-ms-linear-gradient(top,#f9f9f9 0%,#ebecec 100%);background:linear-gradient(top,#f9f9f9 0%,#ebecec 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#f9f9f9",endColorstr="#ebecec",GradientType=0 );}.HS_BM_BTN.gray:hover{background:#ebecec;background:-moz-linear-gradient(top,#ebecec 0%,#f9f9f9 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#ebecec),color-stop(100%,#f9f9f9));background:-webkit-linear-gradient(top,#ebecec 0%,#f9f9f9 100%);background:-o-linear-gradient(top,#ebecec 0%,#f9f9f9 100%);background:-ms-linear-gradient(top,#ebecec 0%,#f9f9f9 100%);background:linear-gradient(top,#ebecec 0%,#f9f9f9 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#ebecec",endColorstr="#f9f9f9",GradientType=0 );}.HS_BM_BTN.pkt_green{background:#81dbd6;background:-moz-linear-gradient(top,#81dbd6 0%,#74c5c1 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#81dbd6),color-stop(100%,#74c5c1));background:-webkit-linear-gradient(top,#81dbd6 0%,#74c5c1 100%);background:-o-linear-gradient(top,#81dbd6 0%,#74c5c1 100%);background:-ms-linear-gradient(top,#81dbd6 0%,#74c5c1 100%);background:linear-gradient(top,#81dbd6 0%,#74c5c1 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#81dbd6",endColorstr="#74c5c1",GradientType=0 );background-image:-webkit-linear-gradient(#79d858,#569e3d);color:White;}.HS_BM_BTN.pkt_green:hover{background:#74c5c1;background:-moz-linear-gradient(bottom,#81dbd6 0%,#74c5c1 100%);background:-webkit-gradient(linear,left bottom,left bottom,color-stop(0%,#81dbd6),color-stop(100%,#74c5c1));background:-webkit-linear-gradient(bottom,#81dbd6 0%,#74c5c1 100%);background:-o-linear-gradient(bottom,#81dbd6 0%,#74c5c1 100%);background:-ms-linear-gradient(bottom,#81dbd6 0%,#74c5c1 100%);background:linear-gradient(bottom,#81dbd6 0%,#74c5c1 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr="#74c5c1",endColorstr="#81dbd6",GradientType=0 );background-image:-webkit-linear-gradient(#569e3d,#79d858);}.HS_BM_BTN div{display:block;}#HS_FORM{height:100%;width:100%;display:block !important;visibility:visible !important;margin:0px !important;padding:0px !important;font-size:20px !important;}.HS_mobile #HS_FORM{position:absolute;top:0px;right:0.5em;width:86%;}.HS_mobile #HS_BM_BTN{margin-top:17px !important;}.HS_mobile #HS_BM_VL_BTN{display:none;}#HS_BM_OVERLAY_INPUT{display:none;}.HS_SHOW_INPUT #HS_BM_OVERLAY_INPUT{position:absolute !important;display:block !important;top:19px !important;left:0% !important;width:57%;height:25px !important;border:1px solid #c9c9c9 !important;margin:0px !important;padding:0px 0px 0px 5px !important;font-size:15px !important;color:#666666 !important;background:white !important;line-height:normal;font-family:Arial !important;-webkit-box-shadow:none !important;-moz-box-shadow:none !important;box-shadow:none !important;-webkit-border-radius:0px !important;-moz-border-radius:0px !important;border-radius:0px !important;}.HS_desktop #HS_BM_OVERLAY_INPUT{position:static !important;width:305px !important;}#HS_BM_OVERLAY_INPUT_CONTAINER{float:right;margin-top:24px !important;position:static !important;width:305px !important;margin-right:10px;}.HS_SHOW_INPUT #HS_BM_OVERLAY_LABEL{visibility:hidden;}.aListCon{display:none;}.aWrapper{color:#666666 !important;float:right;position:static !important;width:305px !important;display:block !important;top:0px !important;left:0px !important;zoom:1;height:0px;vertical-align:top;overflow:visible;}.aCon{position:relative !important;z-index:999999 !important;top:0px !important;display:block !important;margin-top:0px !important;}.aList{display:block !important;margin:0px !important;padding:0px !important;border:1px solid #7f9db9 !important;background-color:#fff !important;color:#1a2731 !important;list-style-type:none !important;cursor:default !important;font-family:HelveticaNeue,Helvetica,Arial !important;font-size:15px !important;}.aLim{display:block !important;padding:3px 6px 2px 6px !important;line-height:1.2em !important;white-space:nowrap !important;}</style>';
                html += '<div id="HS_BM_OVERLAY"class="HS_BM_OVERLAY_Hidden"><div id="HS_BM_RAINBOWDASH"><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div></div><div id="HS_BM_OVERLAY_WRAPPER"class="HS_desktop"><a id="HS_BM_OVERLAY_LOGO"href="#"target="_blank"style="display: block;"></a><div id="HS_BM_OVERLAY_LABEL"></div><form id="HS_FORM"><a id="HS_BM_VL_BTN"class="HS_BM_BTN pkt_green"target="_blank"href="#"style="display: block; visibility: visible;">查看列表</a><a id="HS_BM_BTN"class="HS_BM_BTN gray"href="javascript:void(0)"style="visibility: visible;"data-operate-type="1">添加标签</a><div id="HS_BM_OVERLAY_INPUT_CONTAINER"><input type="text"id="HS_BM_OVERLAY_INPUT"placeholder="添加标签，多个标签用,分隔"/><div class="aWrapper"style="display: block;"><div class="aCon"style="min-width: 312px; margin-left: 0px; margin-top: 27px;"></div></div><input type="submit"value="Submit"name="submit"style="position:absolute !important;left:-789em !important;"/></div></form></div></div>';
                html += '</div>';

                $(document.body).append(html);
                this.bindOperate();
            }

            $("#HS_BM_OVERLAY_LABEL").html(msg);
            this.showMsgBar();

            if (autoHide) {
                setTimeout(function () {
                    Collect.prototype.hideMsgBar();
                }, 1000);
            }
        }

        Collect.prototype.bindOperate = function () {
            // 消息栏鼠标经过与离开事件
            $("#HS_BM_OVERLAY").mouseover(function () {
                console.log("over");
                $(this).removeClass("HS_BM_OVERLAY_Hidden");
            }).mouseout(function () {
                var self = this;
                $(self).addClass("HS_BM_OVERLAY_Hidden");
            });

            // 点击按钮
            $("#HS_BM_BTN").click(function () {
                var operate = $(this).attr("data-operate-type");
                if (operate == "1") { // 如果当前是“添加标签”，点击将按钮变成“取消”
                    $("#HS_BM_OVERLAY_INPUT_CONTAINER").addClass("HS_SHOW_INPUT");
                    $(this).html("取消");
                    $(this).attr("data-operate-type", "2");
                } else if (operate == "2") { // 如果当前是“取消”，点击关闭顶栏，将操作按成“添加标签”                    
                    Collect.prototype.hideMsgBar(false);
                    $("#HS_BM_OVERLAY_INPUT_CONTAINER").removeClass("HS_SHOW_INPUT");
                    $(this).attr("data-operate-type", "1");
                    $(this).html("添加标签");
                } else if (operate == "3") { // 如果当前操作是“保存”，点击提交
                    console.log("保存");
                }
            });

            // 输入文本后，按钮变成“保存”，失去焦点但没有输入文本，按钮变成“取消”
            $("#HS_BM_OVERLAY_INPUT").on("keyup", function () {
                if (this.value.length > 0) {
                    $("#HS_BM_BTN").removeClass("gray");
                    $("#HS_BM_BTN").text("保存");
                    $("#HS_BM_BTN").attr("data-operate-type", "3");
                }
            }).on("focus, blur", function () {
                if ($(this).val().length == 0) {
                    $("#HS_BM_BTN").addClass("gray");
                    $("#HS_BM_BTN").text("取消");
                    $("#HS_BM_BTN").attr("data-operate-type", 1);
                }
            });
        }

        Collect.prototype.showMsgBar = function () {
            $("#HS_BM_OVERLAY").removeClass("CLOSE");
            $("#HS_BM_OVERLAY").removeClass("HS_BM_OVERLAY_Hidden");
        }

        Collect.prototype.hideMsgBar = function (delay) {
            if (!delay) {
                $("#HS_BM_OVERLAY").addClass("CLOSE");
                return;
            }

            $("#HS_BM_OVERLAY").addClass("HS_BM_OVERLAY_Hidden");
        }
    }
}

function SelectorFactory(url) {
    var sina = "blog.sina.com.cn";
    this.url = url;

    if (typeof SelectorFactory.prototype.init !== "function") {
        SelectorFactory.prototype.createSelector = function () {
            var selectModel = new Selector();

            switch (this.url) {
                case sina:
                    selectModel.title = "#articlebody>.articalTitle>h2:first-child";
                    selectModel.content = "#articlebody>.articalContent";
                    break;
            }

            return selectModel;
        }
    }
}

function Selector(type, title, content) {
    this.type = type;
    this.title = title;
    this.content = content;
}