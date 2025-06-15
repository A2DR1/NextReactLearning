import Layout from '@/components/Layout';
import { Typography, Button } from 'antd';
import Products from '@/components/Products';
import ProductDetail from '@/components/ProductDetail'; 
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import SearchResult from '@/components/SearchResult';

const { Title } = Typography;

const ProductsPage = () => {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [keyword, setKeyword] = useState('');
    console.log(product);

    // const handleClearResults = () => {
    //     sessionStorage.removeItem('searchResults');
    //     sessionStorage.removeItem('searchKeyword');
    //     setProduct(null);
    //     router.reload();
    // }

    useEffect(() => {
        const storedKeyword = sessionStorage.getItem('searchKeyword');
        if (storedKeyword) {
            setKeyword(storedKeyword);
        }
    }, []);


    return (
        <Layout>
            <SearchResult />
            {/* {keyword && <Button onClick={handleClearResults}>Clear Results</Button>} */}
            <Products setProduct={ setProduct }/>
            <hr />
            {product && <ProductDetail product={product} />}
        </Layout>
    )
}
export default ProductsPage;