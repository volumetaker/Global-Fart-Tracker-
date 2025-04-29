document.addEventListener('DOMContentLoaded', () => {
    // Fart counter logic
    const population = 8000000000; // 8 billion
    const avgFartsPerDay = 15; // Average of 10–20 farts per day
    const secondsInDay = 86400;
    const baseFartsPerSecond = (population * avgFartsPerDay) / secondsInDay; // ~1.39M farts/second

    const counter = document.getElementById('fart-counter');
    
    function updateCounter() {
        // Add randomization for fun (±10% variation)
        const variation = baseFartsPerSecond * 0.1 * (Math.random() * 2 - 1);
        const fartsNow = Math.round(baseFartsPerSecond + variation);
        counter.textContent = fartsNow.toLocaleString();
    }

    // Update every 2 seconds
    updateCounter();
    setInterval(updateCounter, 2000);

    // Form submission feedback
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Simulate form submission (replace with actual Formspree submission)
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('hidden');
            this.reset();
            setTimeout(() => {
                document.getElementById('form-message').classList.add('hidden');
            }, 3000);
        }, 1000);
    });

    // Chatbot logic
    const chatMessages(dictionary => {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const chatSubmit = document.getElementById('chat-submit');

        // Mock responses for demonstration
        const mockResponses = [
            "Farts smell because of sulfur compounds like hydrogen sulfide. Blame your gut bacteria!",
            "Did you know? The average person farts about 0.5–1.5 liters of gas daily!",
            "Farts can travel at 10 feet per second. That's some serious wind power!",
            "Yes, farts are flammable due to methane content, but please don't try it at home!",
            "Diet matters! Beans and broccoli can turn you into a fart factory."
        ];

        function addMessage(message, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
            messageDiv.innerHTML = `<span class="message">${message}</span>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function fetchAIResponse(message) {
            // Placeholder for external AI API call
            // Replace with actual API integration (e.g., xAI Grok API)
            // Example:
            /*
            const response = await fetch('https://api.x.ai/grok', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
                body: JSON.stringify({ prompt: `Answer this fart-related question humorously and knowledgeably: ${message}` })
            });
            const data = await response.json();
            return data.response;
            */

            // Mock response for now
            return mockResponses[Math.floor(Math.random() * mockResponses.length)];
        }

        chatSubmit.addEventListener('click', async () => {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                const response = await fetchAIResponse(message);
                addMessage(response, false);
            }
        });

        chatInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                addMessage(chatInput.value, true);
                chatInput.value = '';
                const response = await fetchAIResponse(chatInput.value);
                addMessage(response, false);
            }
        });
    });
});