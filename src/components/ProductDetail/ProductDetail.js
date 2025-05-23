import styles from './ProductDetail.module.scss';
import { Typography, Image } from 'antd';

const {Title, Paragraph} = Typography;

const ProductDetail = ( {product} ) => {
    const { id, name, price, desc, image } = product;
    return (
        <div className={styles.productDetail}>
            <Image 
                width={200}
                src={image}
                alt={name}/>
                <div className={styles.productDetailText}>
                    <Title>{name}</Title>
                    <Paragraph>{price}</Paragraph>
                    <Paragraph>{desc}</Paragraph>
                </div>
        </div>
    )
}

export default ProductDetail;