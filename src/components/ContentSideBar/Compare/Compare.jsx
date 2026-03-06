import { TfiReload } from 'react-icons/tfi';
import HeaderSidebar from '../components/HeaderSidebar/HeaderSidebar';
import styles from './styles.module.scss';

function Compare() {
    const {container} = styles ;
    return (
        <div className={container}>
            <HeaderSidebar icon={<TfiReload />} title='Compare' />
        </div>
    );
}

export default Compare;
