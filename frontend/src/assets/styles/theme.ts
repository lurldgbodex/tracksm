interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBackground: string;
}

export interface AppTheme {
    colors: ThemeColors;
}

export const lightTheme: AppTheme = {
    colors: {
        primary: '#4a6fa5',
        secondary: '#166088',
        background: '#f8f9fa',
        text: '#333',
        cardBackground: '#fff',
    },
};

export const darkTheme: AppTheme = {
    colors: {
      primary: '#4C4D4DFF',
      secondary: '#4a6fa5',
      background: '#232222FF',
      text: '#f8f9fa',
      cardBackground: '#1e1e1e',
    },
};