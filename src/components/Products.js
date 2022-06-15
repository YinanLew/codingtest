import React from 'react';
import "./style.css";
import ProductsContext from "./Context";

function Products() {

    const {Consumer} = ProductsContext;
    return (
        <Consumer>
            {
                value => {
                    return `${value.products}`
                }
            }
        </Consumer>
    );
}

export default Products;