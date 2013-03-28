using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Data.OleDb;
using mshtml;
using Microsoft.Win32;
using System.IO;

namespace BallotAiying2
{
    public partial class Form1 : Form
    {
        string poststr = "";

        public Form1(string str)
        {
            InitializeComponent();
            poststr = str;
        }

        private void createWebCtrl()
        {
            if (webBrowser1 != null)
            {
                webBrowser1.Dispose();
                webBrowser1 = null;
                GC.Collect();
            }
            webBrowser1 = new EWebBrowser();
            webBrowser1.Parent = this.panel1;
            webBrowser1.Visible = true;
            webBrowser1.Dock = DockStyle.Fill;

            this.webBrowser1.NewWindow += new System.ComponentModel.CancelEventHandler(this.webBrowser1_NewWindow);
            this.webBrowser1.DocumentCompleted += new System.Windows.Forms.WebBrowserDocumentCompletedEventHandler(this.webBrowser1_DocumentCompleted);

        }
        private void webBrowser1_NewWindow(object sender, CancelEventArgs e)
        {
            e.Cancel = true;    //取消弹出窗口
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            AiYingSingleVote();
        }

        private void AiYingSingleVote()
        {
            webBrowser1.Navigate("http://star.iyaya.com/sendvote.php?u=better2004");
        }

        /// <summary>
        /// 返回指定WebBrowser中图片<IMG></IMG>中的图内容
        /// </summary>
        /// <param name="WebCtl">WebBrowser控件</param>
        /// <param name="ImgeTag">IMG元素</param>
        /// <returns>IMG对象</returns>
        private Image GetWebImage(WebBrowser WebCtl, HtmlElement ImgeTag)
        {
            HTMLDocument doc = (HTMLDocument)WebCtl.Document.DomDocument;
            HTMLBody body = (HTMLBody)doc.body;
            IHTMLControlRange rang = (IHTMLControlRange)body.createControlRange();
            IHTMLControlElement Img = (IHTMLControlElement)ImgeTag.DomElement; //图片地址

            Image oldImage = Clipboard.GetImage();
            rang.add(Img);
            rang.execCommand("Copy", false, null);  //拷贝到内存
            Image numImage = Clipboard.GetImage();
            try
            {
                Clipboard.SetImage(oldImage);
            }
            catch
            {
            }

            return numImage;
        }
        private void webBrowser1_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            HtmlElement ClickBtn = null;


            if (webBrowser1.Document.Url.AbsoluteUri.IndexOf("res://") > -1)      //出错处理
            {
                webBrowser1.Navigate("http://star.iyaya.com/sendvote.php?u=better2004");
                return;
            }

            if (e.Url.ToString().ToLower().IndexOf("sendvote.php") > 0)   //如果是登陆界面,自动登录处理
            {
                if (webBrowser1.DocumentText.IndexOf("对不起，您已经投过五票") > -1)
                {
                    return;
                }
                HtmlDocument doc = webBrowser1.Document;
              //  IHTMLDocument2 doc2 = (IHTMLDocument2)webBrowser1.Document.DomDocument;
                //      HtmlElement ImgeTag =(HtmlElement) doc2.images.item(0, 0);

                HtmlElement ImgeTag = doc.Forms[0].GetElementsByTagName("IMG")[0];

                Image numPic = GetWebImage(webBrowser1, ImgeTag); // 得到验证码图片

                unCodeAiYing UnCheckobj = new unCodeAiYing((Bitmap)numPic);
                string strNum = UnCheckobj.getPicnum();     //识别图片

                for (int i = 0; i < doc.All.Count; i++)
                {
                    if (doc.All[i].TagName.ToUpper().Equals("INPUT"))
                    {
                        switch (doc.All[i].Name)
                        {
                            case "vCode":
                                doc.All[i].InnerText = strNum;    
                                break;
                            case "Submit":
                                ClickBtn = doc.All[i]; //登录元素
                                break;
                        }
                    }
                    if (doc.All[i].TagName.ToLower().Equals("textarea") && poststr != "")
                    {
                        switch (doc.All[i].Name)
                        {
                            case "wish":
                                doc.All[i].InnerText = poststr;
                                break;
                        }
                    }
                }
                ClickBtn.InvokeMember("Click");   //执行按扭操作
            }

            }

        class EWebBrowser : System.Windows.Forms.WebBrowser
        {
            SHDocVw.IWebBrowser2 Iwb2;

            protected override void AttachInterfaces(object nativeActiveXObject)
            {
                Iwb2 = (SHDocVw.IWebBrowser2)nativeActiveXObject;
                Iwb2.Silent = true;
                base.AttachInterfaces(nativeActiveXObject);
            }

            protected override void DetachInterfaces()
            {
                Iwb2 = null;
                base.DetachInterfaces();
            }
        }


    }
}