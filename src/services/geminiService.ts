import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export const analyzeCropImage = async (base64Image: string): Promise<DiagnosisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this agricultural image (crop, plant, or leaf). 
  Identify the crop, detect any diseases, and provide detailed diagnostic information.
  If the image is not related to agriculture, plants, or crops, return a response indicating it's invalid.
  
  Provide the result in a structured JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: [
          "cropName", "leafType", "diseaseName", "confidence", 
          "symptoms", "causes", "severity", "recommendedTreatment", 
          "preventionMethods", "nextAction"
        ],
        properties: {
          cropName: { type: Type.STRING, description: "Common name of the crop/plant" },
          leafType: { type: Type.STRING, description: "Type of leaf or part shown" },
          diseaseName: { type: Type.STRING, description: "Name of the detected disease or 'Healthy'" },
          confidence: { type: Type.NUMBER, description: "Confidence score percentage (0-100)" },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of observable symptoms" },
          causes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Likely causes of the issue" },
          severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"], description: "Severity level" },
          recommendedTreatment: { type: Type.STRING, description: "Detailed treatment or cure" },
          preventionMethods: { type: Type.ARRAY, items: { type: Type.STRING }, description: "How to prevent in the future" },
          nextAction: { type: Type.STRING, description: "Step for the farmer to take now" }
        }
      }
    }
  });

  const result = JSON.parse(response.text);
  
  return {
    ...result,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    imageUrl: base64Image // Storing the base64 for history display
  };
};
