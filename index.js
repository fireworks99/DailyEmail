const axios = require("axios");
const nodemailer = require("nodemailer");

// 下载头像并转换为 Base64
async function getAvatarAsBase64() {
  const url = 'https://thispersondoesnotexist.com/';

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer', // 以二进制数据接收
    });

    // 将图片数据转换为 Base64 字符串
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error('下载头像时出错:', error.message);
    throw error;
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "938695723@qq.com",
    pass: "qtxhqhhicarvbaid",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  const base64Avatar = await getAvatarAsBase64();

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"thispersondoesnotexist" <938695723@qq.com>', // sender address
    to: "2639237361@qq.com", // list of receivers
    subject: "今日虚拟人物头像", // Subject line
    // text: "内容", // plain text body
    html: `
    <h1>今日头像</h1>
    <p>以下是一张不存在的虚拟人物头像：</p>
    <img src="${base64Avatar}" alt="头像" style="max-width: 300px; border: 1px solid #ddd;"/>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
