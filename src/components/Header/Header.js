import styles from './Header.module.scss';
import  { useRouter } from 'next/router';
import { Tabs } from 'antd';

// import Home from '@/pages/index';
// import Products from '@/pages/products';
// import Support from '@/pages/support';
// import Contact from '@/pages/contact';

import { SearchOutlined } from '@ant-design/icons';

const Header = () => {
    const router = useRouter();
    // const items = [
    //     '/',
    //     '/products',
    //     '/support',
    //     '/contact'
    // ]

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
            <div>
                <SearchOutlined className={styles.searchIcon} />
            </div>
        </div>
    )
}

export default Header;