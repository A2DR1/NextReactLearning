import { Form, Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout'; // Adjust the import path as needed

const AdminPage = () => {
    const router = useRouter();
    // const [passwordVisible, setPasswordVisible] = useState(false);

    const handleSubmit = (values) => {
        console.log('Form Values:', values);
        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle successful login, e.g., redirect to dashboard
                if (!data.message) {
                    const { _id, username } = data;
                    sessionStorage.setItem('user', JSON.stringify({ _id, username }));
                    router.push('/update'); // Adjust the path as needed
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, e.g., show notification
            });
    };

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('user');
        if (isLoggedIn) {
            // Redirect to dashboard or home page if already logged in
            // Adjust the path as needed
            router.push('/update');
        }
    }, []);

    return (
        <div>
            <Layout>
            <h1>Admin Page</h1>
            <Form
                name="adminForm"
                // layout="vertical"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                style={{ maxWidth: 600, margin: '0 auto' }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            </Layout>
        </div>
    );
}

export default AdminPage;