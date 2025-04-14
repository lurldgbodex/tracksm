import styled from "styled-components";
import Header from "./Header";

const LayoutContainer = styled.div`
    display: grid;
    grid-template-areas:
        'sidebar header'
        'sidebar main';
    grid-template-columns: 240px 1fr;
    grid-template-rows: 60px 1fr;
    min-height: 100vh;
`;

const Main = styled.main`
    grid-area: main;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
`;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutContainer>
            <Header />
            <Main>{children}</Main>
        </LayoutContainer>
    )
}

export default Layout;