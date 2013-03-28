using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.Data.OleDb;
using Microsoft.Win32;


namespace ballotaiyingAdmin
{
    public partial class Form1 : Form
    {
        string[] PostArray = new string[] {"梓尧来回投了 http://star.iyaya.com/star_view.php?u=szyao#v",
             "小姨来投票了！",
             "姥姥来了，天天投票！",
             "大舅全家来投票",
            "http://star.iyaya.com/star_view.php?u=dyll520#v 帮忙支持一下乐乐,每天可以连投5票",
            "我再投一票",
             "给宝宝鼓励一下",
            "我来了,一起加油吧,我是天天，有访必回！",
            "史冀豪的妈妈也来给你的宝贝加油了！给你投了五票，大家相互支持吧！http://star.iyaya.com/star_view.php?u=nbboboland#v",
              "大舅来投票，宝宝加油！",
            "相互支持，每天互投，共同前进 曹紫璇 http://star.iyaya.com/star_view.php?u=kinky#v",
             "姑姑投票支持",
             "感谢支持，一定回访http://star.iyaya.com/star_view.php?u=bobosky#v",
             "小宝宝加油二伯给你投票！",
            "相互支持，每天互投，共同前进",
            "小姨给你投五票，给你助威",
            " http://star.iyaya.com/star_view.php?u=liuchenyu2007#v加油哦,相互支持 ",
             "感谢支持，我也给你投了一票",
              "舅爷来投五票！",
             "小馨来了，继续互相支持哦 http://star.iyaya.com/star_view.php?u=aifulinmm#v ",
            "一凡又来送票支持了!一凡参加了米奇妙妙屋活动,也去支持我哦,也是连投五票.",
            "璞璞来投票了！互相支持哦～http://star.iyaya.com/star_view.php?u=guoyingpu#v",
             "小姑支持宝宝",
            "逸梵来看你啦,大家每天坚持,有投必回http://star.iyaya.com/star_view.php?u=gbblulu#v",
            "徐维绩回访　http://star.iyaya.com/star_view.php?u=vivian0908#v　相互支持",
            "薛昊来回投了：） http://star.iyaya.com/star_view.php?u=chriscai#v",
            "仇梓宇来加油啦！也给我投哦！http://star.iyaya.com/star_view.php?u=jane-chen#v",
            "http://star.iyaya.com/star_view.php?u=yuyuhu#v互助互爱 ",
            "http://star.iyaya.com/star_view.php?u=liuzhewu#v柳哲武来送上5票，你也投我们5票吧，我们天天互相支持吧，有投必回!",
            "甜宝来支持投票了,有投必回.http://star.iyaya.com/star_view.php?u=dedexu#v ", 
            "小馨来了，继续互相支持哦 http://star.iyaya.com/star_view.php?u=aifulinmm#v 小馨来了，继续互相支持哦 http://star.iyaya.com/star_view.php?u=aifulinmm#v",
            "9月9日0~3岁组皓皓来给你加油了,希望我们每天互相支持,请记得回访,一次可以连投5票哦,谢谢~~~http://star.iyaya.com/star_view.php?u=jinsuwei#v",
            "互相支持一下，回贴必访。http://www.iyaya.com/disney/story_view.php?t=3&u=yingying030325 ",
            "贝贝来了,每天五票相互支持http://www.iyaya.com/disney/story_view.php?t=4&u=wdy2cyy投票,有投必回",
            "大伯投票啦，愿健健康康的成长！"};

        string[,] ProxyArray;
        private int Count = 0;
        public Form1()
        {
            InitializeComponent();
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            AiYingSingleVote();
            Text = Count++.ToString();
        }

        private void ReStartAdsl(bool reStartAdsl)
        {
            System.Diagnostics.ProcessStartInfo Info = new System.Diagnostics.ProcessStartInfo();

            if(reStartAdsl)
                Info.FileName = Application.StartupPath+@"\Restart.bat";
            else
                Info.FileName = Application.StartupPath + @"\ClearCookie.bat";
            Info.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;

            System.Diagnostics.Process.Start(Info);   //启动
            Update();
        }


        private void callVote()
        {
            string poststr = "";
            int tmpInex=new Random().Next(100);
            if ( tmpInex< PostArray.Length)
                poststr = PostArray[tmpInex];
            else
                poststr = "";
              int spantime = 0;
            for (int i = 0; i < 5; i++)
            {
                System.Diagnostics.ProcessStartInfo Info = new System.Diagnostics.ProcessStartInfo();

                Info.FileName = Application.StartupPath + @"\BallotAiying2.exe";
                Info.Arguments = poststr;

                if(checkBoxHide.Checked)
                    Info.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;

                System.Diagnostics.Process.Start(Info);   //启动
                if (i < 4)
                {
                    spantime = 5 - i;
                    System.Threading.Thread.Sleep(spantime * 1000);
                }
            }
        }

        public static void KillOldInstance()
        {
            Process[] processes1 = Process.GetProcessesByName("BallotAiying2");
            foreach (Process process in processes1)
            {
                process.Kill();
            }

            Process current = Process.GetCurrentProcess();
            Process[] processes2 = Process.GetProcessesByName(current.ProcessName);
            foreach (Process process in processes2)
            {
                //忽略现有的例程 
                if (process.Id != current.Id)
                    process.Kill();
            }
        } 
        private void button1_Click(object sender, EventArgs e)
        {
            timer1.Interval=Convert.ToInt16(textBox1.Text)*1000;
            timer1.Enabled = true;
            Count = 0;
            //if (radioButtonProxy.Checked)
            //    getPorxy();

            AiYingSingleVote();
        }

        private void AiYingSingleVote()
        {
            if (radioButtonAdsl.Checked)
                ReStartAdsl(checkBoxDial.Checked);
            //else
            //    changeProxy();
            KillOldInstance();      // kill old 
            callVote();        // call 5
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            KillOldInstance();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        //private void getPorxy()
        //{
        //    OleDbConnection dbconnect = new OleDbConnection(@"Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + Application.StartupPath + @"\proxy.mdb;User ID=Admin;Password=;");
        //    dbconnect.Open();

        //    //  string SqlText = "SELECT  Count(*) FROM ToDayProxy ";
        //    OleDbCommand dbCommand = new OleDbCommand("SELECT  Count(IP) FROM ToDayProxy  where ErrorNum < 1", dbconnect);
        //    int RecCount = Convert.ToInt32(dbCommand.ExecuteScalar());

        //    dbCommand.CommandText = "SELECT  IP,Port FROM ToDayProxy where ErrorNum < 1 ORDER BY  LEFT(VerifyDate,5) DESC,RespondTime ";
        //    OleDbDataReader Dr = dbCommand.ExecuteReader();

        //    if (ProxyArray != null)
        //        ProxyArray = null;
        //    ProxyArray = new string[2, RecCount];
        //    for (int i = 0; i < RecCount; i++)
        //    {
        //        Dr.Read();
        //        ProxyArray[0, i] = Dr["IP"].ToString();
        //        ProxyArray[1, i] = Dr["Port"].ToString();
        //    }
        //    Dr.Close();
        //    dbCommand.Dispose();
        //    dbconnect.Close();
        //    dbCommand = null;
        //    dbconnect = null;
        //}
        //private void changeProxy()
        //{
        //    //SetProxy
        //    this.Text = Count.ToString() + "/" + (ProxyArray.Length / 2).ToString() + "  " + ProxyArray[0, Count] + ":" + ProxyArray[1, Count];
        //    SetProxy(ProxyArray[0, Count], ProxyArray[1, Count]);
        //}
        //public static void SetProxy(string proxyIP, string proxyPort)
        //{
        //    //打开注册表
        //    RegistryKey regKey = Registry.CurrentUser;
        //    string SubKeyPath = @"Software\Microsoft\Windows\CurrentVersion\Internet Settings";
        //    RegistryKey optionKey = regKey.OpenSubKey(SubKeyPath, true);
        //    //更改健值，设置代理，
        //    optionKey.SetValue("ProxyServer", proxyIP + ":" + proxyPort);
        //    optionKey.SetValue("ProxyEnable", 1);
        //}
    }
}