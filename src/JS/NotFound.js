import style from './CSS/NotFound.module.css';
import { useNavigate } from 'react-router-dom';

const NotFound=()=> {
    return(
        <div>
            <h1 className={style.Error}>404 Error</h1>
        </div>
    )
}

export default NotFound;