import React, { useState } from 'react';
import styles from "../module/chart.module.css";
import {ConvertData} from '../../helper/ConvertData';

function chart({chart , setChart}) {
  const [type , setType] = useState('market-cap') 
  console.log(ConvertData(chart  , type));
  return (
    <div className={styles.container}>
        <span className={styles.cross} onClick={() => setChart(null)}>x</span>
        <div className={styles.chart}></div>
    </div>
  )
}

export default chart