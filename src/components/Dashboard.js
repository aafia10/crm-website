import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsThunk } from '../features/products/productsThunks';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const isLoading = useSelector(state => state.products.isLoading);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProductsThunk());
    }
  }, [dispatch, products]);

  const chartData = (products || []).slice(0, 10).map(p => ({
    name: p.title.length > 12 ? p.title.slice(0, 12) + '…' : p.title,
    value: p.price,
  }));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>📊 Product Analytics</h2>
        <p style={styles.subheading}>Overview of latest product prices</p>
      </div>

      <div style={styles.card}>
        {isLoading ? (
          <div style={styles.loading}>Loading chart...</div>
        ) : chartData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={styles.noData}>📭 No data to display</div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    fontFamily: "'Inter', sans-serif",
    background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe)',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1e40af',
    marginBottom: '8px',
  },
  subheading: {
    fontSize: '16px',
    color: '#475569',
  },
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    background: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#0f172a',
    padding: '60px 0',
  },
  noData: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#94a3b8',
    padding: '60px 0',
  },
};
