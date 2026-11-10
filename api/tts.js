import { handleBackendTTS } from "../server/gnaniBackend.js";

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = JSON.parse((await readRequestBody(req)) || "{}");
    const result = await handleBackendTTS(
      body.text,
      body.suspectId || "raju",
      body.stressLevel || 30
    );

    if (result.success && result.audioBuffer) {
      res.setHeader("Content-Type", result.contentType || "audio/wav");
      return res.status(200).send(result.audioBuffer);
    }

    return res.status(502).json({
      success: false,
      fallback: true,
      message: result.message || "Gnani voice synthesis is unavailable."
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Voice synthesis failed." });
  }
}

export const config = {
  api: { bodyParser: false }
};
