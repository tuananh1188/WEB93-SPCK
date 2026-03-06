import styles from './styles.module.scss';
import logo from '@images/Logo-retina.webp';
import { dataMenu } from './contanst';

function MyFooter() {
    const { container, boxNav } = styles;
    return (
        <div className={container}>
            <div>
                <img src={logo} alt='' width={160} height={55} />
            </div>
            <div className={boxNav}>
                {dataMenu.map((item, index) => {
                    return <div key={index}>{item.content}</div>;
                })}
            </div>
            <div style={{textAlign:"center"}}>
                <p>Guaranteed safe ckeckout</p>
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/elementor/thumbs/Icons-123-pzks3go5g30b2zz95xno9hgdw0h3o8xu97fbaqhtb6.png'
                    alt=''
                />
            </div>
            <div>
                Copyright © 2024 XStore theme. Created by 8theme – WordPress
                WooCommerce themes.
            </div>
        </div>
    );
}

export default MyFooter;
