import styles from './Banner.module.scss';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Banner = ({ bannerContent }) => {
    const { title, text } = bannerContent;
    return (
        <div className={styles.banner}>
            <Title>{title}</Title>
            <Paragraph>{text}</Paragraph>
        </div>
    )
}

export default Banner;