import { useState } from 'react'
import './App.css'

const matches = [
  {
    id: 1,
    teams: ['RCB', 'MI'],
    date: '25 March, 7:30 PM',
    venue: 'Bengaluru',
    prices: { General: 1500, Premium: 4000, VIP: 8000 },
  },
  {
    id: 2,
    teams: ['CSK', 'KKR'],
    date: '27 March, 7:30 PM',
    venue: 'Chennai',
    prices: { General: 1200, Premium: 3500, VIP: 7000 },
  },
  {
    id: 3,
    teams: ['MI', 'PBKS'],
    date: '29 March, 3:30 PM',
    venue: 'Mumbai',
    prices: { General: 1000, Premium: 3000, VIP: 6500 },
  },
  {
    id: 4,
    teams: ['KKR', 'RR'],
    date: '31 March, 7:30 PM',
    venue: 'Kolkata',
    prices: { General: 1500, Premium: 4000, VIP: 7500 },
  },
]

const teamNames = {
  RCB: 'Royal Challengers Bengaluru',
  MI: 'Mumbai Indians',
  CSK: 'Chennai Super Kings',
  KKR: 'Kolkata Knight Riders',
  PBKS: 'Punjab Kings',
  RR: 'Rajasthan Royals',
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <a className="logo" href="#home" onClick={closeMenu}>IPL 2026</a>
      <button
        type="button"
        className="menu-btn"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>
      <div className={`nav-links${menuOpen ? ' show' : ''}`}>
        <a href="#matches" onClick={closeMenu}>Matches</a>
        <a href="#matches" onClick={closeMenu}>Book Tickets</a>
        <a href="#guidelines" onClick={closeMenu}>Guidelines</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="home">
      <p className="eyebrow">The biggest cricket celebration is back</p>
      <h1>Experience the stadium energy live!</h1>
      <p>Watch your favourite teams live in IPL 2026.</p>
      <div className="hero-actions">
        <a href="#matches" className="btn">View schedule</a>
        <a href="#matches" className="btn btn-secondary">Book tickets</a>
      </div>
    </header>
  )
}

function MatchCard({ match }) {
  const matchup = match.teams.join(' vs ')

  return (
    <article className="match-card">
      <div className="match-header">
        <span className="match-tag">Match {match.id}</span>
        <h3>{matchup}</h3>
      </div>
      <div className="match-meta">
        <p><strong>Date:</strong> {match.date}</p>
        <p><strong>Venue:</strong> {match.venue}</p>
      </div>
      <div className="price-list" aria-label="Ticket prices">
        {Object.entries(match.prices).map(([category, price]) => (
          <p key={category}>
            {category}: ₹{price.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
      <a href="#matches" className="book-link" aria-label={`Book tickets for ${matchup}`}>
        Book tickets
      </a>
    </article>
  )
}

function App() {
  const [teamFilter, setTeamFilter] = useState('All')
  const [view, setView] = useState('grid')
  const visibleMatches = matches.filter(
    (match) => teamFilter === 'All' || match.teams.includes(teamFilter),
  )

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <section id="matches" className="section">
          <div className="section-heading">
            <p className="eyebrow">Find your next match</p>
            <h2>Match schedule</h2>
          </div>
          <div className="match-controls">
            <div className="filter-group">
              <label htmlFor="teamFilter">Filter by team</label>
              <select
                id="teamFilter"
                value={teamFilter}
                onChange={(event) => setTeamFilter(event.target.value)}
              >
                <option value="All">All teams</option>
                {Object.entries(teamNames).map(([code, name]) => (
                  <option value={code} key={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="view-buttons" aria-label="Match display layout">
              <button
                type="button"
                className={`view-btn${view === 'grid' ? ' active' : ''}`}
                aria-pressed={view === 'grid'}
                onClick={() => setView('grid')}
              >
                Grid view
              </button>
              <button
                type="button"
                className={`view-btn${view === 'list' ? ' active' : ''}`}
                aria-pressed={view === 'list'}
                onClick={() => setView('list')}
              >
                List view
              </button>
            </div>
          </div>
          <div className={`match-container ${view}-view`}>
            {visibleMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
            {visibleMatches.length === 0 && (
              <p className="empty-state">No matches found for this team.</p>
            )}
          </div>
        </section>
        <section id="guidelines" className="guidelines-banner">
          <h2>Ready for match day?</h2>
          <p>Bring your ticket and a valid ID, and enjoy the game.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 IPL Ticket Booking</p>
      </footer>
    </>
  )
}

export default App
