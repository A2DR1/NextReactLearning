import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import GoogleMap from '@/components/GoogleMap';

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