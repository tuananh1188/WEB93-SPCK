import Button from '../Button/Button';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const { container, content, title, des } = styles;
    const navigate = useNavigate();
    const handleNavigateToShop = () => {
        navigate('/shop');
    };
    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>XStore Marseille04 Demo</h1>
                <div className={des}>
                    Make yours celebrations even more special this years with
                    beautiful.
                </div>
                <div style={{ width: '174px' }}>
                    <Button
                        content={'Go to shop'}
                        onClick={handleNavigateToShop}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
