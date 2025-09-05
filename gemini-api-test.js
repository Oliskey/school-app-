// To run this code you need to install the following dependencies:
// npm install @google/generative-ai mime dotenv

import { GoogleGenerativeAI } from '@google/generative-ai';
import mime from 'mime';
import { writeFile } from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

function saveBinaryFile(fileName, content) {
  writeFile(fileName, content, (err) => {
    if (err) {
      console.error(`Error writing file ${fileName}:`, err);
      return;
    }
    console.log(`File ${fileName} saved to file system.`);
  });
}

async function main() {
  // Make sure you have set your GEMINI_API_KEY in the .env.local file
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Please set the GEMINI_API_KEY in your .env.local file');
    return;
  }

  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = 'Explain how AI can be used in education';
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  } catch (error) {
    console.error('Error generating content:', error);
  }
}

main();