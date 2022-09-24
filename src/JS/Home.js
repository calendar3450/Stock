import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import Location from './CSS/Location.module.css';
import Main from './CSS/MainColor.module.css';

function Home() {
    const [coins,setCoins]=useState([]);
    const [loading,isLoading]=useState(true);
    const [paprikaLoading,isPaprikaLoading]=useState(true);
    const [paprikaCoin,setpaprikaCoin]=useState([]);
    const [totalMoney,setTotalMoney]=useState(100000000);
    const [haveCoin]=useState([]);

    //업비트로 리스트 뽑기.
    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(response => response.json())
        .then(response => {
          setCoins(response);
          isLoading(false);
        })
      },[])
    //파프리카로 주요 코인 가격 보기.
    useEffect(() => {
      fetch('https://api.coinpaprika.com/v1/tickers?quotes=KRW')
      .then(response => response.json())
        .then(response => {
          setpaprikaCoin(response);
          isPaprikaLoading(false);
    })
  },[])

      return(
        <div className={Main.Entire}>
        <Link to='/' style={{textDecoration: 'none'}}>
        <a className={Main.Main}>코인 시세를 보자구요!</a>
        </Link>
        <p/>
        
        <div className={Main.MainCoinNCoinList}>
          {paprikaLoading ? (<h2>로딩중 입니다...</h2>):
          <div className={Main.MainCoinsCollection}>
          <h1 className={Location.MainCoin}>주요 코인 시세 24H</h1>
          <h2 className={Location.MainCoin}>BitCoin,비트코인: {paprikaCoin[0].quotes.KRW.percent_change_24h}%</h2>
          <h3 className={Location.MainCoin}>시세:{Math.ceil(paprikaCoin[0].quotes.KRW.price).toLocaleString()}\</h3>
          <h2 className={Location.MainCoin}>Ethereum,이더리움: {paprikaCoin[1].quotes.KRW.percent_change_24h}%</h2>
          <h3 className={Location.MainCoin}>시세:{Math.ceil(paprikaCoin[1].quotes.KRW.price).toLocaleString()}\</h3>
          <h2 className={Location.MainCoin}>Ripple 리플: {paprikaCoin[6].quotes.KRW.percent_change_24h}%</h2>
          <h3 className={Location.MainCoin}>시세:{Math.ceil(paprikaCoin[6].quotes.KRW.price).toLocaleString()}\</h3>
          </div>
          }
        <div className={Location.List}>
          {loading ? (<h2>로딩중 입니다.....</h2>) :
          <div className={Main.MainCoinList}>
            {coins.map((coin)=> (
              coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                <div key={coin.market} className={Main.MainCoins}>
                  <Link to={`/coinMonth/${coin.market}`} style={{textDecoration: 'none'}}>
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