import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../features/auth/authThunks';

const loadFont = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    loadFont();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setValidationError('Please enter both username and password.');
      return;
    }
    setValidationError('');
    dispatch(loginThunk({ username, password }));
  };

  return (
    <div style={styles.page}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Login Page</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" disabled={isLoading} style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {validationError && <div style={styles.error}>{validationError}</div>}
        {error && <div style={styles.error}>{`Login failed: ${error}`}</div>}
        {token && <div style={styles.success}>✅ Logged in successfully!</div>}
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe, #e0f2fe)',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease-in-out',
  },
  form: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    padding: '40px 32px',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    animation: 'fadeIn 0.6s ease-in-out',
  },
  title: {
    textAlign: 'center',
    color: '#1e3a8a',
    fontWeight: 700,
    fontSize: '26px',
    marginBottom: '12px',
  },
  input: {
    padding: '12px 14px',
    fontSize: '16px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.2s ease',
  },
  error: {
    fontSize: '14px',
    color: '#dc2626',
    textAlign: 'center',
    marginTop: '4px',
  },
  success: {
    fontSize: '14px',
    color: '#16a34a',
    textAlign: 'center',
    marginTop: '4px',
  },
};
