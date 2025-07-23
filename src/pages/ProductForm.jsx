import React from 'react';
const ProductForm = () => {
    return (
        <div>
            <h2>Create or Update Product</h2>
            <form>
                <input type="text" placeholder="Product Name" />
                <input type="text" placeholder="Description" />
                <input type="number" placeholder="Interest Rate" />
                <input type="date" placeholder="Launch Date" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default ProductForm;