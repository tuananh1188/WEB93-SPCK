import styles from './styles.module.scss';

function HeaderSidebar() {
    const { container } = styles;
    return (
        <div className={container}>
            {icon}
            <div>{title}</div>
        </div>
    );
}

export default HeaderSidebar;
