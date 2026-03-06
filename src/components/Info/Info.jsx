import MainLayout from '@components/Layout/Layout';
import { dataInfo } from './contants';
import InfoCard from './InfoCard/InfoCard';
import styles from './styles.module.scss';

function Info() {
    const { container } = styles;
    return (
        <div>
            <MainLayout>
                <div className={container}>
                    {dataInfo.map((item, index) => {
                        return (
                            <InfoCard
                                content={item.content}
                                description={item.description}
                                src={item.src}
                                key={index}
                            />
                        );
                    })}
                </div>
            </MainLayout>
        </div>
    );
}

export default Info;
