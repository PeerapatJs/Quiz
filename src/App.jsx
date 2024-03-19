import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [poke, setPoke] = useState([]);
  const [showAllPoke, setShowAllPoke] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151');
        
        const pokeUrls = res.data.results.map(pokemon => pokemon.url);

        const pokemonPromise = pokeUrls.map(async url => {
          const pokeRes = await axios.get(url);
          return pokeRes.data;
        });

        const pokeData = await Promise.all(pokemonPromise);
        setPoke(pokeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowAllPokemon = () => {
    setShowAllPoke(true);
  };

  if (poke.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='front'>
        <h1>API</h1>
        <h1>Pokemon</h1>
        <button 
        className='front button1'onClick={handleShowAllPokemon}>Get pokemon dex</button>
        {showAllPoke && (
            <div>
            {poke.map((pokemon, index) => (
                <div className='card'>
                <div key={index}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <img src={pokemon.sprites.back_default} alt={pokemon.name} />
                <p>Name: {pokemon.name}</p>
                <ul>
                    {pokemon.types.map((type, index) => (
                    <p key={index}>Type {index + 1}: {type.type.name}</p>
                    ))}
                </ul>
                <p>Base stats:</p>
                <ul>
                    {pokemon?.stats.map((base_stat, index) => (
                    <p key={index}>{base_stat.stat.name}= {base_stat.base_stat}</p>
                    ))}
                </ul>
                </div>
                </div>
            ))}
            </div>
        )}
    </div>
  );
}

export default App
