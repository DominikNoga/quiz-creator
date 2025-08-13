import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.scss';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__container">
          <Link to="/" className="layout__logo">
            <h1>PSD Exam Prep</h1>
          </Link>
          <nav className="layout__nav">
            <Link 
              to="/" 
              className={`layout__nav-link ${location.pathname === '/' ? 'layout__nav-link--active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/progress" 
              className={`layout__nav-link ${location.pathname === '/progress' ? 'layout__nav-link--active' : ''}`}
            >
              Progress
            </Link>
          </nav>
        </div>
      </header>
      <main className="layout__main">
        <div className="layout__container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}