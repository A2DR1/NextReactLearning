import styles from './ProductDetail.module.scss';
import { Typography, Image } from 'antd';

const {Title, Paragraph} = Typography;

const ProductDetail = ( {product} ) => {
    const { id, name, price, desc, img } = product;
    return (
        <div className={styles.productDetail}>
            <Image 
                width={500}
                src={img}
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