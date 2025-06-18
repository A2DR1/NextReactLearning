const fetchProducts = async (keyword, router) => {
    // handle search 
    if (!!keyword && keyword.length > 2) {
        fetch(`https://serverlearning-1.onrender.com/products/search?keyword=${keyword}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                // Save data to session storage
                sessionStorage.setItem('searchResults', JSON.stringify(json));
                sessionStorage.setItem('searchKeyword', keyword);
                // Redirect to products page
                if (router.pathname !== '/products') {
                    router.push('/products');
                }
                else {
                    router.reload();
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    }
}    

export default fetchProducts;