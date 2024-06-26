const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get user data from user-specified backend URL
app.get('/userdata', async (req, res) => {
    let backendUrl = req.query.backendUrl;
    backendUrl = backendUrl.replace('https', 'http').replace(/\/$/, '');
    if (!backendUrl) {
        return res.status(400).json({ error: 'Backend URL is required' });
    }

    try {
        const response = await axios.get(`${backendUrl}/userdata`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});

app.post('/launch', async (req, res) => {
    let { backendUrl, private_server_link, packagename } = req.body;
    backendUrl = backendUrl.replace('https', 'http').replace(/\/$/, '');
    if (!backendUrl || !private_server_link || !packagename) {
        console.log('Missing parameters:', req.body);
        return res.status(400).json({ error: 'Backend URL and PS_Link and packagename are required' });
    }
    console.log(packagename)
    try {
        const response = await axios.post(`${backendUrl}/launchroblox`, { private_server_link, packagename});
        res.json(response.data);
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).send('Error removing user');
    }
});

app.post('/rejoin', async (req, res) => {
    let { backendUrl, username } = req.body;
    backendUrl = backendUrl.replace('https', 'http').replace(/\/$/, '');
    if (!backendUrl || !username) {
        return res.status(400).json({ error: 'Backend URL and username are required' });
    }

    try {
        const response = await axios.post(`${backendUrl}/rejoinroblox`, { username });
        res.json(response.data);
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).send('Error removing user');
    }
});

app.post('/close', async (req, res) => {
    let { backendUrl, username } = req.body;
    backendUrl = backendUrl.replace('https', 'http').replace(/\/$/, '');
    if (!backendUrl || !username) {
        return res.status(400).json({ error: 'Backend URL and username are required' });
    }

    try {
        const response = await axios.post(`${backendUrl}/close`, { username });
        res.json(response.data);
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).send('Error removing user');
    }
});

app.post('/removeuser', async (req, res) => {
    let { backendUrl, username } = req.body;
    backendUrl = backendUrl.replace('https', 'http').replace(/\/$/, '');
    if (!backendUrl || !username) {
        return res.status(400).json({ error: 'Backend URL and username are required' });
    }

    try {
        const response = await axios.post(`${backendUrl}/removeuser`, { username });
        res.json(response.data);
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).send('Error removing user');
    }
});

app.listen(port, () => {
    console.log(`Node.js app listening at http://localhost:${port}`);
});
