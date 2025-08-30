import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./MobileHeader.module.scss"; // Adjust the path as needed
import { useRouter } from "next/router";
import fetchProducts from '@/utils/fetchProducts'; // Assuming you have a utility function for fetching products


const MobileHeader = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const router = useRouter();

    const handleKeyDown = (e) => {
        // Handle Enter key for search
        if (e.key === 'Enter') {
            // searchKeyword();
            fetchProducts(keyword, router);
        }
    }

    return (
        <div>
            <div className={styles.mobileHeader}>
                <div className={styles.logo}>Logo</div>
                {
                    !toggleMenu && <MenuOutlined onClick={() => { setToggleMenu(!toggleMenu) }} style={{ fontSize: '24px', marginRight: '16px' }} />
                }
                {
                    toggleMenu && (
                        <div>
                            <div className={styles.menu}>
                                <div className={styles.nav} onClick={() => { router.push('/') }}>Home</div>
                                <div className={styles.nav} onClick={() => { router.push('/ai-chat') }}>AI Chat</div>
                                <div className={styles.nav} onClick={() => { setShowSearch(!showSearch) }}>Search <SearchOutlined style={{ fontSize: '16px' }} /></div>
                                <MenuOutlined className={styles.nav} onClick={() => { setToggleMenu(!toggleMenu) }} style={{ fontSize: '24px', marginRight: '16px' }} />

                                {showSearch && (
                                    <div className={styles.searchBox}>
                                        <input type="text" placeholder="Search..." className={styles.searchInput}
                                            value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                            onKeyDown={handleKeyDown} />
                                        <button className={styles.searchButton}
                                            onClick={() => fetchProducts(keyword, router)}>Search</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MobileHeader;