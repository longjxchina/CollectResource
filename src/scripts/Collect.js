chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var collect = new Collect(window.location.hostname);

    collect.send();
});

function Collect(host) {    
    this.selector;
    this.host = host;
    this.showOperateTimer = null;

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
                    Collect.prototype.showMessage("保存成功！", true);
                    $("#HS_BM_BTN,#HS_BM_VL_BTN").removeClass("hide");
                }, 1000);
            }
        }

        // 显示消息提示
        // msg:消息内容
        // autoHide:消息提示栏是否自动隐藏，true:自动隐藏
        Collect.prototype.showMessage = function (msg, autoHide) {
            if ($("#HS_BM_OVERLAY").length == 0) {
                var html = '<div>'
                html += '<div id="HS_BM_OVERLAY"class="HS_BM_OVERLAY_Hidden"><div id="HS_BM_RAINBOWDASH"><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div><div style="background-color: #F95B00;"></div></div><div id="HS_BM_OVERLAY_WRAPPER"class="HS_desktop"><a id="HS_BM_OVERLAY_LOGO"href="#"target="_blank"style="display: block;"></a><div id="HS_BM_OVERLAY_LABEL"></div><form id="HS_FORM"><a id="HS_BM_VL_BTN"class="HS_BM_BTN pkt_green hide"target="_blank"href="#">查看列表</a><a id="HS_BM_BTN"class="HS_BM_BTN gray hide"href="javascript:void(0)"data-operate-type="1">添加标签</a><div id="HS_BM_OVERLAY_INPUT_CONTAINER"><input type="text"id="HS_BM_OVERLAY_INPUT"placeholder="添加标签，多个标签用,分隔"/><div class="aWrapper"style="display: block;"><div class="aCon"style="min-width: 312px; margin-left: 0px; margin-top: 27px;"></div></div><input type="submit"value="Submit"name="submit"style="position:absolute !important;left:-789em !important;"/></div></form></div></div>';
                html += '</div>';

                $(document.body).append(html);
                this.bindOperate();
            }

            $("#HS_BM_OVERLAY_LABEL").html(msg);
            this.showMsgBar();

            if (autoHide) {
                Collect.prototype.hideMsgBar(true);
            }
        }

        Collect.prototype.showMsgBar = function () {
            if (this.showOperateTimer) {
                clearTimeout(this.showOperateTimer);
            }

            $("#HS_BM_OVERLAY").removeClass("CLOSE");
            $("#HS_BM_OVERLAY").removeClass("HS_BM_OVERLAY_Hidden");
        }

        Collect.prototype.hideMsgBar = function (delay) {
            if (!delay) {
                $("#HS_BM_OVERLAY").addClass("CLOSE");
                hide();
            } else {
                if ($("#HS_BM_OVERLAY").attr("data-mouse-on") == "1") {
                    return;
                }

                $("#HS_BM_OVERLAY").addClass("HS_BM_OVERLAY_Hidden");
                this.showOperateTimer = setTimeout(function () {
                    hide();
                }, parseFloat($(".HS_BM_OVERLAY_Hidden").css("transitionDelay")) * 1000);
            }

            function hide() {
                $("#HS_BM_OVERLAY").attr("data-mouse-on", "0");
                hideEditContent();
                resetOperate();
            }

            function hideEditContent() {
                $("#HS_BM_BTN,#HS_BM_VL_BTN").addClass("hide");
                $("#HS_BM_OVERLAY_INPUT_CONTAINER").removeClass("HS_SHOW_INPUT");
                $("#HS_BM_BTN").addClass("gray");
            }

            function resetOperate() {
                $("#HS_BM_BTN").attr("data-operate-type", "1");
                $("#HS_BM_BTN").html("添加标签");
            }
        }

        Collect.prototype.emptyMsg = function () {
            $("#HS_BM_OVERLAY_LABEL").html("");
        }

        Collect.prototype.bindOperate = function () {
            // 消息栏鼠标经过与离开事件
            $("#HS_BM_OVERLAY").mouseenter(function () {
                $(this).attr("data-mouse-on", "1")
                Collect.prototype.showMsgBar();
            }).mouseleave(function () {
                $(this).attr("data-mouse-on", "0")
                Collect.prototype.hideMsgBar(true);
            });

            // 点击按钮
            $("#HS_BM_BTN").click(function () {
                var operate = $(this).attr("data-operate-type");
                if (operate == "1") { // 如果当前是“添加标签”，点击将按钮变成“取消”
                    Collect.prototype.emptyMsg();
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
            $("#HS_BM_OVERLAY_INPUT").on("keyup blur paste", function () {
                if (this.value.length > 0) {
                    $("#HS_BM_BTN").removeClass("gray");
                    $("#HS_BM_BTN").text("保存");
                    $("#HS_BM_BTN").attr("data-operate-type", "3");
                }
                else {
                    $("#HS_BM_BTN").addClass("gray");
                    $("#HS_BM_BTN").text("取消");
                    $("#HS_BM_BTN").attr("data-operate-type", "2");
                }
            }).focus(function () {
                if ($(this).val().length == 0) {
                    $("#HS_BM_BTN").addClass("gray");
                    $("#HS_BM_BTN").text("取消");
                }
            });
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