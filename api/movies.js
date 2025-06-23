export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    const { url, region } = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid TMDb URL path' });
    }

    const apiKey = process.env.TMDB_API_KEY;

    try {
        const response = await fetch(`${url}?region=${region || "in"}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`
            }
        });
        if (!response.ok) {
            throw new Error(`TMDb API error: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching from TMDb:', error);
        return res.status(500).json({ error: 'Failed to fetch data from TMDb' });
    }
}
