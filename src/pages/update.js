import UpdateProduct from "@/components/UpdateProduct";
import Logout from "@/components/Logout";
import useRedirectToAdmin from "@/hooks/useRedirectToAdmin";
import Layout from "@/components/Layout";
import { Button } from "antd";
import { useRouter } from "next/router";

const Update = () => {
    const router = useRouter();
    useRedirectToAdmin();
    return (
        <div>
            <Layout>
                <Logout />
                <Button onClick={() => router.push('/create')}>Create Product</Button>
                <UpdateProduct />
            </Layout>
        </div>
    );
}
export default Update;