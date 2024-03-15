type Product = {
    title: string,
    thumbnail: string,
    description: string,
    brand: string,
    category: "smartphones"|"laptops"|"fragrances"| "skincare"|"groceries"|"home-decoration"|"furniture"|"tops"|"womens-dresses"|"womens-shoes"|"mens-shirts"|"mens-shoes"|"mens-watches"|"womens-watches"|"womens-bags"|"womens-jewellery"|"sunglasses"|"automotive"|"motorcycle"|"lighting",
    price: number,
    rating: number,
    stock: number,
    discountPercentage: number
}

async function getProduct(userInput?:string):Promise<Product[]>{

    let url: RequestInfo | URL;
    if(userInput === undefined) url = `https://dummyjson.com/products`; 
    else url = `https://dummyjson.com/products/search?q=${userInput}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if(res.status === 200 && data.products.length !== 0){
        return data.products as Product[];
    }
    else{
        throw new Error('Product Not Found, Please Try Agian!')
    }
}

export{ getProduct, Product}


