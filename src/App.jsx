import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { NavBar } from './components/navbar/NavBar.jsx'
import { Footer } from './components/footer/Footer.jsx'
import { HomeScreen } from './views/HomeScreen.jsx'
import { GameScreen } from './views/GameScreen.jsx'
import { LoginScreen } from './views/LoginScreen.jsx'
import { RegisterUserScreen } from './views/RegisterUserScreen.jsx'
import { UserScreen } from './views/UserScreen.jsx'
import { MyGamesScreen } from './views/MyGamesScreen.jsx'
import { AdminScreen } from './views/AdminScreen.jsx'
import { AddNewGame } from './components/games/AddNewGame.jsx';
import { AddDeleteCarousel } from './components/carousel/AddDeleteCarousel.jsx';
import { SearchResult } from './views/SearchResult.jsx'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop.jsx'
import { GetAllTags } from './components/tag/GetAllTags.jsx'
import { TagsForGames } from './components/tag/TagsForGames.jsx'
import { GetAllUser } from './components/user/GetAllUser.jsx'
import { RankingScreen } from './views/RankingScreen.jsx'

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game/:id" element={<GameScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterUserScreen />} />
        <Route path="/user" element={<UserScreen />} />
        <Route path="/favorites" element={<MyGamesScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/addgame" element={<AddNewGame />} />
        <Route path="/editcarousel" element={<AddDeleteCarousel />} />      
        <Route path="/addgame" element={<AddNewGame />} />
        <Route path="/search" element={<SearchResult/>}></Route>
        <Route path="/managetag" element={<GetAllTags />}></Route>
        <Route path="/tagsxgames/:gameId" element={<TagsForGames />} />
        <Route path="/users" element={<GetAllUser />} />
        <Route path="/ranking" element={<RankingScreen />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}

export default App
