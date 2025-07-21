import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsThunk, addProductThunk, updateProductThunk, deleteProductThunk } from './productsThunks';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, state => {state.isLoading = true;})
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.products;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.isLoading = false; state.error = action.error.message;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.meta.arg);
      });
  }
});
export default productsSlice.reducer;
