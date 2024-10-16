const express = require('express');
const app = express();

app.use(express.json());

let users = {
    'user123': {
        balance: 1500,
        incomePerHour: 400,
        flowers: [
            { name: 'Rose', count: 2, income: 200 },
            { name: 'Tulip', count: 1, income: 300 }
        ],
        lastCollected: Date.now()
    }
};

app.get('/api/getUserData', (req, res) => {
    const userId = 'user123';  // Идентификатор пользователя
    const userData = users[userId];
    
    const currentTime = Date.now();
    const hoursPassed = (currentTime - userData.lastCollected) / (1000 * 60 * 60);
    userData.balance += hoursPassed * userData.incomePerHour;
    userData.lastCollected = currentTime;

    res.json(userData);
});

app.post('/api/collect', (req, res) => {
    const userId = 'user123';
    const userData = users[userId];

    const currentTime = Date.now();
    const hoursPassed = (currentTime - userData.lastCollected) / (1000 * 60 * 60);
    const collected = Math.floor(hoursPassed * userData.incomePerHour);

    userData.balance += collected;
    userData.lastCollected = currentTime;

    res.json({ collected });
});

module.exports = app;
