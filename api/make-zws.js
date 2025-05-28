const axios = require('axios');
 
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
 
  const { original_url } = req.body;
 
  if (!original_url) {
    return res.status(400).json({ error: 'Missing original_url' });
  }
 
  try {
const response = await axios.post('https://api.zws.im/shorten', {
      url: original_url
    });
 
    return res.status(200).json({ short_url: response.data.url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }
}