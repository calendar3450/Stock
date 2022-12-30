import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import Location from './CSS/Location.module.css';
import Main from './CSS/MainColor.module.css';
//실시간 가격 변동

const Home = ()=> {
    const [coins,setCoins]=useState([]);
    const [loading,isLoading]=useState(true);
    const [haveMoney, setHaveMoney] = useState(100000000);
    const [coinBTC,setBTC] = useState([]);
    const [coinETH,setETH] = useState([]);
    const [coinXRP,setXRP] = useState([]);
    const [bitLoading,isBitLoading]= useState(true);
    const [ethLoading,isEthLoading]= useState(true);
    const [xrpLoading,isXrpLoading]= useState(true);
    const [haveCoinList,setCoinList] = useState([]);

    //업비트로 리스트 뽑기.
    useEffect(()=> {
        fetch('https://api.upbit.com/v1/market/all')
        .then(response => response.json())
        .then(response => {
          setCoins(response);
          isLoading(false); 
        })
      },[])

    //업비트로 비트코인 가격 보기.
    useEffect(() =>{
      fetch(`https://api.upbit.com/v1/trades/ticks?market=KRW-BTC&count=1`)
      .then(response => response.json())
      .then(response => {
        setBTC(response);
        isBitLoading(false);
      })
    },[])

    //업비트로 이더리움 가격 보기.
    useEffect(() =>{
      fetch(`https://api.upbit.com/v1/trades/ticks?market=KRW-ETH&count=1`)
      .then(response => response.json())
      .then(response => {
        setETH(response);
        isEthLoading(false);
      })
    },[])

    //업비트로 리플 가격 보기.
    useEffect(() =>{
      fetch(`https://api.upbit.com/v1/trades/ticks?market=KRW-XRP&count=1`)
      .then(response => response.json())
      .then(response => {
        setXRP(response);
        isXrpLoading(false);
      })
    },[])
      return(
        <div className={Main.Entire}>
        <Link to='/' style={{textDecoration: 'none'}}>
        <a className={Main.Main}>코인 시세를 보자구요!</a>
        </Link>
        <p/>
        <div className={Main.MainCoinNCoinList}>
          {bitLoading || ethLoading || xrpLoading ? (<h2>로딩중 입니다...</h2>):
          <div className={Main.MainCoinsCollection}>
          <h1 className={Location.MainCoin}>주요 코인 시세 24H</h1>
          <h2 className={Location.MainCoin}>BitCoin,비트코인: {(coinBTC[0].change_price /coinBTC[0].prev_closing_price *100).toFixed(2)}%</h2>
          <h3 className={Location.MainCoin}>시세:{coinBTC[0].trade_price.toLocaleString()}\</h3>
          <h2 className={Location.MainCoin}>Ethereum,이더리움: {(coinETH[0].change_price /coinETH[0].prev_closing_price *100).toFixed(2)}%</h2>
          <h3 className={Location.MainCoin}>시세:{coinETH[0].trade_price.toLocaleString().toLocaleString()}\</h3>
          <h2 className={Location.MainCoin}>Ripple 리플: {(coinXRP[0].change_price /coinXRP[0].prev_closing_price *100).toFixed(2)}%</h2>
          <h3 className={Location.MainCoin}>시세:{coinXRP[0].trade_price.toLocaleString().toLocaleString()}\</h3>
          </div>
          }
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