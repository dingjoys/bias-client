import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'wallet',
    initialState: {
        account: null,
        chainId: null,
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setChainId: (state, action) => {
            state.chainId = action.payload;
        },
        setWallet: (state, action) => {
            state.chainId = action.payload.chainId;
            state.account = action.payload.account;
        },
    },
});

export const { setWallet, setChainId, setAccount } = userSlice.actions;
export default userSlice.reducer;
