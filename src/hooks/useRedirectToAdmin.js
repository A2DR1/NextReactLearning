import { useEffect } from "react"
import { useRouter } from "next/router";

const useRedirectToAdmin = () => {
    const router = useRouter();
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('user');
        if (!isLoggedIn) {
            // Redirect to admin page if not logged in
            router.push('/admin'); // Adjust the path as needed
        }
    }, [router]);
}

export default useRedirectToAdmin;