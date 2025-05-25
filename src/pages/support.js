import Layout from '@/components/Layout';
import { Typography } from 'antd';
import Accordion from '@/components/Accordion';

const { Title } = Typography;

const SupportPage = () => {
    return (
        <Layout>
            <Title>The Support Page</Title>
            <Accordion />
        </Layout>
    )
}
export default SupportPage;