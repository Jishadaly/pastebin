import { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.BASE_URL}/api/pastes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    setPasteUrl(data.url);
    setContent('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pasteUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="app-container">
      <h1 className="title">Pastebin Lite</h1>
      <form onSubmit={handleSubmit} className="paste-form">
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Enter your text here..."
        />
        <button type="submit">Create Paste</button>
      </form>

      {pasteUrl && (
        <div className="url-container">
          <input type="text" value={pasteUrl} readOnly />
          <button onClick={handleCopy}>Copy URL</button>
        </div>
      )}
    </div>
  );
}

export default App;
