import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
  try {
    const apiKey = getApiKey();  
    console.log('API Key:', apiKey);
    
    if (!apiKey) {
      throw new Error('API Key no está configurada');
    }
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` 
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages, 
        temperature: 0.9, 
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error al comunicarse con OpenAI:', errorDetails);
      throw new Error(`Error al comunicarse con OpenAI: ${response.statusText}`);
  
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Error en la comunicación con OpenAI:', error);
    throw error; 
  }
};



