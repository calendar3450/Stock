import {useState,useEffect} from "react"
import  {useParams} from "react-router-dom";

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
            <span>{coinInform[0].market} </span>
            <span>{coinInform[0].trade_price}\ </span>
            <span>{(coinInform[0].signed_change_rate * 100).toFixed(3)}% </span>
            <span>({coinInform[0].signed_change_price})</span>
        </div>
        }
        </div>
      )
    }

    export default CoinPrice;