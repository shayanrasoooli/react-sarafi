import React, { useEffect, useState } from 'react';
import { searchCoin } from '../../services/CryptoApi';

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) {
      setCoins([]);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), { signal: controller.signal });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins); // Update state with json.coins, not the entire json object
          console.log(json.coins); // Use json.coins to log the updated state
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    search();

    return () => controller.abort();
  }, [text]);

  return (
    <>
      <input type="text" placeholder='search' value={text} onChange={(e) => setText(e.target.value)} />
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      <div>
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              <img src={coin.thumb} alt={coin.name} />
              <p>{coin.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Search;
