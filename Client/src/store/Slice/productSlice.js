import { createSlice } from "@reduxjs/toolkit";

import * as actions from "../action"


const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    oneProduct: null,
    reviewProduct: []
  },
  reducers: {
    review: (state, action) => {
      const newReview = action.payload;
      if (!state.reviewProduct || !Array.isArray(state.reviewProduct)) {
        state.reviewProduct = [];
      }
      const isDuplicate = state.reviewProduct?.some(existingReview => (
        existingReview == newReview
      ));
        console.log(isDuplicate)
      if (!isDuplicate) {
        const newReviewProduct = [...state.reviewProduct, newReview];
        newReviewProduct.reverse()
        state.reviewProduct = newReviewProduct.slice(0, 10);
      }
      // else {
      //   const data = state.reviewProduct.filter(e => e != newReview)
      //   state.reviewProduct = [newReview, data]
      // }
    }

  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getOneProduct.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });
    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getOneProduct.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.oneProduct = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getOneProduct.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  }
})
export const { review } = ProductSlice.actions

export default ProductSlice.reducer