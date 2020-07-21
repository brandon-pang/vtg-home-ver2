import React from 'react';

// conditional ternary expression
const GameContents = ({ genre, features, releaseDate, developer, publisher }) => {
  return (
    <div className="modal_game_contents_wrapper">
      {
        genre ? 
          <div className="game_genre">
            <p className="genre--title">GENRE:</p>
            <p className="genre--desc">{genre}</p>
          </div> 
          : null
      }
      {
        features ?
        <div className="game_features">
          <p className="features--title">FEATURES:</p>
          <p className="features--desc">{features}</p>
        </div>
        : null
      }
      {
        releaseDate ?
        <div className="game_release_date">
          <p className="release_date--title">RELEASE DATE:</p>
          <p className="release_date--desc">{releaseDate}</p>
        </div>
        : null
      }
      {
        developer ?
        <div className="game_developer">
          <p className="developer--title">DEVELOPER:</p>
          <p className="developer--desc">{developer}</p>
        </div>
        : null
      }
      {
        publisher ?
        <div className="game_publisher">
          <p className="publisher--title">PUBLISHER:</p>
          <p className="publisher--desc">{publisher}</p>
        </div>
        : null
      }
      
  </div>
  )
}

export default GameContents;