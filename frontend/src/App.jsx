import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

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
