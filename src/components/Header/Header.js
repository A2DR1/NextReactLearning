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
            label: 'Introduction',
            key: '1',
            children: ''
        },
        {
            label: 'AI Chat',
            key: '2',
            children: ''
        }
    ]

    const clickSearch = (e) => {
        setToggleSearch(!toggleSearch);
    }

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
            <div className={styles.logo}>
                <img src="/assets/images/logo.png" alt="Austin Shen Logo" />
            </div>

            <div className={styles.nav}>
                <Tabs
                    defaultActiveKey={
                        router.pathname === '/' ? '1' :
                            router.pathname === '/ai-chat' ? '2' : '1'
                    }
                    centered
                    items={items}
                    onTabClick={(key) => {
                        switch (key) {
                            case '1':
                                router.push('/');
                                break;
                            case '2':
                                router.push('/ai-chat');
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </div>

            <div className={styles.logoPlaceholder}></div>
            {/* <div ref={ref}>
                <div onClick={clickSearch}>
                    <SearchOutlined className={styles.searchIcon} />
                </div>
                <div className={styles.searchInput} style={{ display: toggleSearch ? 'flex' : 'none' }}>
                    <input value={keyword} onChange={handleChange} onKeyDown={handleKeyDown}></input>
                    <button onClick={() => {fetchProducts(keyword, router)}}>Search</button>
                </div>
            </div> */}

        </div>

    )
}

export default Header;