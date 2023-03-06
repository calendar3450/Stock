import style from './CSS/NotFound.module.css';
import Test from './MainBitcoin'

const NotFound=()=> {
    return(
        <div>
            <h1 className={style.Error}>404 Error</h1>
            <Test/>
        </div>
    )
}

export default NotFound;