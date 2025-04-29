# Global Fart Tracker

Welcome to the **Global Fart Tracker**, a humorous, AI-powered website inspired by the whimsical concept of *Fartcoin*. This project aims to entertain and inform by estimating the number of farts happening worldwide per second and answering all your fart-related questions through an intelligent chatbot, *FartBot*.

## Project Overview

The Global Fart Tracker is a static website hosted on GitHub Pages, designed to:
- **Track Farts in Real-Time**: Estimate the number of farts occurring globally per second, based on a global population of 8 billion and an average of 15 farts per person per day.
- **Educate with Fun Facts**: Share quirky facts about farts, such as their frequency, composition, and speed.
- **Answer Fart Questions**: Feature *FartBot*, an AI chatbot that provides witty and knowledgeable answers to any fart-related query.
- **Engage Users**: Include a contact form for feedback and questions (powered by Formspree).

This project is a lighthearted derivative of *Fartcoin*, a fictional or conceptual cryptocurrency, reimagined as a fun web experience.

## Features

- **Fart Counter**: Displays a dynamic estimate of farts per second, updated every 2 seconds with a ±10% random variation for fun.
- **Fun Fart Facts**: A section with three educational tidbits about farts, presented in a grid layout.
- **FartBot Chatbot**: An interactive AI chatbot that answers fart-related questions with humor and expertise (frontend implemented; backend requires external API integration).
- **Contact Form**: A Formspree-powered form for users to send feedback or inquiries.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly layout.

## Technologies Used

- **HTML**: Structure of the static website.
- **CSS (Tailwind CSS)**: Styling for a playful, green/teal-themed design.
- **JavaScript**: Powers the fart counter and chatbot frontend.
- **GitHub Pages**: Hosts the static site at `https://<username>.github.io`.
- **Formspree**: Handles contact form submissions.
- **External AI API (Placeholder)**: Recommended for powering *FartBot* (e.g., xAI's Grok API or a custom model).

## Setup and Installation

### Prerequisites
- A GitHub account.
- A text editor (e.g., VS Code).
- Git installed locally ([Git installation guide](https://git-scm.com/downloads)).
- A Formspree account for the contact form ([Formspree](https://formspree.io/)).
- (Optional) An external AI API for *FartBot* (e.g., xAI's Grok API, see [xAI API](https://x.ai/api)).

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<username>/<username>.github.io.git
   cd <username>.github.io
   ```

2. **Add Files**:
   - Copy the provided `index.html`, `styles.css`, `script.js`, and `README.md` into the repository folder.
   - Update `index.html` with your Formspree endpoint (replace `your_form_id` in the contact form’s `action` attribute).

3. **Configure FartBot (Optional)**:
   - The chatbot frontend is included in `script.js`. To enable AI responses:
     - Set up an external AI API (e.g., xAI’s Grok API or a custom fart-trained model).
     - Update the `fetchAIResponse` function in `script.js` with your API endpoint and credentials.
     - Host the backend on a platform like Heroku, AWS, or Vercel.

4. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Initialize Global Fart Tracker with fart counter and FartBot"
   git push origin main
   ```

5. **Enable GitHub Pages**:
   - Go to the repository’s **Settings** > **Pages**.
   - Set **Source** to **Deploy from a branch**, select the **main** branch, and choose `/ (root)` folder.
   - The site will be live at `https://<username>.github.io` after a few minutes.

## Using FartBot

*FartBot* is designed to answer any fart-related question with humor and expertise. Examples:
- “Why do farts smell?”
- “How many farts does a person produce in a lifetime?”
- “Can farts catch fire?”

### Current Implementation
- The chatbot frontend (`index.html` and `script.js`) displays a chat interface with a text input and message area.
- Mock responses are provided for demonstration (e.g., “Farts smell due to sulfur compounds!”).
- To enable real AI responses, connect to an external AI API:
  - Update `script.js`’s `fetchAIResponse` function with your API endpoint.
  - Ensure the API is trained or configured to handle fart-related queries with a humorous tone.

### Backend Integration
- **xAI Grok API**: Sign up at [xAI API](https://x.ai/api) and use the API to process fart-related queries.
- **Custom Model**: Train a model on fart-related data (e.g., scientific articles, humorous texts) and host it on a server.
- **Static Fallback**: Without an API, edit `script.js` to include a larger set of predefined responses for common questions.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and commit (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

Ideas for contributions:
- Enhance *FartBot* with more predefined responses.
- Add animations or sound effects to the fart counter.
- Include additional fart facts or a fart trivia quiz.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Have questions or feedback? Use the contact form on the website or open an issue on GitHub. For fart-related inquiries, chat with *FartBot*!

---
*Powered by flatulent innovation and a whiff of AI magic!*