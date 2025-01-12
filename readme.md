
## Dish-Genie: AI Recipe Generator (Full-Stack)
This project is a full-stack application that allows users to input a list of ingredients, and the server generates a recipe using Hugging Face's Inference API. It consists of a front-end built with **React.js + Vite** and a back-end with **Node.js/Express.js** to handle API requests.


## Setup Instructions
*- Prerequisites*
  1. Node.js installed on your machine.
  2. React.js installed (for front-end).
  3. A Hugging Face API key for accessing the Inference API.


## Features
*Back-End:*
  Recipe Generation: Uses Hugging Face’s API to generate recipes based on user-provided ingredients.
  CORS Support: Handles cross-origin requests between the front-end and back-end.

*Front-End:*
  Interactive UI: Built with React.js to provide an intuitive user experience for recipe generation.
  User Inputs: Users can type in ingredients, and the application displays a generated recipe.


## Technologies Used
*Back-End:*
  Node.js: JavaScript runtime for building the server.
  Express.js: Web framework for handling API requests.
  Axios: Used to make API calls to Hugging Face's Inference API.
  CORS: Middleware for enabling cross-origin resource sharing between front-end and back-end.
  dotenv: Manages environment variables, such as the Hugging Face API token.

*Front-End:*
  React.js: JavaScript library for building user interfaces.
  Axios: To send HTTP requests from React to the back-end server.
  Hugging Face Inference API: AI service used to generate recipe content based on ingredients.