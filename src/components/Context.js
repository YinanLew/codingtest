import React, {createContext, useState} from "react";

const ProductsContext = createContext({});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([1]);

    return (
        <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>

    )
}

export default ProductsContext;
