import { TfiReload } from 'react-icons/tfi';
import HeaderSidebar from '../components/HeaderSidebar/HeaderSidebar';
import styles from './styles.module.scss';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function Compare() {
    const { container } = styles;
    return (
        <div className={container}>
            <div>
                <HeaderSidebar
                    icon={<TfiReload style={{ fontSize: '30px' }} />}
                    title='COMPARE'
                />
                <ItemProduct />
            </div>
            <div>
                <Button content={'VIEW COMPARE'} isPrimary={false} />
            </div>
        </div>
    );
}

export default Compare;
