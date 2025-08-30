import styles from './Banner.module.scss';
import { Typography } from 'antd';
import { Image } from 'antd';

const { Title, Paragraph } = Typography;

const Banner = ({ bannerContent }) => {
    const { title, subtitle, text, image } = bannerContent;
    return (
        <div className={styles.banner}>
            <Title>{title}</Title>
            <div className={styles.contentSection}>
                <div className={styles.imageContainer}>
                    <Image 
                    width={350}
                    src={image}
                    alt='pic'  
                    preview={{
                        src: image,
                    }}
                    className={styles.profileImage}/>
                </div>
                <div className={styles.textContent}>
                    <Title level={3}>{subtitle}</Title>
                    <Paragraph>
                        {text.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < text.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </Paragraph>
                </div>
            </div>
        </div>
    )
}

export default Banner;