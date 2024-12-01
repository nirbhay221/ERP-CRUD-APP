import { Form, Row, Col, Button } from "react-bootstrap";
import { React, useState, useEffect } from 'react';
import { DeleteProduct, EditProduct, NewProduct } from "../services/products";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "../app/productsReducer";

export default ({ product, setIsEditing }) => {
    const descriptions = ['Product1', 'Product2', 'Product3', 'Product4'];
    const [Quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewProduct, setIsNewProduct] = useState(true);
    const dispatch = useDispatch();
    const userId = useSelector((state) => {
        console.log('Full authentication state:', state.authenticationSlice);
        console.log('Extracted userId:', state.authenticationSlice.userId);
        return state.authenticationSlice.userId;
    });
    console.log("USER ID : ", userId);
    useEffect(() => {
        console.log('Current userId in ProductForm:', userId);
        
        if (product !== undefined) {
            setIsNewProduct(false);
            setQuantity(product.Quantity);
            setDescription(product.description);
        } else {
            setIsNewProduct(true);
        }
    }, [product, userId]);


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Submitting product with userId:', userId);

        // if (!userId) {
        //     alert('Could not retrieve user ID. Please log out and log in again.');
        //     return;
        // }

        if (isNewProduct) {
            NewProduct(dispatch, {
                description,
                quantity: Quantity,
                User: userId
            });
        } else {
            EditProduct(dispatch, {
                id: product.id,
                description,
                Quantity
            });
            setIsEditing(false);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="select" value={description} onChange={event => setDescription(event.target.value)}>
                        {descriptions.map((d, index) => <option key={index}>{d}</option>)}
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" step="0.1" value={Quantity} onChange={event => setQuantity(Number(event.target.value))} />
                </Col>
                <div style={{ marginTop: 'auto' }}>
                    {isNewProduct ? (
                        <Button variant="primary" type="submit">Add</Button>
                    ) : (
                        <div>
                            <Button style={{ marginRight: '2px' }} variant="danger" onClick={() => DeleteProduct(dispatch, product)}>Delete</Button>
                            <Button style={{ marginRight: '2px' }} variant="success" type="submit">Save</Button>
                            <Button style={{ marginRight: '2px' }} variant="default" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    )}
                </div>
            </Row>
        </Form>
    );
};
