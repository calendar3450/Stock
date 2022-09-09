import {useState,useEffect} from "react"
import ApexChart from 'react-apexcharts'
import  {useParams} from "react-router-dom";
import styles from "./CSS/Coin.module.css";
import Location from './CSS/Location.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

//코인 리스트 따로 div로 묶은 후 스크롤 따로 넣기
function MinuteBitcoin() {
    const [coins,setCoins]=useState([]);
    const [lists,setLists]=useState([]);
    const [loading,setLoading] = useState(true);
    const {market} = useParams();
    const [listLoading,setListLoading] = useState(true);

    
    useEffect(()=> {
        fetch(`https://api.upbit.com/v1/candles/minutes/1?market=${market}&count=200`)
        .then(response => response.json())
        .then(response => {
          setCoins(response);
          setLoading(false);
        })
      },[]);

    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(response => response.json())
        .then(response => {
            setLists(response);
            setListLoading(false);
        })
        },[market]);
    // window.setTimeout('window.location.reload()',60000);
   return (
    <div>
        <Link to={`/`} style={{textDecoration: 'none'}}>
            <h2 className={styles.Loading}>코인 시세를 보자구요!</h2>
        </Link>
        {loading ? (<h2 >그래프를 가져오고 있습니다.</h2>) :
        <ApexChart
        width="50%"
        type="candlestick"
        series={[
            {
                data:
                    coins.map((coin)=>{
                        return [
                            coin.timestamp,
                            coin.opening_price,
                            coin.high_price,
                            coin.low_price,
                            coin.trade_price
                        ]
                    })
                
            }
        ]}
        options={{
            title: {
                text: `${coins[0].market} 가격: ${coins[0].trade_price}`,
                align: 'left'
              },
            chart: {
                type:'candlestick',
                height:350,
                background: "transparent",
            },
            yaxis: {
                tooltip: {
                    enable: true,
                }
            },
            xaxis:{
                type: 'datetime'
            },
            plotOptions: {
                candlestick: {
                    colors:{
                        upward:'#DF7D46',
                        downward:'#3C90EB'
                    }
                }
            }
        }}
    />
        
        }

     { listLoading ? (<h3>리스트 로딩중 입니다...</h3>) :
        <span className={Location.List}>
            <ul>
            {lists.map((coin) =>(
                coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                    <li key={coin.market} className={Location.CoinList}>
                        <Link to={`/coinMonth/${coin.market}`} style={{textDecoration: 'none'}}>
                        {coin.korean_name}
                        </Link>
                    </li>
            ))}
            </ul>
        </span>
        }
    <span>
    <Link to ={`/coinMonth/${market}`} style={{textDecoration: 'none'}}>
        1달
    </Link>
    </span>
    <span>
    <Link to = {`/coinWeek/${market}`} style={{textDecoration: 'none'}}>
         1주
    </Link>
    </span>
    <span>
    <Link to ={`/coinDay/${market}`} style={{textDecoration: 'none'}}>
        1일
    </Link>
    </span>
    </div>
   )

}

MinuteBitcoin.propTypes = {
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            coin: PropTypes.number.isRequired,
        })
    ),
    lists: PropTypes.arrayOf(
        PropTypes.shape({
            coin: PropTypes.string.isRequired,
        })
    )
}

export default MinuteBitcoin;
