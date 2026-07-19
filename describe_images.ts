import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

async function analyze() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const images = [
    "src/assets/images/regenerated_image_1784481589334.jpg",
    "src/assets/images/regenerated_image_1784481733583.jpg",
    "src/assets/images/regenerated_image_1784481828760.jpg"
  ];

  for (const imgPath of images) {
    if (!fs.existsSync(imgPath)) {
      console.log(`File not found: ${imgPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(imgPath);
    const base64Data = fileBuffer.toString("base64");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            },
            {
              text: "Briefly describe what this image shows. Say whether it represents a dirty, wild yard with weeds/debris/dirt/untouched lawn (BEFORE) or a finished premium green grass lawn (AFTER)."
            }
          ]
        }
      });
      console.log(`\n=== ${imgPath} ===`);
      console.log(response.text.trim());
    } catch (err: any) {
      console.error(`Error analyzing ${imgPath}:`, err.message || err);
    }
  }
}

analyze();
