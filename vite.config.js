// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleBackendSTT, handleBackendTTS, getGnaniApiKey } from './server/gnaniBackend.js';

function gnaniBackendPlugin() {
  return {
    name: 'gnani-backend-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Backend Status Check
        if (req.url === '/api/status' && req.method === 'GET') {
          const key = getGnaniApiKey();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ gnaniConfigured: Boolean(key) }));
          return;
        }

        // Backend STT Route: POST /api/stt
        if (req.url?.startsWith('/api/stt') && req.method === 'POST') {
          const chunks = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            const buffer = Buffer.concat(chunks);
            const urlObj = new URL(req.url, 'http://localhost');
            const lang = urlObj.searchParams.get('lang') || 'en-IN';

            const result = await handleBackendSTT(buffer, lang);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          });
          return;
        }

        // Backend TTS Route: POST /api/tts
        if (req.url === '/api/tts' && req.method === 'POST') {
          const chunks = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', async () => {
            try {
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const { text, suspectId, stressLevel } = JSON.parse(bodyStr || '{}');

              const result = await handleBackendTTS(text, suspectId || 'raju', stressLevel || 30);
              if (result.success && result.audioBuffer) {
                res.setHeader('Content-Type', result.contentType || 'audio/wav');
                res.end(result.audioBuffer);
              } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), gnaniBackendPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  build: {
    rolldownOptions: {
      output: {
        // Rolldown requires manualChunks as a function (not an object like Rollup)
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/three/")) {
            return "three-core";
          }
          if (id.includes("node_modules/@react-three/")) {
            return "three-react";
          }
          if (id.includes("node_modules/zustand/")) {
            return "state";
          }
        }
      }
    }
  }
});
