import styles from './Diagram.module.scss';

const Diagram = () => {
    return (
        <div className={styles.diagram}>
            <div className={styles.container}>
                <div className={styles.items}></div>
                <div className={styles.items}>1</div>
                <div className={styles.items}>2</div>
                <div className={styles.items}>3</div>
                <div className={styles.items}>4</div>

                <div className={styles.items}>I</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>

                <div className={styles.items}>II</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>

                <div className={styles.items}>III</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
                <div className={styles.items}>item</div>
            </div>
            <div className={styles.imageleft}></div>
            <div className={styles.imageright}></div>
        </div>
    )
}

export default Diagram;