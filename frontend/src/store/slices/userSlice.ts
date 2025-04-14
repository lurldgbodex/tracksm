import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    userData: {
        id: string;
        name: string;
        email: string;
    } | null;
    preferences: {
        language: string;
        timezone: string;
    };
}

const initialState: UserState = {
    isAuthenticated: false,
    userData: null,
    preferences: {
        language: 'en',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState['userData']>) => {
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userData = null;
        },
        updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
            state.preferences = { ...state.preferences, ...action.payload };
        }
    }
});

export const { login, logout, updatePreferences } = userSlice.actions;
export default userSlice.reducer;