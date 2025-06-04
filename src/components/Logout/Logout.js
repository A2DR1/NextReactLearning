import { useRouter } from "next/router";
import { Button } from "antd";

const Logout = () => {
    const router = useRouter();
    const handleLogout = () => {
        // Clear user session or token
        sessionStorage.removeItem('user');
        // Redirect to login page or home page
        router.push('/admin'); // Adjust the path as needed
    };

    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default Logout;