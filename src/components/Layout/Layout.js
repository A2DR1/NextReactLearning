import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import styles from "./Layout.module.scss"; // Adjust the path as needed
import useMobile from "@/hooks/useMobile";
import MobileHeader from "@/components/MobileHeader";
import { useEffect } from "react";

const Layout = ({children}) => {
    const isMobile = useMobile();

    useEffect(() => {
        // This effect runs on mount and can be used for any initial setup
        // For example, you could log the current device type
        console.log(`Current device is ${isMobile ? 'mobile' : 'desktop'}`);
    }
    , [isMobile]);

    return (
        <div className={styles.layout}>
            {
                isMobile ?
                <MobileHeader />
                :
                <Header />
            }
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}
export default Layout;