import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsThunk,
  addProductThunk,
  updateProductThunk,
  deleteProductThunk
} from '../features/products/productsThunks';

export default function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({ title: '', price: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({ title: product.title, price: product.price });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateProductThunk({ ...form, id: editId }));
      setEditId(null);
    } else {
      dispatch(addProductThunk(form));
    }
    setForm({ title: '', price: '' });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍️ Product Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          style={styles.input}
        />
        <input
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {editId ? 'Update' : 'Add'} Product
        </button>
      </form>

      {isLoading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div style={styles.cardGrid}>
          {items.map((product) => (
            <div key={product.id} style={styles.card}>
              <div style={styles.cardTitle}>{product.title}</div>
              <div style={styles.cardPrice}>₹ {product.price}</div>
              <div style={styles.cardActions}>
                <button onClick={() => handleEdit(product)} style={styles.actionButton}>✏️</button>
                <button onClick={() => dispatch(deleteProductThunk(product.id))} style={styles.actionButton}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    padding: '2rem',
    backgroundColor: '#f9fbfd',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#1e293b',
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    flex: '1 1 200px',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  loading: {
    fontSize: '1.1rem',
    color: '#6b7280',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#111827',
  },
  cardPrice: {
    fontSize: '1rem',
    color: '#10b981',
    marginBottom: '0.5rem',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
  actionButton: {
    border: 'none',
    backgroundColor: '#f3f4f6',
    padding: '0.4rem 0.6rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    marginTop: '1rem',
    color: '#dc2626',
    fontWeight: '500',
  },
};
