import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function generateRandomSessionId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Example usage:
if (!getCookie('session_id')) {
    const randomSessionId = generateRandomSessionId(16); // Generates a random 16-character session ID
    setCookie('session_id', randomSessionId, 7); // Set the 'session_id' cookie with an expiration of 7 days
    console.log('Session ID set:', getCookie('session_id'));
} else {
    console.log('Session ID already exists:', getCookie('session_id'));
}



// Example usage:

function App() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Send the query to the backend
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    // Update the messages list
    setMessages([...messages, { user: query, bot: data.bot }]);
    setQuery('');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chat with Bot</h1>
      <div style={styles.chatContainer}>
        {messages.map((message, index) => (
            <div key={index} style={styles.messageContainer}>
              <p><strong>You:</strong> {message.user}</p>
              <p><strong>Bot:</strong></p>
              <ReactMarkdown>{message.bot}</ReactMarkdown>
            </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
  },
  chatContainer: {
    border: '1px solid #ddd',
    padding: '10px',
    height: '400px',
    overflowY: 'auto',
    marginBottom: '10px',
  },
  messageContainer: {
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default App;
