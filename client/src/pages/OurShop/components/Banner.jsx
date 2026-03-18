import styles from '../styles.module.scss';
import CountdownTimer from '../../../components/CountdownTimer/CountdownTimer';
import Button from '../../../components/Button/Button';

function Banner() {
    const { containerBanner, contentBox, title, boxBtn, coutdownBox } = styles;

    const targetDate = '2026-12-31T00:00:00';
    return (
        <>
            <div className={containerBanner}>
                <div className={contentBox}>
                    <div className={coutdownBox}>
                        <CountdownTimer targetDate={targetDate} />
                    </div>
                    <div className={title}>The Classics Make A Comeback</div>
                    <div className={boxBtn}>
                        <Button content='Buy Now' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
