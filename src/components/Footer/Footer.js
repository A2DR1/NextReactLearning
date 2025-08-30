import styles from './Footer.module.scss';
import { Typography } from 'antd';
import { LinkedinOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Footer = () => {
    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/austin-shen-b97a06247', '_blank');
    };

    const handleTwitter = () => {
        window.open('https://x.com/A2DR17', '_blank');
    };

    const handleEmail = () => {
        window.open('mailto:austinszj@gmail.com', '_blank');
    };

    return (
        <div className={styles.footer}>
            <div className={styles.leftSection}>
                <Title className={styles.title}>Austin Shen</Title>
                <Paragraph className={styles.description}>
                    Student at University of Michigan<br/>
                    Graduating in May 2027<br/>
                    Double Major: Data Science, Mathematics<br/>
                    AI/ML • SDE
                </Paragraph>
                <Paragraph className={styles.contactInfo}>
                    <div>📍 Ann Arbor, MI</div>
                    <div>📧 austinszj@gmail.com</div>
                    <div>🎓 University of Michigan</div>
                </Paragraph>
            </div>
            <Paragraph className={styles.middleLine}></Paragraph>
            <div className={styles.rightSection}>   
                <Title className={styles.title}>Connect With Me</Title>
                <div className={styles.socialIcons}>
                    <LinkedinOutlined 
                        className={styles.icon} 
                        onClick={handleLinkedIn}
                        title="Connect on LinkedIn"
                    />
                    <TwitterOutlined 
                        className={styles.icon} 
                        onClick={handleTwitter}
                        title="Follow on X (Twitter)"
                    />
                    <MailOutlined 
                        className={styles.icon} 
                        onClick={handleEmail}
                        title="Send me an email"
                    />
                </div>
            </div>
        </div>
    )
}

export default Footer;