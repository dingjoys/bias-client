import { CSSProperties, ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './formSlice';
import { modalController } from './modalControllerSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        modalController: modalController.reducer,
        form: formSlice.reducer,
    },
});

declare type Wallet = {
    account?: string;
    chainId?: string;
};

declare type RootState = {
    user: Wallet;
    modalController: {
        loginModal: { isShow: boolean; stepRequired: number };
        userProfileEditorModal: { isShow: boolean; user: any };
        loadingModal: { isShow: boolean; tip?: string };
        alertModal: { isShow: boolean; title: string; body: string; warning: boolean };
        profileCompleteModal: { isShow: boolean; state?: number };
        congratsModal: { isShow: boolean; introduction: string; image: string };
        confirmModal: { isShow: boolean; title: string; body: string | ReactNode; onCancel; onConfirm, portalClassName: string, style: { content?: CSSProperties, overlay?: CSSProperties } };
        badgeSynchronizeModal: { isShow: boolean };
        joinLuckyDrawModal: { isShow: boolean; amount: number };
        joinLatestLuckyDrawModal: { isShow: boolean; raffleId: number; requirement: number };
        promptModal: {
            isShow: boolean;
            value: string;
            placeholder: string;
            title: string;
            content: any;
            callback;
        };
    };
    form: any;
};

export { type RootState };
export type AppDispatch = typeof store.dispatch;
export default store;
