import Button from '../Button/Button';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import styles from './styles.module.scss';

function CountdownBanner() {
    const {container, containerTimer, title, boxBtn} = styles;
    const targetDate = '2026-12-31T00:00:00';
  return (
    <div className={container}>
        <div className={containerTimer}>
            <CountdownTimer targetDate={targetDate} />
        </div>
        <p className={title}>The classics make a comeback</p>
        <div className={boxBtn}>
            <Button content={'Buy now'}/>
        </div>
    </div>
  )
}

export default CountdownBanner