import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  //Variations
  const [variations, setVariations] = useState([]);

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setVariations(product.variations);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  /**
   * Handler for uploading images added by the user
   * @param {Object} e Event object to get the image file added by the user
   */
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (e) {
      console.error(error);
      setUploading(false);
    }
  };

  /**
   * Dispatches the updateProduct action
   * @param {Object} e Event object to prevent default page reload
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
        variations,
      })
    );
  };

  /**
   * Adds a new variation to the product
   */
  const addVariationHandler = () => {
    setVariations((variations) => [
      ...variations,
      {
        name: 'e.g. size',
        selectedOption: 0,
        options: [
          {
            name: 'e.g. small',
            additionalPrice: 0.0,
          },
          {
            name: 'e.g. large',
            additionalPrice: 2.0,
          },
        ],
      },
    ]);
  };
  /**
   * Adds an option to the variation[index]
   * @param {Number} index variation[index] to have an option added
   */
  const addOptionHandler = (index) => {
    const newVariationsArray = [...variations];
    newVariationsArray[index].options.push({
      name: 'e.g. large',
      additionalPrice: 2.0,
    });
    setVariations(newVariationsArray);
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <div className='p-3 border border-3 rounded-lg'>
              <Row>
                <Col xs={7}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image URL'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock </Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Count In Stock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className='border border-3 rounded-lg mb-2'>
                {variations &&
                  variations.map((variation, index) => (
                    <div
                      key={`variation-${index}`}
                      className='border-bottom-3 p-2'
                    >
                      <h4 className='p-1'>Variation #{index + 1}</h4>
                      <Form.Group controlId={`variation-name-${index}`}>
                        <Form.Label>Variation Name</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Variation Name'
                          value={variation.name}
                          onChange={(e) => {
                            variation.name = e.target.value;
                            setVariations([...variations]);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      {variation.options &&
                        variation.options.map((option, index) => (
                          <Row key={`${variation.name}-option-${index}`}>
                            <Col>
                              <Form.Group
                                controlId={`${variation.name}-option-${index}-name`}
                              >
                                <Form.Label>
                                  {index + 1}. Option Name
                                </Form.Label>
                                <Form.Control
                                  className='form-control-sm'
                                  type='text'
                                  placeholder='Variation Name'
                                  value={option.name}
                                  onChange={(e) => {
                                    option.name = e.target.value;
                                    setVariations([...variations]);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group
                                controlId={`${variation.name}-option-${index}-additionalPrice`}
                              >
                                <Form.Label>Additional Price</Form.Label>
                                <Form.Control
                                  className='form-control-sm'
                                  type='text'
                                  placeholder='e.g. 1.00'
                                  value={option.additionalPrice}
                                  onChange={(e) => {
                                    option.additionalPrice = e.target.value;
                                    setVariations([...variations]);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group
                                controlId={`${variation.name}-option-${index}-isSelected`}
                              >
                                <Form.Check
                                  type='checkbox'
                                  label='Default Option?'
                                  checked={variation.selectedOption === index}
                                  onChange={(e) => {
                                    variation.selectedOption = index;
                                    setVariations([...variations]);
                                  }}
                                ></Form.Check>
                              </Form.Group>
                            </Col>
                          </Row>
                        ))}
                      <Button
                        variant='primary'
                        className='m-1 btn btn-sm'
                        onClick={() => addOptionHandler(index)}
                      >
                        Add Option
                      </Button>
                    </div>
                  ))}
                <Button
                  variant='primary'
                  className='m-1 btn'
                  onClick={addVariationHandler}
                >
                  New Variation
                </Button>
              </div>
              <Button type='submit' variant='success'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
