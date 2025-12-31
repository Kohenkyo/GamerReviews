import React, { useState, useEffect } from 'react'
import SearchList from '../components/search_bar/SearchList.jsx'
import { useLocation } from 'react-router-dom'

export const SearchResult = () => {
  const [games, setGames] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('search_term') || '';

  useEffect(() => {
    if (!query) return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Busqueda/get-search-games?search_term=${encodeURIComponent(query)}`, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => setGames(data.data || []))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <>
      <section>
        <h2 className='subtitle'>Resultados</h2>
      </section>

      <section className='section-light'>
        <h3 className='subtitle'>"{query}"</h3>
        <div className='games-container'>
          {games.length !== 0 ? <SearchList games={games}/> : <p>No se encontraron juegos.</p>}
        </div>
      </section>
    </>
  )
}

