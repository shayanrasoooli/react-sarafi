import React, { useEffect, useState } from 'react';
import TableCoin from '../module/TableCoin';
import {getCoinList} from "../../services/CryptoApi";
import Pagination from "../module/Pagination";
import Search from '../module/Search';

function HomePage() {
    const [coins , setCoins] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const  [page , setPage] = useState(1);
    const  [currency , setCurrency] = useState("usd");
    const  [priceSign , setPriceSign] = useState("");

 

    useEffect(() => {


        
        setIsLoading(true);
        const getCoin = async () => {
            try{
            const res = await fetch(getCoinList(page , currency))
            const json = await res.json()
            setCoins(json)
            setIsLoading(false);
        }catch (error){
            console.log(error);
        }
        }
        getCoin();
      
    } , [page , currency])



    return (
        <>
        <Search currency={currency} setCurrency={setCurrency} priceSign={priceSign} setPriceSign={setPriceSign}/>
        <TableCoin  coins={coins} isLoading={isLoading} priceSign={priceSign} setPriceSign={setPriceSign}/>
        <Pagination page={page} setPage={setPage}/>
        </>

  )
}

export default HomePage