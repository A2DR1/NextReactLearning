import styles from './Products.module.scss';
import { Image } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { Typography } from 'antd';
import useMobile from '@/hooks/useMobile'; // Assuming you have a custom hook for mobile detection
import { set } from 'rc-util';
const { Paragraph, Title } = Typography;

const Products = ({ setProduct }) => {
    const isMobile = useMobile();
    const [products, setProducts] = useState([]);
    const [productsShow, setProductsShow] = useState([]);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    // use currentIndex to track the index of the first product in productsShow
    const clickLeft = () => {
        setShowRight(true);

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            if (isMobile) {
                setProductsShow([products[currentIndex]]);
            } else {

                const newProductsShow = products.slice(currentIndex - 1, currentIndex + 2);
                setProductsShow(newProductsShow);
            }
            if (currentIndex === 1) {
                setShowLeft(false);
            }

        }
        else {
            if (isMobile) {
                setProductsShow([products[0]]);
                setShowLeft(false);

            } else {
                setProductsShow(products.slice(0, 3));
                setShowLeft(false);
            }
        }
    }
    const clickRight = () => {
        setShowLeft(true);

        if (isMobile) {
            if (currentIndex < products.length) {
                setCurrentIndex(currentIndex + 1);
                const newProductsShow = [products[currentIndex]];
                setProductsShow(newProductsShow);
                if (currentIndex >= products.length - 1) {
                    setShowRight(false);
                }
            }
            else {
                setProductsShow([products[0]]);
                setShowRight(false);
            }
        }
        else {
            if (currentIndex < products.length - 3) {
                setCurrentIndex(currentIndex + 1);
                const newProductsShow = products.slice(currentIndex + 1, currentIndex + 4);
                setProductsShow(newProductsShow);
                if (currentIndex >= products.length - 4) {
                    setShowRight(false);
                }
            }
            else {
                setProductsShow(products.slice(products.length - 3, products.length));
                setShowRight(false);
            }
        }

    }

    useEffect(() => {
        setLoading(true);
        const storedProducts = sessionStorage.getItem('searchResults');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setLoading(false);
            setProducts(parsedProducts);
            const newProductsShow = isMobile ? [parsedProducts[0]] : parsedProducts.slice(0, 3);
            setProductsShow(newProductsShow);
            setProduct(parsedProducts[0]);
            setSearchKeyword(sessionStorage.getItem('searchKeyword'));
            return;
        }
        fetch('http://localhost:4000/products')
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                setProducts(json);
                const newProductsShow = isMobile ? [json[0]] : json.slice(0, 3);
                setProductsShow(newProductsShow);
                setProduct(json[0]);
                sessionStorage.setItem('searchResults', JSON.stringify(json));
            })
    }, [])

    // useEffect to update productsShow when isMobile changes
    useEffect(() => {
        // Update the productsShow based on the currentIndex and isMobile
        if (isMobile) {
            setProductsShow([products[currentIndex]]);
        }
        else {
            const newProductsShow = products.slice(currentIndex, currentIndex + 3);
            setProductsShow(newProductsShow);
        }
    }
    , [isMobile, products]);

    // useEffect to update productsShow when products changes
    useEffect(() => {
        if (isMobile) {
            if (products.length <= 1) {
                setShowLeft(false);
                setShowRight(false);
            }
            else {
                setShowLeft(false);
                setShowRight(true);
            }
        }
        else {

            if (products.length <= 3) {
                setShowLeft(false);
                setShowRight(false);
            }
            else {
                setShowLeft(false);
                setShowRight(true);
            }
        }
    }
        , [products]);

    return (
        <div>
            {/* <Title>{searchKeyword}</Title> */}
            <div className={styles.products}>
                <div className={styles.icon}
                    onClick={() => clickLeft()}
                    style={{ opacity: showLeft ? 1 : 0 }}>
                    <LeftOutlined style={{ fontSize: '30px' }} />
                </div>
                {!loading && productsShow.map((product) => {
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
                    style={{ opacity: showRight ? 1 : 0 }}>
                    <RightOutlined style={{ fontSize: '30px' }} />
                </div>
            </div>
        </div>
    )
}

export default Products;