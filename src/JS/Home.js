import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import Location from './CSS/Location.module.css';
import Color from './CSS/MainColor.module.css';

//검색칸 꾸미기, 메인페이지 코인칸 테이블이 아닌 div로 바꾸기
function Home() {
    const [coins,setCoins]=useState([]);
    const [loading,isLoading]=useState(true);
    const [paprikaLoading,isPaprikaLoading]=useState(true);
    const [search,setSearch]=useState('');
    const [paprikaCoin,setpaprikaCoin]=useState([])
    const onChangeSearch = (e)=>{
      setSearch(e.target.value);
    }
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
        <div>
        <Link to='/' style={{textDecoration: 'none'}}>
        <a className={Location.Main}>코인 시세를 보자구요!</a>
        </Link>
        <p/>

          {paprikaLoading ? (<h2>로딩중 입니다...</h2>):
          <div>
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
          <input
            type='text'
            placeholder="검색 할 코인"
            onChange={onChangeSearch}
            value={search}
            className={Location.Search}
          />
          {loading ? (<h2>로딩중 입니다.....</h2>) :
          <div className={Color.MainCoinList}>
            {coins.map((coin)=> (
              coin.market.includes('BTC-') || coin.market.includes('USDT-') ? null :
                search==='' ?
                <div key={coin.market}>
                  <Link to={`/coinMonth/${coin.market}`} style={{textDecoration: 'none'}}>
                        {coin.english_name},{coin.korean_name}
                      </Link>
                  </div>
                  :
                  search.includes(`${coin.english_name}`) || search.includes(`${coin.korean_name}`) ?
                  <div>
                    <Link to={`/coinMonth/${coin.market}`} style={{textDecoration: 'none'}}>
                      {coin.english_name},{coin.korean_name}
                    </Link>
                  </div>
                  :
                  null
            ))}
            </div>
}
        </div> 

        </div>
      )
}

export default Home