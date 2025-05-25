import styles from './GoogleMap.module.scss';
import { Typography } from 'antd';

const { Title } = Typography;

const GoogleMap = () => {
    return (
        <div className={styles.googleMap}>
            <Title>Google Map</Title>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11808.258457596867!2d-83.7434116224597!3d42.27714405554642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883cae38e7de1701%3A0x5ba14e5178e997e3!2sUniversity%20of%20Michigan!5e0!3m2!1sen!2sus!4v1748134304904!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default GoogleMap;