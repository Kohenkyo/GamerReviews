import React from "react";
import GameCard from "../gamecard/GameCard.jsx";

const SearchList = ({ games = [] }) => (
  <div className="games-container">
    {games.map(game => (
      <GameCard key={game.id} game={game} />
    ))}
  </div>
);

export default SearchList;
