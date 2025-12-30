import { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');

   console.log()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const body = { content };
    if (ttl) body.ttl_seconds = parseInt(ttl);
    if (maxViews) body.max_views = parseInt(maxViews);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/pastes`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );


    
    const data = await res.json();
    console.log(data)
    setPasteUrl(data.url);
    setContent('');
    setTtl('');
    setMaxViews('');
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
          required
        />
        <input
          type="number"
          min="1"
          value={ttl}
          onChange={e => setTtl(e.target.value)}
          placeholder="TTL (seconds, optional)"
        />
        <input
          type="number"
          min="1"
          value={maxViews}
          onChange={e => setMaxViews(e.target.value)}
          placeholder="Max Views (optional)"
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
