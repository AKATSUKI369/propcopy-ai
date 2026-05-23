export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }

  const prompt = body?.prompt;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY environment variable is not set.' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an expert US real estate copywriter. Always respond with exactly 3 sections using these exact markers on their own lines:
<<<LISTING>>>
<<<EMAIL>>>
<<<SOCIAL>>>
Do not use any other markers or headers. Put each section's content after its marker.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.85,
        max_tokens: 1800
      })
    });

    const data = await groqRes.json();
    if (!groqRes.ok) throw new Error(data?.error?.message || 'Groq API error');

    const text = data?.choices?.[0]?.message?.content || '';

    const listingMatch = text.match(/<<<LISTING>>>([\s\S]*?)(?=<<<EMAIL>>>|$)/);
    const emailMatch   = text.match(/<<<EMAIL>>>([\s\S]*?)(?=<<<SOCIAL>>>|$)/);
    const socialMatch  = text.match(/<<<SOCIAL>>>([\s\S]*?)$/);

    return res.status(200).json({
      listing: listingMatch ? listingMatch[1].trim() : '',
      email:   emailMatch   ? emailMatch[1].trim()   : '',
      social:  socialMatch  ? socialMatch[1].trim()  : ''
    });

  } catch (e) {
    return res.status(500).json({ error: e.message || 'Something went wrong' });
  }
}
