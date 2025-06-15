import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { useState, useRef } from 'react';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import useOutsideClick from '@/hooks/useOutsideClick'; // Assuming you have this hook for handling outside clicks
// import useMobile from '@/hooks/useMobile'; // Assuming you have this hook for mobile detection
import fetchProducts from '@/utils/fetchProducts'; // Assuming you have a utility function for fetching products
import { set } from 'rc-util';

const Header = () => {
    const router = useRouter();
    const [toggleSearch, setToggleSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    const ref = useRef();
    useOutsideClick(ref, () => {
        if (toggleSearch) {
            setToggleSearch(false);
        }
    });

    const items = [
        {
            label: 'Home',
            key: '1',
            children: ''
        },
        {
            label: 'Products',
            key: '2',
            children: ''
        },
        {
            label: 'Support',
            key: '3',
            children: ''
        },
        {
            label: 'Contact',
            key: '4',
            children: ''
        }
    ]

    const clickSearch = (e) => {
        setToggleSearch(!toggleSearch);
    }

    // const searchKeyword = () => {
    //     // handle search 
    //     if (!!keyword && keyword.length > 2) {
    //         fetch(`http://localhost:4000/products/search?keyword=${keyword}`)
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 console.log(json);
    //                 // Save data to session storage
    //                 sessionStorage.setItem('searchResults', JSON.stringify(json));
    //                 sessionStorage.setItem('searchKeyword', keyword);
    //                 setSearchResults(json);
    //                 // Redirect to products page
    //                 if (router.pathname !== '/products') {
    //                     router.push('/products');
    //                 }
    //                 else {
    //                     router.reload();
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching search results:', error);
    //             });
    //     }
    // }

    const handleChange = (e) => {
        // Handle input change for search
        setKeyword(e.target.value);
    }

    const handleKeyDown = (e) => {
        // Handle Enter key for search
        if (e.key === 'Enter') {
            // searchKeyword();
            fetchProducts(keyword, router);
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>Logo</div>

            <div className={styles.nav}>
                <Tabs
                    defaultActiveKey={
                        router.pathname === '/' ? '1' :
                            router.pathname === '/products' ? '2' :
                                router.pathname === '/support' ? '3' :
                                    router.pathname === '/contact' ? '4' : '1'
                    }
                    centered
                    items={items}
                    onTabClick={(key) => {
                        switch (key) {
                            case '1':
                                router.push('/');
                                break;
                            case '2':
                                router.push('/products');
                                break;
                            case '3':
                                router.push('/support');
                                break;
                            case '4':
                                router.push('/contact');
                                break;
                            default:
                                break;
                        }
                    }}
                />

            </div>
            <div ref={ref}>
                <div onClick={clickSearch}>
                    <SearchOutlined className={styles.searchIcon} />
                </div>
                <div className={styles.searchInput} style={{ display: toggleSearch ? 'flex' : 'none' }}>
                    <input value={keyword} onChange={handleChange} onKeyDown={handleKeyDown}></input>
                    <button onClick={() => {fetchProducts(keyword, router)}}>Search</button>
                </div>
            </div>

        </div>

    )
}

export default Header;