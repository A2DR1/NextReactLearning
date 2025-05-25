import Layout from '@/components/Layout';
import { Typography } from 'antd';
import ContactForm from '@/components/ContactForm';
import GoogleMap from '@/components/GoogleMap';

const { Title } = Typography;

const ContactPage = () => {
    return (
        <Layout>
            <ContactForm />
            <hr />
            <GoogleMap />
        </Layout>
    )
}
export default ContactPage;