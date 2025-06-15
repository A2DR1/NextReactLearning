import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import styles from './SearchResult.module.scss'; // Assuming you have a CSS module for styles

const SearchResult = () => {
    const { Title } = Typography;
    const [keyword, setKeyword] = useState('');
    const router = useRouter();

    const handleClearResults = () => {
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('searchKeyword');
        // setProduct(null);
        router.reload();
    }

    useEffect(() => {
        const storedKeyword = sessionStorage.getItem('searchKeyword');
        if (storedKeyword) {
            setKeyword(storedKeyword);
        }
    }, []);

    return (
        <div>
            {keyword &&
                <div className={styles.result}>
                    <Title>Search Results: {keyword}</Title>
                    <Button onClick={handleClearResults}>Clear Results</Button>
                </div>
            }
        </div>
    )
}

export default SearchResult;