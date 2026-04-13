const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Generate Password API
app.post('/generate', (req, res) => {
    const { length, uppercase, lowercase, numbers, symbols } = req.body;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const sym = "!@#$%^&*()_+[]{}<>?";

    let chars = "";
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += nums;
    if (symbols) chars += sym;

    if (!chars) return res.status(400).json({ error: "Select at least one option" });

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    res.json({ password });
});

// Save Password API
app.post('/save', (req, res) => {
    const { password } = req.body;

    let data = [];
    if (fs.existsSync('passwords.json')) {
        data = JSON.parse(fs.readFileSync('passwords.json'));
    }

    data.push({ password, date: new Date() });
    fs.writeFileSync('passwords.json', JSON.stringify(data, null, 2));

    res.json({ message: "Password saved successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));