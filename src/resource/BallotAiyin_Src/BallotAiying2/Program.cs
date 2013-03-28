using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace BallotAiying2
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main(String[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            if (args.Length != 1)
                Application.Run(new Form1(""));
            else
                Application.Run(new Form1(args[0]));
        }
    }
}