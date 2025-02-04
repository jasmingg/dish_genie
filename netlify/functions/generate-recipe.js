require('dotenv').config();
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an expert chef that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
Make sure you follow these rules: 1. Incorporate the ingredients creatively.
2. Clearly list the necessary quantities for each ingredient.
3. Provide concise instructions for preparation and cooking.
4. End with a finishing step (e.g., plating and enjoying the dish).
Ensure the recipe is coherent, professional, and ends definitively without trailing off. Do not repeat or over-elaborate on earlier steps. Do not include explicit self-evaluation.
`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { ingredientsArr } = JSON.parse(event.body);

    if (!ingredientsArr || ingredientsArr.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No ingredients provided.' }),
      };
    }

    const ingredientsString = ingredientsArr.join(', ');

    const response = await hf.chatCompletion({
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please provide a single recipe using these ingredients.
          Generate a recipe for a dish with the following structure:
          Recipe Name: Start with 'Recipe: [Dish Name]', followed by the name of the dish.
          Summary: Write a short paragraph (1-2 sentences) describing the dish’s key flavors and why it's enjoyable or beneficial.
          Ingredients: List all ingredients in bullet points. Include measurements and any optional ingredients in parentheses.
          Instructions: Provide clear, concise step-by-step instructions (numbered), detailing the preparation, cooking, and assembly process. Each step should be short and to the point.
          Final sentence: End with a simple 'Enjoy!' or another closing remark.
          Ensure the recipe is formatted cleanly with no unnecessary information, focusing on a clear presentation of the dish.`,
        },
      ],
      max_tokens: 1024,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe: response.choices[0].message.content }),
    };
  } catch (err) {
    console.error('Error fetching recipe:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch recipe.' }),
    };
  }
};
