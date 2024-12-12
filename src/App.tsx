import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SceneViewer } from './components/SceneViewer/SceneViewer';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { CategoryView } from './components/CategoryView/CategoryView';
import { SearchResults } from './components/Search/SearchResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-900">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryView />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/:fanName" element={<SceneViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;