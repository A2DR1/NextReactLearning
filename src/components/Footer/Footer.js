import styles from './Footer.module.scss';
import { Typography } from 'antd';
import { FacebookOutlined, GoogleOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.leftSection}>
                <Title className={styles.title}>Title</Title>
                <Paragraph className={styles.links}>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                </Paragraph>
            </div>
            <Paragraph className={styles.middleLine}></Paragraph>
            <div className={styles.rightSection}>   
                <Title className={styles.title}>Title</Title>
                <div className={styles.sharingIcons}>
                    <FacebookOutlined className={styles.icon}/>
                    <GoogleOutlined className={styles.icon}/>
                    <LinkedinOutlined className={styles.icon}/>
                    <InstagramOutlined className={styles.icon}/>
                </div>
            </div>
        </div>
    )
}

export default Footer;