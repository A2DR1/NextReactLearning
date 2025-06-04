import styles from './ContactFormAntd.module.scss';
import { Input, Button, Form, Typography } from 'antd';

const ContactFormAntd = () => {
    const { TextArea } = Input;
    const { Title } = Typography;
    const [form] = Form.useForm();

    const handleSubmit = (e) => {
        // TODO: Add form submission logic
        const { username, email, phone, subject } = e;
        console.log('Form submitted with values:', {
            username,
            email,
            phone,
            subject
        });

        fetch('http://localhost:4000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email,
                phone,
                subject
            })
        }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
            // Optionally reset the form
            form.resetFields();
            alert('Form submitted');
        }).catch(error => {
            console.error('Error:', error);
        }
        )
    }


    return (
        <div className={styles.contactForm}>
            <Title level={2}>Contact Us</Title>
            <Form
                name="contact_form"
                onFinish={handleSubmit}
                // layout="vertical"
                form={form}
            >
                <div className={styles.form}>
                    <div className={styles.userInfo}>
                        <Form.Item
                            label="Name"
                            name="username"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[{ required: true, message: 'Please input the subject!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className={styles.message}>
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: 'Please input your message!' }]}
                        >
                            <TextArea rows={13} />
                        </Form.Item>
                    </div>
                </div>
                <div className={styles.submit}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.button}>
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}
export default ContactFormAntd;