import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import Location from './CSS/Location.module.css';
import Main from './CSS/MainColor.module.css';
import MainBitPrice from './MainBitcoin'

//실시간 가격 변동

const Home = ()=> {
    const [coins,setCoins]=useState([]);
    const [loading,isLoading]=useState(true);
    const [haveMoney, setHaveMoney] = useState(100000000);
    const [haveCoinList,setCoinList] = useState([]);

    //업비트로 리스트 뽑기.
    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(response => response.json())
        .then(response => {
          setCoins(response);
          isLoading(false); 
        }).catch(err => console.error(err));
      },[])

      return(
        <div id="Entire">
          
        <Link to='/' style={{textDecoration: 'none'}}>
        <a className={Main.Main}>코인 시세를 보자구요!</a>
        </Link>
        <p/>

        {/* 메인 코인 가격 창 */}
        
        <div className={Main.MainCoinNCoinList}>

          <MainBitPrice/>

        <div className={Location.List}>
          {loading ? (<h2>로딩중 입니다.....</h2>) :
          <div className={Main.MainCoinList}>
            {coins.map((coin)=> (
              coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                <div key={coin.market} className={Main.MainCoins}>

                  <Link to={`/coinMonth/${coin.market}`} 
                        style={{textDecoration: 'none'}} 
                        state={{money: haveMoney,
                        haveCoin : haveCoinList}}
                        >
                    <a className={Main.Coin}>{coin.korean_name}</a>
                      </Link>

                  </div>
            ))}
            </div>
}
        </div>
        </div>
        </div>
        
      )
}

export default Home