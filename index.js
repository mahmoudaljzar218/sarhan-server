const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = "6260615"; 

// الصفحة الرئيسية للتأكد أن السيرفر شغال
app.get('/', (req, res) => {
    res.send("سيرفر السرحان نت يعمل بنجاح على Vercel 🚀");
});

// رابط الإرسال
app.get('/send', async (req, res) => {
    const { phone, msg } = req.query;

    if (!phone || !msg) {
        return res.status(400).send("بيانات ناقصة: يرجى إرسال phone و msg");
    }

    // تأمين تحويل النص العربي لروابط (Encoding)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${API_KEY}`;
    
    try {
        await axios.get(url);
        res.status(200).send("تم الإرسال بنجاح ✅");
    } catch (error) {
        console.error(error);
        res.status(500).send("فشل في الاتصال بمزود الخدمة");
    }
});

// ضروري جداً لعمل السيرفر على Vercel
module.exports = app;
