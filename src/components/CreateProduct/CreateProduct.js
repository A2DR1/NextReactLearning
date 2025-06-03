// import styles from './CreateProduct.module.scss';
import { Form, Input, Button } from 'antd';
import { useRouter } from 'next/router';

const CreateProduct = () => {
    const router = useRouter();

    const handleSubmit = () => {
        // console.log('Form submitted with values:', values);
        console.log(productname, price, desc, tag, img);

        // send request
        fetch('http://localhost:4000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: productname.value,
                price: price.value,
                desc: desc.value,
                img: img.value,
                tag: tag.value
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('Success:', json);
            router.push('/update');
        })
    }
    
  return (
    <div>
      <h1>Create Product</h1>
        <Form 
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={handleSubmit}
        >
            <Form.Item
                label="Product Name"
                name="productname"
                rules={[{ required: true, message: 'Please input the product name!' }]}
            >
                <Input />
            </Form.Item>
    
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <Input type="number" />
            </Form.Item>
    
            <Form.Item
                label="Description"
                name="desc"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Tag"
                name="tag"
                rules={[{ required: true, message: 'Please input the category!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Image URL"
                name="img"
                rules={[{ required: true, message: 'Please input the image URL!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Submit">
                <Button type="primary" htmlType="submit">
                    Create Product
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

export default CreateProduct;