import { createSlice } from "@reduxjs/toolkit";

import * as actions from "../action"
 

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isLogin : false,
        sendMail : null,
        user:null,
        token:null

    },
    reducers: {
        loginUser:(state, action) =>{
            state.isLogin = action.payload?.success
            state.user = action.payload?.result
            state.token = action.payload?.accessToken
        },
        sendMail:(state, action) => {
            state.sendMail = action.payload
        },
        logOut:(state) => {
            state.user = null,
            state.token = null,
            state.isLogin = false
        }
        
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(actions.getCurrentUser.pending , (state) => {
          state.isLoading = true;
        });
        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
        });
        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
          state.isLoading = false;
          state.user = null;
        });
    }
})
export const {loginUser, sendMail,logOut} = authSlice.actions

export default authSlice.reducer