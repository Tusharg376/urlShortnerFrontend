import React, { useState } from 'react';
import axios from 'axios';
import './page.css';

export default function Page() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenUrl, setShortenUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL

  const handleShorten = (e) => {
    e.preventDefault();
      setShortenUrl('');
      setLoading(true);
      setError("")
      axios.post(`${apiUrl}`, { longUrl })
        .then((response) => {
          setShortenUrl(response.data.data.shortUrl);
          setDisableButton(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.message);
        });
    
  };

  const handleChangeInput = (e) => {
    setLongUrl(e.target.value);
    setShortenUrl('');
    setDisableButton(false);
    setCopiedText('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenUrl).then(() => {
      setCopiedText(shortenUrl);
    });
  };

  return (
    <div>
      <div className="content-wrapper">
        <h1 className="page-title">Shorty</h1>
        <h1 className="page-title-1">Free Url Shortner</h1>
        <p className="page-description">
        Shorty is a free tool to shorten URLs. Create short & memorable links in seconds.
        </p>
        <div className="form-wrapper">
          <div className="input-wrapper">
            <input
              onChange={handleChangeInput}
              value={longUrl}
              placeholder="https://..."
            />
            {error && <p className="error">{error}</p>}
          </div>
          <button disabled={loading || disableButton} onClick={handleShorten}>
            {loading ? 'Load...' : 'Shorten'}
          </button>
        </div>
        {shortenUrl && (
          <>
            <h3 className="result-title">Shorten URL:</h3>
            <div className="result-link-wrapper">
              <a
                target="_blank"
                rel="noreferrer"
                className="shorten-url"
                href={shortenUrl}
              >
                {shortenUrl}
              </a>
              <button onClick={handleCopy} className="copy-button">
                {copiedText === shortenUrl ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </>
        )}
      </div>
      <a
        className="github"
        href="https://github.com/Tusharg376/project-urlShortner"
        target="_blank"
        rel="noreferrer"
      >
        Drop a ⭐ on GitHub
      </a>
    </div>
  );
}
