// Illustrative artwork from the approved mockup; these are not product screenshots.
export function WeddingArtwork() {
  return (
    <div
      className="feature-art"
      role="img"
      aria-label="Illustrative wedding platform mockup, not an actual Hochzeit.click screenshot"
    >
      <div className="browser-mockup">
        <div className="browser-bar">
          <i></i>
          <i></i>
          <i></i>
          <span>Wedding platform / concept preview</span>
        </div>
        <div className="wedding-nav">
          <strong>The wedding edit.</strong>
          <span>Discover &nbsp; Plan &nbsp; ♥</span>
        </div>
        <div className="wedding-hero">
          <div>
            <span className="tiny">YOUR NEXT CHAPTER</span>
            <h4>
              A beautiful
              <br />
              beginning.
            </h4>
            <p>
              Find the people and places
              <br />
              for a day that's truly yours.
            </p>
            <span className="mock-button">Find your perfect venue ↗</span>
          </div>
          <div className="arch-art">
            <svg viewBox="0 0 160 210" aria-hidden="true">
              <path d="M26 210V90a54 54 0 0 1 108 0v120" fill="#e2ebe2" />
              <path d="M39 210V93a41 41 0 0 1 82 0v117" fill="#7d9e8b" />
              <path d="M56 210v-98a24 24 0 0 1 48 0v98" fill="#adc4b4" />
              <path d="M0 188Q70 149 160 186v24H0" fill="#456e59" />
              <path
                d="M18 180Q25 121 67 89M141 181Q133 112 108 83"
                fill="none"
                stroke="#456e59"
                strokeWidth="3"
              />
              <g fill="#eff4e8">
                <ellipse
                  cx="35"
                  cy="141"
                  rx="7"
                  ry="14"
                  transform="rotate(-35 35 141)"
                />
                <ellipse
                  cx="51"
                  cy="114"
                  rx="7"
                  ry="14"
                  transform="rotate(40 51 114)"
                />
                <ellipse
                  cx="125"
                  cy="136"
                  rx="7"
                  ry="14"
                  transform="rotate(35 125 136)"
                />
                <ellipse
                  cx="115"
                  cy="105"
                  rx="7"
                  ry="14"
                  transform="rotate(-35 115 105)"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="wedding-bottom">
          <span>Thoughtful venues</span>
          <span>Trusted professionals</span>
          <span>Your kind of celebration</span>
        </div>
      </div>
      <span className="mockup-label">
        Illustrative mockup · Replace with project screenshot
      </span>
    </div>
  );
}

export function MarketplaceArtwork() {
  return (
    <div
      className="mini-art market-art"
      role="img"
      aria-label="Generic marketplace concept mockup"
    >
      <div className="mini-window">
        <div className="mini-top">
          Objects & forms<span>↗</span>
        </div>
        <div className="market-content">
          <h4>Made to be discovered.</h4>
          <div className="product-shapes">
            <div className="product-shape">
              <span></span>
            </div>
            <div className="product-shape">
              <span></span>
            </div>
            <div className="product-shape">
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <span className="mockup-label">Marketplace concept mockup</span>
    </div>
  );
}

export function HealthcareArtwork() {
  return (
    <div
      className="mini-art medical-art"
      role="img"
      aria-label="Generic healthcare application concept mockup"
    >
      <div className="mini-window">
        <div className="mini-top">
          Care, connected.<small>YOUR CARE SPACE</small>
        </div>
        <div className="medical-content">
          <div>
            <h4>
              A little more
              <br />
              peace of mind.
            </h4>
            <p>
              Everything you need,
              <br />
              in one calm space.
            </p>
            <span className="mock-button">Your care overview</span>
          </div>
          <div className="medical-lines">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <span className="mockup-label">Healthcare concept mockup</span>
    </div>
  );
}

export function MobileArtwork() {
  return (
    <div
      className="mini-art mobile-art"
      role="img"
      aria-label="Generic mobile application concept mockup"
    >
      <div className="phone-mini">
        <div className="speaker"></div>
        <h4>
          Your everyday,
          <br />a little easier.
        </h4>
        <p>A space that moves with you.</p>
        <div className="app-block">Find your next thing ↗</div>
        <div className="app-block">Made for your day</div>
      </div>
      <span className="mockup-label">Mobile concept mockup</span>
    </div>
  );
}
