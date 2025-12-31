import React, { useEffect, useState, useRef, useCallback } from "react";
import GameCard from "../gamecard/GameCard.jsx";
import { Spinner } from '../spinner/Spinner.jsx'

export const LazyGameList = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const observer = useRef();
  const hasFetched = useRef(new Set());
  
  const ITEMS_PER_PAGE = 20;

  const lastGameRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    }, {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (hasFetched.current.has(page)) return;
    
    setLoading(true);
    hasFetched.current.add(page);

    const url = `${import.meta.env.VITE_API_BASE_URL}/Juego/get-all-games-lazy?page=${page}&limit=${ITEMS_PER_PAGE}`;

    fetch(url, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        const responseData = data.data?.games || [];
        const total = data.data?.totalPages || 1;
        const current = data.data?.currentPage || page;

        setTotalPages(total);
        setHasMore(current < total);

        setGames(prev => {
          const existingIds = new Set(prev.map(g => g.id));
          const newGames = responseData.filter(game => !existingIds.has(game.id));
          return [...prev, ...newGames];
        });

        setLoading(false);
      })
      .catch(err => {
        console.error(`❌ Error loading page ${page}:`, err);
        setLoading(false);
        hasFetched.current.delete(page);
      });
  }, [page]);

  return (
    <div className="games-container">
      {/*debug de paginacion
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        zIndex: 9999,
        fontSize: '14px'
      }}>
        📊 Page: {page}/{totalPages || '?'} | Games: {games.length} | {loading ? '⏳ Loading...' : '✅ Ready'}
      </div>
      */}
      
      {games.map((game, index) => {
        if (games.length === index + 1) {
          return (
            <div ref={lastGameRef} key={game.id}>
              <GameCard game={game} />
            </div>
          );
        } else {
          return <GameCard key={game.id} game={game} />;
        }
      })}

      {loading && <Spinner/>}
    </div>
  );
};

export default LazyGameList;
