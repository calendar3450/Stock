import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MonthBitcoin from "./CoinMonth";
import Home from"./Home";
import MinuteBitcoin from "./CoinMinute";
import WeekBitcoin from "./CoinWeek";
import DayBitcoin from "./CoinDay";

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coinMonth/:market' element={<MonthBitcoin/>}/>
        <Route path='/coinMinute/:market' element={<MinuteBitcoin/>}/>
        <Route path='/coinWeek/:market' element={<WeekBitcoin/>}/>
        <Route path='/coinDay/:market' element={<DayBitcoin/>}/>
      </Routes>
    </Router>
  )

}
export default App;
