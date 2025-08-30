const fetchProducts = async (keyword, router) => {
    // handle search 
    if (!!keyword && keyword.length > 2) {
        // For now, redirect to AI chat page where users can ask questions
        if (router.pathname !== '/ai-chat') {
            router.push('/ai-chat');
        }
        // You can implement actual search functionality here later if needed
        console.log('Search functionality redirected to AI Chat. Users can ask questions about Austin and his projects.');
    }
}    

export default fetchProducts;