import React from 'react'

function Search({currency , setCurrency}) {
  return (
    <>
    <input type="text" />
    <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
    </select>
    
    
    
    
    </>
  )
}

export default Search