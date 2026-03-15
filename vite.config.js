import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Local dev: /api/erp → Frappe ERP (with auth headers injected server-side)
        '/api/erp': {
          target: env.VITE_ERP_BASE_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              // Extract ?resource=X and move it into the URL path
              // e.g. /api/erp?resource=Purchase Order&filters=...
              //   → /api/resource/Purchase%20Order?filters=...
              const url = new URL(req.url, 'http://localhost')
              const resource = url.searchParams.get('resource')
              const docname = url.searchParams.get('docname')
              url.searchParams.delete('resource')
              url.searchParams.delete('docname')
              const qs = url.searchParams.toString()
              // Single doc: /api/resource/Purchase Order/PO-00000360
              // List:       /api/resource/Purchase Order?filters=...
              const docPart = docname ? `/${encodeURIComponent(docname)}` : ''
              const newPath = `/api/resource/${encodeURIComponent(resource)}${docPart}${qs ? '?' + qs : ''}`
              proxyReq.path = newPath
              proxyReq.setHeader(
                'Authorization',
                `token ${env.VITE_ERP_API_KEY}:${env.VITE_ERP_API_SECRET}`
              )
            })
          },
        },
      },
    },
  }
})
