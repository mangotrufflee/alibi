import { handleBackendSTT } from "../server/gnaniBackend.js";

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const language = new URL(req.url, "https://alibi.local").searchParams.get("lang") || "en-IN";
    const result = await handleBackendSTT(await readRequestBody(req), language);
    return res.status(result.success ? 200 : 502).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Speech transcription failed." });
  }
}

export const config = {
  api: { bodyParser: false }
};
