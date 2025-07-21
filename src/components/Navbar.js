import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../features/auth/authThunks';

export default function Navbar() {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  if (!token) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/products" style={styles.link}>Products</Link>
      </div>

      <button onClick={handleLogout} style={styles.logoutBtn}>
        🔒 Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: '#1e293b', // Dark blue-gray
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    fontFamily: "'Inter', sans-serif",
  },
  left: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#f1f5f9',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.2s ease',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    fontWeight: 600,
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

// Add this CSS to your global styles or index.css for hover effects:
