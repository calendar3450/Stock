import {useState,useEffect} from "react"
import  {useParams} from "react-router-dom";
import styles from "./CSS/Price.module.css"

const CoinPrice= () => {
    const {market} = useParams();
    const [coinInform, setCoinInform] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=> {
        fetch(`https://api.upbit.com/v1/ticker?markets=${market}`)
        .then(response => response.json())
        .then(response => {
            setCoinInform(response);
            setLoading(false)

        })
      },[market]);

      return (
        <div>
            {loading ? null : 
            <div>
            <span className={styles.CoinName}>{coinInform[0].market} </span>
            {coinInform[0].change === "RISE" ? 
            <div>
            <span className={styles.CoinPlus}>{coinInform[0].trade_price}원 </span>
            <span className={styles.CoinPlus}>+{(coinInform[0].signed_change_rate * 100).toFixed(3)}% </span>
            <span className={styles.CoinPlus}>({coinInform[0].signed_change_price})</span>
            </div>
            :
            <div>
            <span className={styles.CoinMinus}>{coinInform[0].trade_price}원 </span>
            <span className={styles.CoinMinus}>-{(coinInform[0].signed_change_rate * 100).toFixed(3)}% </span>
            <span className={styles.CoinMinus}>({coinInform[0].signed_change_price})</span>
            </div>
          }
        </div>
        }
        
        </div>
      )
    }

    export default CoinPrice;