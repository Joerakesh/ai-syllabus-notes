// list-models.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

async function listModels() {
  const result = await genAI.listModels();
  console.log("Available models:\n");
  result.models.forEach((model) => {
    console.log(`- ${model.name}`);
  });
}

listModels();
