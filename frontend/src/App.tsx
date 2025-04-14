import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import { ThemeProvider } from "styled-components"
import { darkTheme, lightTheme } from "./assets/styles/theme"
import { useTheme } from "./contexts/ThemeContext/ThemeContext"

const App = () => {
  const { theme } = useTheme();
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;
  
  return (
    <ThemeProvider theme={selectedTheme}>
       <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
