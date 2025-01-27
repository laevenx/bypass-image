const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT =  3000;

app.use(cors());
app.use(express.json());

app.get('/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
      headers:{
        "Accept": "*/*",
        "User-Agent": "PostmanRuntime/7.43.0"
      }
    });

    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch image', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Image proxy server running on port ${PORT}`);
});

module.exports = app;
