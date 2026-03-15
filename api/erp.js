/**
 * Vercel Serverless Function — ERP Read-Only Proxy
 * Forwards GET requests to Frappe/ERPNext using server-side credentials.
 * IMPORTANT: Only GET requests are allowed. This function never writes,
 * transacts, or modifies any data in the ERP system.
 */
export default async function handler(req, res) {
  // Block everything except GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Read-only proxy.' })
  }

  const baseUrl = process.env.VITE_ERP_BASE_URL
  const apiKey  = process.env.VITE_ERP_API_KEY
  const apiSecret = process.env.VITE_ERP_API_SECRET

  if (!baseUrl || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'ERP credentials not configured on server.' })
  }

  const { resource, docname, ...rest } = req.query

  if (!resource) {
    return res.status(400).json({ error: 'Missing required param: resource' })
  }

  // Build Frappe URL — single doc or list
  const docPart = docname ? `/${encodeURIComponent(docname)}` : ''
  const params = new URLSearchParams(rest).toString()
  const frappePath = `/api/resource/${encodeURIComponent(resource)}${docPart}${params ? '?' + params : ''}`
  const url = `${baseUrl}${frappePath}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.status(response.status).json(data)

  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach ERP system.', detail: err.message })
  }
}
