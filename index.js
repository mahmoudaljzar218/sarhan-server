const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = "6260615"; 

app.get('/', (req, res) => {
    res.send("سيرفر السرحان نت شغال يا وحش 🚀");
});

app.get('/send', async (req, res) => {
    const { phone, msg } = req.query;
    if (!phone || !msg) return res.send("بيانات ناقصة!");

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(msg)}&apikey=${API_KEY}`;
    
    try {
        await axios.get(url);
        res.send("تم الإرسال بنجاح ✅");
    } catch (error) {
        res.status(500).send("فيه مشكلة في الإرسال");
    }
});

module.exports = app;
