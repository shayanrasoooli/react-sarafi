import React, { useEffect, useState } from 'react';
import { searchCoin } from '../../services/CryptoApi';
import { RotatingLines } from 'react-loader-spinner';

import styles from './search.module.css'

function Search({ currency, setCurrency , priceSign , setPriceSign}) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) {
      setCoins([]);
      setIsLoading(false)
      return;
    }
    setIsLoading(true)
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
        setIsLoading(false)
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    search();

    return () => controller.abort();
  }, [text]);

  const selectHandler = (event) => {
    setCurrency(event.target.value);
  
    const selectedValue = event.target.value

    if(selectedValue == 'usd'){
      setPriceSign("$")
    }else if(selectedValue == 'eur'){
      setPriceSign("€")
    }else if(selectedValue == 'jpy'){
      setPriceSign("¥")
    }
  }

  return (
    <div className={styles.searchbox}>
      <input type="text" placeholder='search' value={text} onChange={(e) => setText(e.target.value)} />
      <select value={currency} onChange={selectHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>  
      </select>

      {(!!coins.length || isLoading) && (
        <div className={styles.searchresult}>
        {isLoading && <RotatingLines width='50px' height='50px' strokeWidth='2' strokeColor='#3874ff' />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
