document.getElementById('prompt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const promptInput = document.getElementById('prompt-input');
    const aiResponse = document.getElementById('ai-response');
    const prompt = promptInput.value;
    const submitButton = document.querySelector('button[type="submit"]');

    aiResponse.textContent = 'Generating response...';
    submitButton.textContent = 'Generating...';
    submitButton.disabled = true;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (response.ok) {
            aiResponse.textContent = data.choices[0].message.content;
        } else {
            aiResponse.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        console.error('Error:', error);
        aiResponse.textContent = 'Error: Could not connect to the server.';
    } finally {
        submitButton.textContent = 'Generate Response';
        submitButton.disabled = false;
    }
});