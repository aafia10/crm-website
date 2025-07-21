import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('https://dummyjson.com/products');
  return res.data;
});
export const addProductThunk = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post('https://dummyjson.com/products/add', product);
  return res.data;
});
export const updateProductThunk = createAsyncThunk('products/update', async (product) => {
  const res = await axios.put(`https://dummyjson.com/products/${product.id}`, product);
  return res.data;
});
export const deleteProductThunk = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
  return id;
});
