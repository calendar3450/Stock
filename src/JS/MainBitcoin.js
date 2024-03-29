import {useState,useEffect} from 'react';
import Main from './CSS/MainColor.module.css';
import Location from './CSS/Location.module.css';

const MainBitcoin = () => {
    const [coinBTC,setBTC] = useState([]);
    const [coinETH,setETH] = useState([]);
    const [coinXRP,setXRP] = useState([]);
    const [bitLoading,isBitLoading]= useState(true);
    const [ethLoading,isEthLoading]= useState(true);
    const [xrpLoading,isXrpLoading]= useState(true);

    useEffect(() =>{
        fetch(`https://api.upbit.com/v1/trades/ticks?market=KRW-BTC&count=1`)
        .then(response => response.json())
        .then(response => {
          setBTC(response);
          isBitLoading(false);
        })
      },[]);

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

      return (

        <div className={Main.MainCoinsCollection}>
            {bitLoading || ethLoading || xrpLoading ? (<h2>로딩중 입니다...</h2>):
          <div>
        
            {coinBTC[0].change_price /coinBTC[0].prev_closing_price *100 < 0 ? 
            <div>
            <h2 className={Location.MainCoin}>BitCoin,비트코인: {(coinBTC[0].change_price /coinBTC[0].prev_closing_price *100).toFixed(2)}%</h2>
            <h3 className={Location.MainCoin}>시세:{coinBTC[0].trade_price.toLocaleString()}원</h3>
            </div>
             :
            <div>
            <h2 className={Location.MainCoin}>BitCoin,비트코인: +{(coinBTC[0].change_price /coinBTC[0].prev_closing_price *100).toFixed(2)}%</h2>
            <h3 className={Location.MainCoin}>시세:{coinBTC[0].trade_price.toLocaleString()}원</h3>
            </div>
            }
           
          
          {(coinETH[0].change_price /coinETH[0].prev_closing_price *100) < 0 ?
            <div>
              <h2 className={Location.MainCoin}>Ethereum,이더리움: {(coinETH[0].change_price /coinETH[0].prev_closing_price *100).toFixed(2)}%</h2>
              <h3 className={Location.MainCoin}>시세:{coinETH[0].trade_price.toLocaleString().toLocaleString()}원</h3>
            </div>
            :
            <div>
              <h2 className={Location.MainCoin}>Ethereum,이더리움: +{(coinETH[0].change_price /coinETH[0].prev_closing_price *100).toFixed(2)}%</h2>
              <h3 className={Location.MainCoin}>시세:{coinETH[0].trade_price.toLocaleString().toLocaleString()}원</h3>
            </div>
            }
          {(coinXRP[0].change_price /coinXRP[0].prev_closing_price *100) < 0 ?
          <div>
            <h2 className={Location.MainCoin}>Ripple 리플: {(coinXRP[0].change_price /coinXRP[0].prev_closing_price *100).toFixed(2)}%</h2>
            <h3 className={Location.MainCoin}>시세:{coinXRP[0].trade_price.toLocaleString().toLocaleString()}원</h3>
          </div> 
          :
          <div>
            <h2 className={Location.MainCoin}>Ripple 리플: +{(coinXRP[0].change_price /coinXRP[0].prev_closing_price *100).toFixed(2)}%</h2>
            <h3 className={Location.MainCoin}>시세:{coinXRP[0].trade_price.toLocaleString().toLocaleString()}원</h3>
          </div>
        }

          </div>
          }
            
        </div>
      );
};

export default MainBitcoin