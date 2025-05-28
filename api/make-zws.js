// api/make-zws.js
const axios = require('axios');
 
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }
 
  const { original_url } = req.body;
  if (!original_url) {
    return res.status(400).json({ error: 'original_url is required' });
  }
 
  try {
const response = await axios.post(
'https://api.zws.im/shorten',
      { url: original_url },
      { headers: { 'Content-Type': 'application/json' } }
    );
 
    return res.status(200).json({ short_url: response.data.url });
  } catch (error) {
    console.error('Error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to shorten URL' });
  }
}