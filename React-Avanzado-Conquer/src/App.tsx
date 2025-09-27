import { BrowserRouter } from "react-router-dom"
import './App.css'
import { AuthProvider } from './auth/AuthContainer'
import { AppRouter } from './routes/AppRouter'

function App() {
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
}

export default App
