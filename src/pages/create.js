import CreateProduct from "@/components/CreateProduct";
import useRedirectToAdmin from "@/hooks/useRedirectToAdmin";
import Layout from "@/components/Layout";
import Logout from "@/components/Logout";

const CreatePage = () => {
    useRedirectToAdmin();
    return (
        <div>
            <Layout>
                <Logout />
                <CreateProduct />
            </Layout>
        </div>
    );
}

export default CreatePage;