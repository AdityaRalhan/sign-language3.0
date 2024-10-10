import FrontPage from './FrontPage'
import Model from './Model'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


export const App = () => {
  return (
    <Router>
      
      <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/Model" element={<Model />} />
        </Routes>
      </Router>
  )
}

export default App
