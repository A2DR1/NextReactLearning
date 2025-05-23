import Layout from '@/components/Layout';
import { Typography } from 'antd';
import Products from '@/components/Products';
import ProductDetail from '@/components/ProductDetail'; 
import { useState } from 'react';

const { Title } = Typography;
// const def = {id: 0, name: '', price: 0, desc: '', image: ''};

const ProductsPage = () => {
    const [product, setProduct] = useState(null);
    console.log(product);
    return (
        <Layout>
            <Products setProduct={ setProduct }/>
            <hr />
            {product && <ProductDetail product={product} />}
        </Layout>
    )
}
export default ProductsPage;