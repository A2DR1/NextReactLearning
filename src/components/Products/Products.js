import styles from './Products.module.scss';
import { Image } from 'antd'; 
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState, useEffect, use } from 'react';
import { Typography } from 'antd';
import { set } from 'rc-util';
const { Paragraph } = Typography;

// const products = [
//     { id: 1, name: 'Product 1', price: 100, desc: 'This is product 1', image: '/assets/images/cat2.jpg'},
//     { id: 2, name: 'Product 2', price: 200, desc: 'This is product 2', image: '/assets/images/cat2.jpg'},
//     { id: 3, name: 'Product 3', price: 300, desc: 'This is product 3', image: '/assets/images/cat2.jpg'},
//     { id: 4, name: 'Product 4', price: 400, desc: 'This is product 4', image: '/assets/images/cat2.jpg'},
//     { id: 5, name: 'Product 5', price: 500, desc: 'This is product 5', image: '/assets/images/cat2.jpg'},
// ];

const Products = ( {setProduct} ) => {
    const [products, setProducts] = useState([]);
    const [productsShow, setProductsShow] = useState([]);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [loading, setLoading] = useState(false);

    const clickLeft = () => {
        setShowRight(true);
        const index = products.findIndex((product) => product.id === productsShow[0].id);
        if (index > 0) {
            setProductsShow(products.slice(index - 1, index + 2));
            if (index === 1) {
                setShowLeft(false);
            }
        }
    }
    const clickRight = () => {
        setShowLeft(true);
        const index = products.findIndex((product) => product.id === productsShow[0].id);
        if (index < products.length - 3) {
            setProductsShow(products.slice(index + 1, index + 4));
            if (index === products.length - 4) {
            setShowRight(false);
        }
        }
    }

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:4000/products')
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                console.log(json);
                setProducts(json);
                setProductsShow(json.slice(0, 3));
                setProduct(json[0]);

            })
    }, [])

    // useEffect(() => {
    //     setProductsShow(products.slice(0, 3));
    //     setProduct(products[0]);
    // }, [])

    return (
        <div className={styles.products}>
            <div className={styles.icon} 
                onClick={() => clickLeft()}
                style={{opacity: showLeft ? 1 : 0}}>
                <LeftOutlined style={{fontSize: '30px'}}/>
            </div>
            {!loading && productsShow.map((product)=> {
                return (
                    <div 
                        key={product._id} className={styles.product}
                        onClick={() => setProduct(product)} >
                        <Paragraph>{product.name}</Paragraph>
                        <Image 
                            src={product.img}
                            alt={product.name}
                            width={200}
                            preview={false}
                        />
                    </div>
                )
            })}
            <div className={styles.icon}
                onClick={() => clickRight()}
                style={{opacity: showRight ? 1 : 0}}>
                <RightOutlined style={{fontSize: '30px'}} />
            </div>
        </div>
    )
}

export default Products;