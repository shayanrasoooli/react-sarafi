import React, { useEffect, useState } from 'react';
import TableCoin from '../module/TableCoin';
import {getCoinList} from "../../services/CryptoApi";
import Pagination from "../module/Pagination";

function HomePage() {
    const [coins , setCoins] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const  [page , setPage] = useState(1);


    useEffect(() => {
        setIsLoading(true)
        const getCoin = async () => {
            const res = await fetch(getCoinList(page))
            const json = await res.json()
            setCoins(json)
            setIsLoading(false);

        }
        getCoin();
      
    } , [page])



    return (
        <>
        <Pagination page={page} setPage={setPage}/>
        <TableCoin  coins={coins} isLoading={isLoading}/>
        </>

  )
}

export default HomePage