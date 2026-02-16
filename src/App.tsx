import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import NewsDetail from "./pages/News/NewsDetail";
import "./scss/App.scss"
import { FeedbackProvider } from "./components/context/FeedbackContext";
import Feedback from "./components/Feedback";

function App() {
  return (
    <Router>
      <FeedbackProvider>
        <Feedback/>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </main>
      </FeedbackProvider>
    </Router>
  )
}

export default App;
