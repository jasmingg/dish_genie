// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { HfInference } = require('@huggingface/inference');

// Hugging Face setup
const hf = new HfInference(process.env.HF_ACCESS_TOKEN)
const SYSTEM_PROMPT = `
You are an expert chef that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
Make sure you follow these rules: 1. Incorporate the ingredients creatively.
2. Clearly list the necessary quantities for each ingredient.
3. Provide concise instructions for preparation and cooking.
4. End with a finishing step (e.g., plating and enjoying the dish).
Ensure the recipe is coherent, professional, and ends definitively without trailing off. Do not repeat or over-elaborate on earlier steps. Do not include explicit self-evaluation.
`;

// Create the Express server
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
    res.send('Dish Genie server is running.');
})

// Route to handle recipe generation
app.post('/generate-recipe', async (req, res) => {
    const { ingredientsArr } = req.body;

    if (!ingredientsArr || ingredientsArr.length === 0) {
        return res.status(400).json({ error: 'No ingredients provided.' });
    }

    try {
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

        res.status(200).json({ recipe: response.choices[0].message.content });
    } catch (err) {
        console.error('Error fetching recipe:', err.message);
        res.status(500).json({ error: 'Failed to fetch recipe.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});