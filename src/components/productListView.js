import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../services/products';
import { Table } from 'react-bootstrap';

const ProductListView = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsSlice.products);

    useEffect(() => {
        GetProducts(dispatch);
    }, [dispatch]);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductListView;
