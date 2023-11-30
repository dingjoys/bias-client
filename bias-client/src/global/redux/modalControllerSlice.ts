import { createSlice } from '@reduxjs/toolkit';

export const modalController = createSlice({
    name: 'modalController',
    initialState: {
        loginModal: {
            isShow: false,
            stepRequired: 2,
        },
        userProfileEditorModal: {
            isShow: false,
            user: null,
        },
        loadingModal: {
            isShow: false,
            tip: null,
        },
        profileCompleteModal: {
            isShow: false,
            state: 0,
        },
        alertModal: {
            isShow: false,
            title: null,
            body: null,
            warning: true,
        },
        congratsModal: {
            isShow: false,
            introduction: null,
            image: null,
        },
        confirmModal: {
            isShow: false,
            title: null,
            body: null,
            style: null,
            portalClassName: null,
            onCancel: null,
            onConfirm: null,
        },
        badgeSynchronizeModal: {
            isShow: false,
            onChange: null,
        },
        joinLuckyDrawModal: {
            isShow: false,
            amount: 1,
        },
        joinLatestLuckyDrawModal: {
            isShow: false,
            raffleId: -1,
            requirement: 0,
        },
        badgeCreationModal: {
            isShow: false,
            data: null,
        },
        achievementRedeemModal: {
            isShow: false,
            badge: null,
            achievement: null,
        },
        promptModal: {
            isShow: false,
            value: null,
            placeholder: null,
            title: null,
            content: null,
            callback: null,
        },
    },
    reducers: {
        hideLoginModal: (state) => {
            state.loginModal.isShow = false;
        },
        displayLoginModal: (state, action) => {
            state.loginModal.isShow = true;
            state.loginModal.stepRequired = action.payload;
        },
        hideAlertModal: (state) => {
            state.alertModal.isShow = false;
        },
        displayAlertModal: (state, action) => {
            state.alertModal.isShow = true;
            state.alertModal.title = action.payload.title;
            state.alertModal.body = action.payload.body;
            state.alertModal.warning = action.payload.warning == null ? true : false;
        },
        hideUserProfileEditorModal: (state) => {
            state.userProfileEditorModal.isShow = false;
        },
        displayUserProfileEditorModal: (state, action) => {
            state.userProfileEditorModal.isShow = true;
            state.userProfileEditorModal.user = action.payload;
        },
        hideLoadingModal: (state) => {
            state.loadingModal.isShow = false;
        },
        displayLoadingModal: (state, action) => {
            state.loadingModal.isShow = true;
            state.loadingModal.tip = action.payload;
        },
        hideProfileCompleteModal: (state) => {
            state.profileCompleteModal.isShow = false;
        },
        displayProfileCompleteModal: (state, action) => {
            state.profileCompleteModal.isShow = true;
            state.profileCompleteModal.state = action.payload;
        },
        hideCongratsModal: (state) => {
            state.congratsModal.isShow = false;
        },
        displayCongratsModal: (state, action) => {
            state.congratsModal.isShow = true;
            state.congratsModal.introduction = action.payload.introduction;
            state.congratsModal.image = action.payload.image;
        },
        displayConfirmModal: (state, action) => {
            state.confirmModal.isShow = true;
            state.confirmModal.title = action.payload.title;
            state.confirmModal.body = action.payload.body;
            state.confirmModal.style = action.payload.style;
            state.confirmModal.portalClassName = action.payload.portalClassName;
            state.confirmModal.onCancel = action.payload.onCancel;
            state.confirmModal.onConfirm = action.payload.onConfirm;
        },
        hideConfirmModal: (state) => {
            state.confirmModal.isShow = false;
            state.confirmModal.title = null;
            state.confirmModal.body = null;
            state.confirmModal.portalClassName = null;
            state.confirmModal.style = null;
            state.confirmModal.onCancel = null;
            state.confirmModal.onConfirm = null;
        },
        displayBadgeSynchronizeModal: (state) => {
            state.badgeSynchronizeModal.isShow = true;
        },
        hideBadgeSynchronizeModal: (state) => {
            state.badgeSynchronizeModal.isShow = false;
        },
        displayJoinLuckyDrawModal: (state, action) => {
            state.joinLuckyDrawModal.isShow = true;
            state.joinLuckyDrawModal.amount = action.payload.amount;
        },
        hideJoinLuckyDrawModal: (state) => {
            state.joinLuckyDrawModal.isShow = false;
        },
        displayLatestJoinLuckyDrawModal: (state, action) => {
            state.joinLatestLuckyDrawModal.isShow = true;
            state.joinLatestLuckyDrawModal.raffleId = action.payload.raffleId;
            state.joinLatestLuckyDrawModal.requirement = action.payload.requirement;
        },
        hideLatestJoinLuckyDrawModal: (state) => {
            state.joinLatestLuckyDrawModal.isShow = false;
        },
        displayBadgeCreationModal: (state, action) => {
            state.badgeCreationModal.isShow = true;
            state.badgeCreationModal.data = action.payload.data;
        },
        hideBadgeCreationModal: (state) => {
            state.badgeCreationModal.isShow = false;
            state.badgeCreationModal.data = null;
        },
        displayAchievementRedeemModal: (state, action) => {
            state.achievementRedeemModal.isShow = true;
            state.achievementRedeemModal.badge = action.payload.badge;
            state.achievementRedeemModal.achievement = action.payload.achievement;
        },
        hideAchievementRedeemModal: (state) => {
            state.achievementRedeemModal.isShow = false;
            state.achievementRedeemModal.badge = null;
            state.achievementRedeemModal.achievement = null;
        },

        displayPromptModal: (state, action) => {
            const { content, title, placeholder, callback } = action.payload;
            state.promptModal.content = content;
            state.promptModal.title = title;
            state.promptModal.placeholder = placeholder;
            state.promptModal.isShow = true;
            state.promptModal.value = null;
            state.promptModal.callback = callback;
        },
        hidePromptModal: (state, action) => {
            const { value } = action.payload;
            state.promptModal.value = value;
            state.promptModal.isShow = false;
        },
    },
});

export const {
    hideLoginModal,
    displayLoginModal,
    hideUserProfileEditorModal,
    displayUserProfileEditorModal,
    hideLoadingModal,
    displayLoadingModal,
    hideProfileCompleteModal,
    displayProfileCompleteModal,
    displayAlertModal,
    hideAlertModal,
    hideCongratsModal,
    displayCongratsModal,
    hideConfirmModal,
    displayConfirmModal,
    displayBadgeSynchronizeModal,
    hideBadgeSynchronizeModal,
    displayJoinLuckyDrawModal,
    hideJoinLuckyDrawModal,
    displayLatestJoinLuckyDrawModal,
    hideLatestJoinLuckyDrawModal,
    displayBadgeCreationModal,
    hideBadgeCreationModal,
    displayAchievementRedeemModal,
    hideAchievementRedeemModal,
    displayPromptModal,
    hidePromptModal,
} = modalController.actions;
