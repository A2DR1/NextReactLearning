import { use, useEffect, useState } from "react";
import { Image, Form, Input, Button, Pagination } from "antd";
import styles from './UpdateProduct.module.scss';
import { set } from "rc-util";

const UpdateProduct = () => {

    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productsToShow, setProductsToShow] = useState(null);
    const [elementIdx, setElementIdx] = useState(0);
    const {useForm} = Form;
    const numberOfProducts = 3; // Assuming you have 3 products for pagination
    const [form] = useForm();

    useEffect(() => {
        fetch('https://serverlearning-1.onrender.com/products')
        .then(response => response.json())
        .then(json => {
            console.log('Success:', json);
            setProducts(json);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [selectedProduct]);

    // useEffect to set productsToShow based on products and numberOfProducts
    useEffect(() => {
        if (products && (!productsToShow || productsToShow.length === 0)) {
            setProductsToShow(products.slice(0, numberOfProducts));
        }
    }, [products, productsToShow, numberOfProducts]);

    useEffect(() => {
        if (selectedProduct) {
            form.setFieldsValue({
                productname: selectedProduct.name,
                price: selectedProduct.price,
                desc: selectedProduct.desc,
                img: selectedProduct.img,
                tag: selectedProduct.tag
            });
        }
    }
    , [selectedProduct, form]);

    const fetchProducts = () => {
        fetch('https://serverlearning-1.onrender.com/products')
        .then(response => response.json())
        .then(json => {
            console.log('Success:', json);
            setProducts(json);
            // also need to reset productsToShow
            setProductsToShow(json.slice(elementIdx, elementIdx + numberOfProducts));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleSubmit = (values) => {
        console.log('Form submitted with values:', values);
        console.log(values.productname, values.price, values.desc, values.tag, values.img);
        
        // send request
        fetch(`https://serverlearning-1.onrender.com/products/${selectedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: values.productname,
                price: values.price,
                desc: values.desc,
                img: values.img,
                tag: values.tag
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log('Success:', json);
            // Optionally, you can reset the form or update the product list here
            setSelectedProduct(null);
            fetchProducts();
            form.resetFields();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    return (
        <div className={styles.updateProduct}>
            <h1>Update Product Page</h1>
            <div className={styles.product}>
                {productsToShow && productsToShow.map((product) => {
                    return (
                        <div key={product._id} onClick={() => {
                            // setSelectedProduct(null);
                            setSelectedProduct(product)}}>
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.desc}</p>
                            {/* <img src={product.img} alt={product.name} /> */}
                            <Image 
                                src={product.img}
                                alt={product.name}
                                width={200}
                                preview={false}></Image>
                            {/* <p>Image: {product.img}</p> */}
                            <p>Tag: {product.tag}</p>
                        </div>
                    )
                })}
            </div>
            <div>
                <Pagination defaultCurrent={1} pageSize={numberOfProducts} total={products ? products.length : 0} 
                    onChange={(page, pageSize) => {
                        const startIndex = (page - 1) * pageSize;
                        setElementIdx(startIndex);
                        const endIndex = startIndex + pageSize;
                        setProductsToShow(products.slice(startIndex, endIndex));
                    }}/>
            </div>
            <div className="form">
                { selectedProduct && (
                    <Form form={form}
                        onFinish={handleSubmit}>

                    <Form.Item
                        label="Product Name"
                        name="productname"
                        rules={[{ required: true, message: 'Please input the product name!' }]}
                        // initialValue={selectedProduct?.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                        // initialValue={selectedProduct.price}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="desc"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        // initialValue={selectedProduct.desc}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="img"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}
                        // initialValue={selectedProduct.img}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tag"
                        name="tag"
                        rules={[{ required: true, message: 'Please input the tag!' }]}
                        // initialValue={selectedProduct.tag}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary" htmlType="submit">
                            Update Product
                        </Button>
                    </Form.Item>
                </Form>     
                )}
                
            </div>
        </div>
    );  
}

export default UpdateProduct;
