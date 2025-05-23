import { Image } from 'antd';
import styles from './ImageText.module.scss';
import Banner from '@/components/Banner';

const ImageText = ( {imageText} ) => {
        const { image, content } = imageText;
        return (
        <div className={styles.imageText}>
            <Image 
                width={400}
                src={image}
                alt='cat'  
                preview={{
                    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  }}/>
            <Banner bannerContent={content} />
        </div>
    )
}

export default ImageText;