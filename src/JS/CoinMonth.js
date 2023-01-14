import {useState,useEffect} from "react"
import ApexChart from 'react-apexcharts'
import  {useParams,useLocation} from "react-router-dom";
import styles from "./CSS/Coin.module.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Transaction from "./Transaction";
import CoinPrice from "./CoinPrice";

const MonthBitcoin = () => {
    const [coins,setCoins]=useState([]);
    const [lists,setLists]=useState([]);
    const [loading,setLoading] = useState(true);
    const {market} = useParams();
    const [listLoading,setListLoading] = useState(true);
    const location = useLocation();
    const [haveMoney,setHaveMoney] = useState(location.state.money);
    const [coinCount,setCoinCount] = useState(0);
    const [haveCoinList,setCoinList] = useState(location.state.haveCoin);

    useEffect(()=> {
        fetch(`https://api.upbit.com/v1/candles/months?market=${market}&count=200`)
        .then(response => response.json())
        .then(response => {
          setCoins(response);
          setLoading(false);
        })
      },[market]);

    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(response => response.json())
        .then(response => {
          setLists(response);
          setListLoading(false);
        })
      },[market]);
    
    const onclick = () => {
        if (coinCount<0){
            alert('코인 개수를 0개 이상으로 해주세요');

        }
        else{
            if (haveMoney-(coins[0].trade_price*coinCount)<0) {
                alert('돈이 부족합니다.');
            }
            else {
                setHaveMoney(haveMoney-(coins[0].trade_price*coinCount))
                setCoinList([...haveCoinList,{id:1,이름:market,갯수:coinCount}])
                console.log(haveCoinList);
            }
        }
        
    }
    //입력창에 코인 갯수 넣기.
    const CoinOnChange = (e) => {
        setCoinCount(e.target.value);
        console.log(haveCoinList,market);
    }

   return (
    
    <div className={styles.Entire}>
    
        {loading ? (<h2>로딩중 입니다.</h2>) :
        
    <div className={styles.centerSquare}>
        

        <Link to={`/`} style={{textDecoration: 'none'}}>
            <a className={styles.Main}>코인 시세를 보자구요!</a>
        </Link>
    <div>
        
        <span>

        <CoinPrice/>

        <ApexChart
        className={styles.Graph}
        width="250%"
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
                text:"",
                align: 'left'
              },
            chart: {
                type:'candlestick',
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
            //음봉 양봉 색깔 변화하게 하기 
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

      </span>  
    <span>
    <p/>
    <Link to ={`/coinWeek/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1주 </button>
    </Link>
    </span>
    <span>
    <Link to = {`/coinDay/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1일 </button>
    </Link>
    </span>
    <span>
    <Link to ={`/coinMinute/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1분 </button>
    </Link>
    <br/>
    
    <h3>지금 가지고 있는돈: {Math.ceil(haveMoney).toLocaleString()}원</h3>
    <input 
    type='number' 
    placeholder="몇개의 코인을 사실껀가요?"
    onChange={CoinOnChange}
    className={styles.coinInput}
    />
    <button 
    onClick = {onclick}
    className={styles.buyButton}
    >사기</button>

    </span>

    {/* <Transaction/> */}

    

    </div>
    </div>
}
    <div className={styles.List}>

          {listLoading ? (<h2>로딩중 입니다.....</h2>) :
          <div className={styles.MainCoinList}>
            {lists.map((coin)=> (
              coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                <div key={coin.market} className={styles.MainCoins}>

                  <Link to={`/coinMonth/${coin.market}`} 
                        style={{textDecoration: 'none'}} 
                        state={{money: haveMoney}}>
                    <a className={styles.Coin}>{coin.korean_name}</a>
                      </Link>
                  </div>
            ))}
            </div>
}
        </div>
        
    </div>
    
   )

}

MonthBitcoin.propTypes = {
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


export default MonthBitcoin;
