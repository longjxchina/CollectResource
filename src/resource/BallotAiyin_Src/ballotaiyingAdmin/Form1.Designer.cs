namespace ballotaiyingAdmin
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.timer1 = new System.Windows.Forms.Timer(this.components);
            this.button1 = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.checkBoxHide = new System.Windows.Forms.CheckBox();
            this.checkBoxDial = new System.Windows.Forms.CheckBox();
            this.radioButtonAdsl = new System.Windows.Forms.RadioButton();
            this.radioButtonProxy = new System.Windows.Forms.RadioButton();
            this.SuspendLayout();
            // 
            // timer1
            // 
            this.timer1.Interval = 8000;
            this.timer1.Tick += new System.EventHandler(this.timer1_Tick);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(123, 57);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(75, 23);
            this.button1.TabIndex = 0;
            this.button1.Text = "start";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(17, 59);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(51, 21);
            this.textBox1.TabIndex = 1;
            this.textBox1.Text = "20";
            // 
            // checkBoxHide
            // 
            this.checkBoxHide.AutoSize = true;
            this.checkBoxHide.Checked = true;
            this.checkBoxHide.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxHide.Location = new System.Drawing.Point(27, 12);
            this.checkBoxHide.Name = "checkBoxHide";
            this.checkBoxHide.Size = new System.Drawing.Size(72, 16);
            this.checkBoxHide.TabIndex = 2;
            this.checkBoxHide.Text = "隐藏运行";
            this.checkBoxHide.UseVisualStyleBackColor = true;
            // 
            // checkBoxDial
            // 
            this.checkBoxDial.AutoSize = true;
            this.checkBoxDial.Checked = true;
            this.checkBoxDial.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxDial.Location = new System.Drawing.Point(27, 34);
            this.checkBoxDial.Name = "checkBoxDial";
            this.checkBoxDial.Size = new System.Drawing.Size(72, 16);
            this.checkBoxDial.TabIndex = 3;
            this.checkBoxDial.Text = "自动拨号";
            this.checkBoxDial.UseVisualStyleBackColor = true;
            // 
            // radioButtonAdsl
            // 
            this.radioButtonAdsl.AutoSize = true;
            this.radioButtonAdsl.Checked = true;
            this.radioButtonAdsl.Location = new System.Drawing.Point(123, 13);
            this.radioButtonAdsl.Name = "radioButtonAdsl";
            this.radioButtonAdsl.Size = new System.Drawing.Size(71, 16);
            this.radioButtonAdsl.TabIndex = 4;
            this.radioButtonAdsl.TabStop = true;
            this.radioButtonAdsl.Text = "Adsl换IP";
            this.radioButtonAdsl.UseVisualStyleBackColor = true;
            // 
            // radioButtonProxy
            // 
            this.radioButtonProxy.AutoSize = true;
            this.radioButtonProxy.Enabled = false;
            this.radioButtonProxy.Location = new System.Drawing.Point(123, 35);
            this.radioButtonProxy.Name = "radioButtonProxy";
            this.radioButtonProxy.Size = new System.Drawing.Size(65, 16);
            this.radioButtonProxy.TabIndex = 4;
            this.radioButtonProxy.Text = "换Proxy";
            this.radioButtonProxy.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(238, 92);
            this.Controls.Add(this.radioButtonProxy);
            this.Controls.Add(this.radioButtonAdsl);
            this.Controls.Add(this.checkBoxDial);
            this.Controls.Add(this.checkBoxHide);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.button1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Form1_FormClosed);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Timer timer1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.CheckBox checkBoxHide;
        private System.Windows.Forms.CheckBox checkBoxDial;
        private System.Windows.Forms.RadioButton radioButtonAdsl;
        private System.Windows.Forms.RadioButton radioButtonProxy;
    }
}

