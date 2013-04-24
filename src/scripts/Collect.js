﻿chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
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
                console.log($(this.selector.title).html());
                console.log($(this.selector.content).html());
                this.showMessage("保存成功！");
            }
        }

        Collect.prototype.showMessage = function(msg){
            if ($("#HSBM_STYLE").length == 0) {
                var html = '<div><style id="HS_BM_STYLE">#HS_BM_OVERLAY{visibility:hidden;position:fixed;top:0px !important;left:0px !important;width:100% !important;height:80px;-webkit-box-shadow:0px 0px 20px rgba(0,0,0,0.4);-moz-box-shadow:0px 0px 20px rgba(0,0,0,0.4);-o-box-shadow:0px 0px 20px rgba(0,0,0,0.4);box-shadow:0px 0px 20px rgba(0,0,0,0.4);z-index:2147483647;background: rgb(239,239,239);background: -moz-linear-gradient(top, rgba(239,239,239,0.98) 0%, rgba(253,253,253,0.98) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,239,0.98)), color-stop(100%,rgba(253,253,253,0.98)));background: -webkit-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background: -o-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background: -ms-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);background: linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#efefef", endColorstr="#fdfdfd",GradientType=0 );border-bottom:1px solid white;font-size:20px !important;font-family:HelveticaNeue,Helvetica,Arial !important;line-height:80px !important;text-align: left;color: #4b4b4b !important;-webkit-backface-visibility: hidden;-webkit-perspective: 1000;}		#HS_BM_RAINBOWDASH{width: 100%;height: 6%;}		#HS_BM_RAINBOWDASH div{float: left;width: 25%;height: 100%;}		#HS_BM_OVERLAY_LOGO{display: block;width: 200px;height: 75px;float: left;background: url(http://getpocket.com/i/v3/pocket_logo.png) left center no-repeat;}.HS_mobile #HS_BM_OVERLAY_LOGO{display: none;}.HS_desktop #HS_BM_OVERLAY_LABEL{position: absolute;top: 0px;left: 0px;text-align:center;width: 100%;height: 100%;z-index: -1;padding: 0px;line-height:80px !important;font-weight: bold;}		#HS_BM_OVERLAY_WRAPPER{padding-left:7%;padding-right: 7%;height: 100%;}		.HS_BM_BTN{float: right;margin-top: 22px;margin-left: 20px;width: 80px;height: 30px;line-height: 30px;visibility:hidden;border:1px solid #a4a4a4;text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.7);-webkit-box-shadow: 0px 1px 0px white;-moz-box-shadow: 0px 1px 0px white;-o-box-shadow: 0px 1px 0px white;box-shadow: 0px 1px 0px white;-webkit-border-radius: 6px;-moz-border-radius: 6px;-o-border-radius: 6px;border-radius: 6px;text-align:center !important;font-size:0.7em !important;color:black !important;font-weight:bold !important;background: rgb(250,213,64);background: -moz-linear-gradient(top, rgba(250,213,64,1) 0%, rgba(251,182,74,1) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(250,213,64,1)), color-stop(100%,rgba(251,182,74,1)));background: -webkit-linear-gradient(top, rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background: -o-linear-gradient(top, rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background: -ms-linear-gradient(top, rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);background: linear-gradient(top, rgba(250,213,64,1) 0%,rgba(251,182,74,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#fad540", endColorstr="#fbb64a",GradientType=0 );text-decoration: none !important;}.HS_BM_BTN:hover{background: rgb(251,182,74);background: -moz-linear-gradient(top, rgba(251,182,74,1) 0%, rgba(250,213,64,1) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(251,182,74,1)), color-stop(100%,rgba(250,213,64,1)));background: -webkit-linear-gradient(top, rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background: -o-linear-gradient(top, rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background: -ms-linear-gradient(top, rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);background: linear-gradient(top, rgba(251,182,74,1) 0%,rgba(250,213,64,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#fbb64a", endColorstr="#fad540",GradientType=0 );cursor: pointer;}.HS_BM_BTN.gray{background: #f9f9f9;background: -moz-linear-gradient(top, #f9f9f9 0%, #ebecec 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f9f9f9), color-stop(100%,#ebecec));background: -webkit-linear-gradient(top, #f9f9f9 0%,#ebecec 100%);background: -o-linear-gradient(top, #f9f9f9 0%,#ebecec 100%);background: -ms-linear-gradient(top, #f9f9f9 0%,#ebecec 100%);background: linear-gradient(top, #f9f9f9 0%,#ebecec 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#f9f9f9", endColorstr="#ebecec",GradientType=0 );}.HS_BM_BTN.gray:hover{background: #ebecec;background: -moz-linear-gradient(top, #ebecec 0%, #f9f9f9 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ebecec), color-stop(100%,#f9f9f9));background: -webkit-linear-gradient(top, #ebecec 0%,#f9f9f9 100%);background: -o-linear-gradient(top, #ebecec 0%,#f9f9f9 100%);background: -ms-linear-gradient(top, #ebecec 0%,#f9f9f9 100%);background: linear-gradient(top, #ebecec 0%,#f9f9f9 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#ebecec", endColorstr="#f9f9f9",GradientType=0 );}.HS_BM_BTN.pkt_green{background: #81dbd6;background: -moz-linear-gradient(top, #81dbd6 0%, #74c5c1 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#81dbd6), color-stop(100%,#74c5c1));background: -webkit-linear-gradient(top, #81dbd6 0%,#74c5c1 100%);background: -o-linear-gradient(top, #81dbd6 0%,#74c5c1 100%);background: -ms-linear-gradient(top, #81dbd6 0%,#74c5c1 100%);background: linear-gradient(top, #81dbd6 0%,#74c5c1 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#81dbd6", endColorstr="#74c5c1",GradientType=0 );}.HS_BM_BTN.pkt_green:hover{background: #74c5c1;background: -moz-linear-gradient(bottom, #81dbd6 0%, #74c5c1 100%);background: -webkit-gradient(linear, left bottom, left bottom, color-stop(0%,#81dbd6), color-stop(100%,#74c5c1));background: -webkit-linear-gradient(bottom, #81dbd6 0%,#74c5c1 100%);background: -o-linear-gradient(bottom, #81dbd6 0%,#74c5c1 100%);background: -ms-linear-gradient(bottom, #81dbd6 0%,#74c5c1 100%);background: linear-gradient(bottom, #81dbd6 0%,#74c5c1 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#74c5c1", endColorstr="#81dbd6",GradientType=0 );}.HS_BM_BTN div{display: block;}#HS_FORM{height: 100%;width: 100%; display: block !important;visibility: visible !important;margin: 0px !important;padding: 0px !important;font-size: 20px !important;}.HS_mobile #HS_FORM{position: absolute;top: 0px;right: 0.5em;width: 86%;}.HS_mobile #HS_BM_BTN{margin-top: 17px !important;}.HS_mobile #HS_BM_VL_BTN{display: none;}#HS_BM_OVERLAY_INPUT{display: none;}.HS_SHOW_INPUT #HS_BM_OVERLAY_INPUT{position: absolute !important;display: block !important;top: 19px !important;left: 0% !important;width: 57%;height: 25px !important;border: 1px solid #c9c9c9 !important;margin: 0px !important;padding: 0px 0px 0px 5px !important;font-size: 15px !important;color: #666666 !important;background: white !important;line-height: normal;/* overrides */font-family: Arial !important;-webkit-box-shadow: none !important;-moz-box-shadow: none !important;box-shadow: none !important;-webkit-border-radius: 0px !important;-moz-border-radius: 0px !important;border-radius: 0px !important;}.HS_desktop #HS_BM_OVERLAY_INPUT{position: static !important;width: 305px !important;}#HS_BM_OVERLAY_INPUT_CONTAINER {float: right;margin-top: 24px !important;position: static !important;width: 305px !important;margin-right: 10px;}.HS_SHOW_INPUT #HS_BM_OVERLAY_LABEL{visibility: hidden;}	/* Autcomplete.js css file */.aListCon {display : none;}.aWrapper {color: #666666 !important;float: right;position: static !important;width: 305px !important;display: block !important;top: 0px !important;left: 0px !important;zoom : 1;height : 0px;vertical-align : top;overflow : visible;}.aCon {position : relative !important;z-index : 999999 !important;top : 0px !important;display : block !important;margin-top: 0px !important;}.aList {display : block !important;margin : 0px !important;padding : 0px !important;border : 1px solid #7f9db9 !important;background-color : #fff !important;color : #1a2731 !important;list-style-type : none !important;cursor : default !important;;font-family:HelveticaNeue,Helvetica,Arial !important;font-size: 15px !important;}.aLim {display : block !important;padding : 3px 6px 2px 6px !important;line-height : 1.2em !important;white-space : nowrap !important;}</style><div id="HS_BM_OVERLAY"style="-webkit-transform: translate3d(0px, 0px, 0px); visibility: visible;-webkit-transition: -webkit-transform 0.3s ease-out;"><div id="HS_BM_RAINBOWDASH"><div style="background-color: #83EDB8;"></div><div style="background-color: #50BCB6;"></div><div style="background-color: #EE4256;"></div><div style="background-color: #FCB64B;"></div></div><div id="HS_BM_OVERLAY_WRAPPER"class="HS_desktop"><a id="HS_BM_OVERLAY_LOGO"href="#"target="_blank"style="display: block;"></a><div id="HS_BM_OVERLAY_LABEL"></div><form id="HS_FORM"><a id="HS_BM_VL_BTN"class="HS_BM_BTN pkt_green"target="_blank"href="#"style="display: block; visibility: visible;">查看列表</a><a id="HS_BM_BTN"class="HS_BM_BTN gray"target="_blank"style="visibility: visible;">添加标签</a><div id="HS_BM_OVERLAY_INPUT_CONTAINER"><input type="text"id="HS_BM_OVERLAY_INPUT"><input type="submit"value="Submit"name="submit"style="position: absolute !important; left: -789em !important;"></div></form></div></div></div>';
                
                $(document.body).append(html);
            }

            $("#HS_BM_OVERLAY_LABEL").html(msg);
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