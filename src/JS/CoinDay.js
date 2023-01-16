import {useState,useEffect} from "react"
import ApexChart from 'react-apexcharts'
import  {useParams,useLocation} from "react-router-dom";
import styles from "./CSS/Coin.module.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import CoinPrice from "./CoinPrice";

const DayBitcoin = () => {
    const [coins,setCoins]=useState([]);
    const [lists,setLists]=useState([]);
    const [loading,setLoading] = useState(true);
    const {market} = useParams();
    const [listLoading,setListLoading] = useState(true);
    const location = useLocation();
    const [haveMoney,setHaveMoney] = useState(location.state.money);
    const [coinCount,setCoinCount] = useState(0);

    useEffect(()=> {
        fetch(`https://api.upbit.com/v1/candles/days?market=${market}&count=200`)
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
                // haveMoney = haveMoney-(coins[0].trade_price*coinCount);
                console.log(haveMoney);
            }
        }
        
    }
    //입력창에 코인 갯수 넣기.
    const CoinOnChange = (e) => {
        setCoinCount(e.target.value);
    }

   return (
    <div className={styles.Entire}>
        {loading ? (<h2>로딩중 입니다.</h2>) :
    <div className={styles.centerSquare}>
        <Link to={`/`} style={{textDecoration: 'none'}}>
            <a className={styles.Main}>코인 시세를 보자구요!</a>
        </Link>

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
                text: ` `,
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
    <p/>
    <span>
    <Link to ={`/coinMonth/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1달 </button>
    </Link>
    </span>
    <span>
    <Link to = {`/coinWeek/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1주 </button>
    </Link>
    </span>
    <span>
    <Link to ={`/coinMinute/${market}`} state={{money: haveMoney}}>
        <button className={styles.ChangePeriod}> 1분 </button>
    </Link>

    <br/>
    <h3>지금 가지고 있는돈: {Math.ceil(haveMoney).toLocaleString()}\</h3>
    <input type='number'
     placeholder="몇개의 코인을 사실껀가요?" 
     onChange={CoinOnChange}
     className={styles.coinInput}
     />

    <button onClick = {onclick}
    className={styles.buyButton}>사기</button>

    </span>
    </div>
}
    <div className={styles.List}>
        {/* <a className={Location.ListTop}>코인 리스트</a> */}
          {listLoading ? (<h2>로딩중 입니다.....</h2>) :
          <div className={styles.MainCoinList}>
            {lists.map((coin)=> (
              coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                <div key={coin.market} className={styles.MainCoins}>
                  <Link to={`/coinDay/${coin.market}`} 
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

//typeScript 제대로 배우면 지워야징~
DayBitcoin.propTypes = {
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
export default DayBitcoin;
