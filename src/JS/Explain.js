import ExplainCss from './CSS/Explain.module.css';
import { Link } from "react-router-dom";
import Explain1 from './Explain1';

const Explain = () => {
    return(
    <div>
        <div className={ExplainCss.navBar}>
            
            <div className={ExplainCss.spanNavBar}>
                <h1>Main Logo</h1>
                <span className={ExplainCss.NavBar}> 
                    <Link 
                    to={`/`}
                    style={{textDecoration: 'none', color:'black'}}
                    >
                        <a>menu1</a>
                    </Link>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu2</a>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu3</a>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu4</a>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu5</a>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu6</a>
                </span>
                <span className={ExplainCss.NavBar}> 
                    <a>menu7</a>
                </span>
            </div>
        </div>
        
        {/* 여기에 이제 설명서 넣기 */}
        <Explain1/>
    </div>
    )
}


export default Explain;