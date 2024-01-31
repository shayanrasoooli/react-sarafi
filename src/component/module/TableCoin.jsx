import chartDown from '../../assets/chart-down.svg'
import chartUp from '../../assets/chart-up.svg'
import React from 'react'

import {marketchart} from "../../services/CryptoApi"
import {RotatingLines} from "react-loader-spinner"
import styles from "./tableCoin.module.css"


function TableCoin({coins , isLoading , setPriceSign , priceSign , setChart}) {
    
  return (
    <div className={styles.container}>
    {isLoading ? <RotatingLines strokeColor='#3874ff' strokeWidth='2'/> : (
           <table className={styles.table}>
           <thead>
               <tr>
                   <th>Coin</th>
                   <th>Name</th>
                   <th>Price</th>
                   <th>24</th>
                   <th>Total Volume</th>
                   <th></th>
               </tr>
           </thead>
   
           <tbody>
               {coins.map((coin) => 
              <TableRow coin={coin} key={coin.id} priceSign={priceSign} setPriceSign={setPriceSign} setChart={setChart} />
              )}
           </tbody>
       </table>
    )}
    
      
    </div>
  )
}

export default TableCoin

const TableRow = ({coin :{name , id , image , symbol , total_volume , current_price , price_change_percentage_24h : price_change} ,setChart , priceSign , setPriceSign }) => {
    const showHandler= async () => {
        setChart(true)
        try{
            const res = await fetch(marketchart(id))
            const json = await res.json()
            console.log(json);
            setChart(json)
        }catch (error) {
            setChart(null)
        }
    } 
    
    return(
        <tr key={id}>
        <td><div className={styles.symbol} onClick={showHandler}>
            <img src={image} alt={id}/>
            <span>{symbol.toUpperCase()}</span>
            </div></td>

            <td>{name}</td>
            <td>{current_price.toLocaleString()}</td>
           
            <td className={price_change > 0 ? styles.success : styles.error}> ${priceSign}  {price_change.toFixed(2)}</td>
            <td>{total_volume.toLocaleString()}</td>
            <td><img src={price_change > 0 ? chartUp : chartDown} alt={name} /></td>
    </tr>
    )
}

