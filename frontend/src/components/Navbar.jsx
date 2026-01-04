import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavbarStyle({
          background: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        });
      } else {
        setNavbarStyle({
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: 'none',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    handleLinkClick();
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
            Shreyas Pavuluri
          </a>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#about')}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#achievements" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#achievements')}>
              Achievements
            </a>
          </li>
          <li className="nav-item">
            <a href="#travel" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#travel')}>
              Travel
            </a>
          </li>
          <li className="nav-item">
            <a href="#standout" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#standout')}>
              What Makes Me Stand Out
            </a>
          </li>
          <li className="nav-item">
            <a href="#blog" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#blog')}>
              My Projects
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#contact')}>
              Contact
            </a>
          </li>
        </ul>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

