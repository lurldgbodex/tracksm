import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    title?: string;
    autoClose?: boolean;
    autoCloseDelay?: number;
    createdAt: number;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: []
}

const DEFAULT_AUTO_CLOSE = true;
const DEFAULT_AUTO_DELAY = 5000;

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
            const notification: Notification = {
                id: nanoid(),
                createdAt: Date.now(),
                autoClose: action.payload.autoClose ?? DEFAULT_AUTO_CLOSE,
                autoCloseDelay: action.payload.autoCloseDelay ?? DEFAULT_AUTO_DELAY,
                ...action.payload,
            };
            state.notifications.push(notification);
        },
        dismissNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                notification => notification.id !== action.payload
            );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        }
    }
});

export const { addNotification, dismissNotification, clearNotifications } = notificationSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications.notifications;

export const showNotification = (notification: Omit<Notification, 'createdAt'>): AppThunk => (dispatch) => {
    dispatch(addNotification(notification));

    if (notification.autoClose ?? DEFAULT_AUTO_CLOSE) {
        const delay = notification.autoCloseDelay ?? DEFAULT_AUTO_DELAY;
        setTimeout(() => {
            dispatch(dismissNotification(notification.id));
        }, delay);
    }
};

export const showSuccess = (message: string, id: string, title?: string): AppThunk => (dispatch) => {
   dispatch(
    showNotification({
        id,
        type: 'success',
        message,
        title: title ?? 'Success',
        autoClose: true,
    })
  )
}

export const showError = (id: string, message: string, title?: string): AppThunk => (dispatch) => {
    dispatch(
        showNotification({
            type: 'error',
            id,
            message,
            title: title ?? 'Error',
            autoClose: false,
        })
    )
}

export const showInfo = (id: string, message: string, title?: string): AppThunk => (dispatch) => {
    dispatch(
        showNotification({
            type: 'info',
            id,
            message,
            title: title ?? 'Info',
            autoClose: true,
        })
    )
};

export const showWarning = (id: string, message: string, title?: string): AppThunk => (dispatch) => {
    dispatch(
        showNotification({
            type: 'warning',
            id,
            message,
            title: title ?? 'Warning',
            autoClose: true,
        })
    )
};

export default notificationSlice.reducer;