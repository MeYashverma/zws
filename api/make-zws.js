
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { original_url } = req.body;

  if (!original_url) {
    return res.status(400).json({ error: 'Missing original_url' });
  }

  try {
    const response = await fetch('https://api.zws.im/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: original_url }),
    });

    const data = await response.json();

    if (!data.url) {
      return res.status(500).json({ error: 'Shortening failed', detail: data });
    }

    return res.status(200).json({ short_url: data.url });
  } catch (err) {
    console.error('Shorten failed:', err);
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
};