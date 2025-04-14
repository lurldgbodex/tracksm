import React from "react";
import styled from "styled-components";
import { useTheme } from "../../contexts/ThemeContext/ThemeContext";

const HeaderContainer = styled.header`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    box-shadow: 0 20px 4px rgba(0, 0, 0, 0.1);
`;

const ThemeTogggle = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
`;

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <HeaderContainer>
            <h1>Task Manager</h1>
            <div>
                <span>Welcome,'Guest'</span>
                <ThemeTogggle onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </ThemeTogggle>
            </div>
        </HeaderContainer>
    )
}

export default Header;