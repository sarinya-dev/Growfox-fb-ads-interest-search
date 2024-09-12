import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState(''); // Store the generated token

  const [filters, setFilters] = useState({
    language: '',
    audienceLower: '',
    audienceUpper: '',
  });
  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a search term');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/search', { query });
      setResults(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch results.');
    }
  };

  const handleFiltersChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
    <header className="navbar">
      <div className="logo">
        <img src="https://growfox.co/wp-content/uploads/2023/04/Main-Logo.png" alt="Company Logo" className="company-logo" />
        <h1>Company Name</h1>
      </div>
      <nav className="menu">
        <ul>
          <li><a href="#search-section">Interest Search</a></li>
        </ul>
      </nav>
    </header>

    <main className='section-body'>
       <section id="search-section" className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter interest..."
              className="search-box"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            <button className="settings-button">Settings</button>
          </div>

          <div className="filter-container">
            <label>
              Language: 
              <input
                type="text"
                name="language"
                value={filters.language}
                onChange={handleFiltersChange}
                placeholder="Enter language"
              />
            </label>
            <label>
              Audience Size Lower:
              <input
                type="number"
                name="audienceLower"
                value={filters.audienceLower}
                onChange={handleFiltersChange}
                placeholder="Lower"
              />
            </label>
            <label>
              Audience Size Upper:
              <input
                type="number"
                name="audienceUpper"
                value={filters.audienceUpper}
                onChange={handleFiltersChange}
                placeholder="Upper"
              />
            </label>
          </div>

          {error && <p className="error">{error}</p>}

          {token && (
            <p className="token-info">
              <strong>Generated Token:</strong> {token}
            </p>
          )}

          {results.length > 0 && (
            <table className="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Audience Size</th>
                  <th>Path 1</th>
                  <th>Path 2</th>
                  <th>Path 3</th>
                  <th>Description</th>
                  <th>Topic</th>
                </tr>
              </thead>
              <tbody>
                {results.map((interest) => (
                  <tr key={interest.id}>
                    <td>{interest.id}</td>
                    <td>{interest.name}</td>
                    <td>{interest.audience_size.toLocaleString()}</td>
                    <td>{interest.path[0]}</td>
                    <td>{interest.path[1] || 'N/A'}</td>
                    <td>{interest.path[2] || 'N/A'}</td>
                    <td>{interest.description || 'N/A'}</td>
                    <td>{interest.topic || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;