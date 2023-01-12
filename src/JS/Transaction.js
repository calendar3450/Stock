import {useState,useEffect} from "react"
import  {useParams,useLocation} from "react-router-dom";

const Transaction = () =>{
    const [TransactionList,setTransactionList] = useState([]);
    const [loading,setLoading] = useState(true);
    const {market} = useParams();

    useEffect(()=> {
        fetch(`https://api.upbit.com/v1/orderbook?markets=${market}`)
        .then(response => response.json())
        .then(response => {
            setTransactionList(response);
            setLoading(false);
        })
      },[market]);
    
    
      return (
        <div>
        </div>
      );
}

export default Transaction;