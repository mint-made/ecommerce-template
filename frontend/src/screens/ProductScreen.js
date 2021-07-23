import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Accordion,
  useAccordionToggle,
} from 'react-bootstrap';

import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import VariationForm from '../components/VariantForms/VariationForm';
import PersonalizationForm from '../components/VariantForms/PersonalizationForm';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [selectedPersonalizations, setSelectedPersonalizations] = useState([]);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (!product.name || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    } else {
      setSelectedVariations([...product.variations]);
      setSelectedPersonalizations([...product.personalizations]);
    }
  }, [dispatch, match, successProductReview, product]);

  /**
   * Handler for adding an item to cart; dispatches action and redirects to /cart
   */
  const addToCartHandler = () => {
    const addedProduct = product;
    addedProduct.variations = selectedVariations;
    addedProduct.personalizations = selectedPersonalizations;
    addedProduct.totalPrice = getTotalPrice();
    // Variant ID is created to check if an item with selected
    // variations/personalizations is already in the cart
    const variantIdArray = selectedVariations
      .map((variations) => variations.selectedOption)
      .concat(
        selectedPersonalizations.map((personalization) => personalization.value)
      );
    addedProduct.variantId = variantIdArray.join('-');

    dispatch(addToCart(addedProduct, qty));
    history.push('/cart');
  };

  /**
   * Dispatches the createProductReview action
   * @param {*} e Event object for the review submitted
   */
  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  /**
   * Returns the total price of the item inc. variations/personalizations
   */
  const getTotalPrice = () => {
    const variationCost = selectedVariations
      .map(
        (variation) =>
          variation.options[variation.selectedOption].additionalPrice
      )
      .reduce((acc, value) => acc + value, 0);
    const personalizationCost = selectedPersonalizations
      .map((personalization) => personalization.additionalPrice)
      .reduce((acc, value) => acc + value, 0);
    return product.price + variationCost + personalizationCost;
  };

  /**
   * Function to add a custom Accordion function that changes the value of
   * @param {*} param0
   */
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
      const variantType = eventKey.split('-')[0];
      const variantIndex = eventKey.split('-')[1];
      if (variantType === 'variation') {
        selectedVariations[variantIndex].isSelected =
          !selectedVariations[variantIndex].isSelected;
        setSelectedVariations([...selectedVariations]);
      }
      if (variantType === 'personalization') {
        selectedPersonalizations[variantIndex].isSelected =
          !selectedPersonalizations[variantIndex].isSelected;
        setSelectedPersonalizations([...selectedPersonalizations]);
      }
    });
    return (
      <p className='cursor-pointer mb-2' onClick={decoratedOnClick}>
        {children}
      </p>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col sm={12} className='d-block d-md-none'>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={7} className='d-none d-md-block'>
              <Image src={product.image} alt={product.name} fluid />

              <ListGroup variant='flush'>
                <h2>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    textLeft
                  />
                </h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text='rating' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={12} md={5}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2 className='m-0'>{product.name}</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <h4 className='m-0'>£{getTotalPrice()}</h4>
                      </Col>
                      <Col className='d-flex justify-content-end'>
                        {product.countInStock > 0 ? (
                          <p className='m-0'>
                            <i className='fas fa-check text-success'></i>In
                            Stock
                          </p>
                        ) : (
                          <p className='m-0'>
                            <i className='fas fa-times text-danger'></i> Out of
                            Stock
                          </p>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {selectedVariations &&
                    selectedVariations.map((variation, index) => (
                      <ListGroup.Item key={`variation-${index}`}>
                        {variation.isOptional ? (
                          <Accordion>
                            <CustomToggle eventKey={`variation-${index}`}>
                              {variation.name}
                              <span>
                                {variation.isSelected ? (
                                  <i className='fas fa-caret-up ml-1'></i>
                                ) : (
                                  <i className='fas fa-caret-down ml-1'></i>
                                )}
                              </span>
                            </CustomToggle>
                            <Accordion.Collapse eventKey={`variation-${index}`}>
                              <VariationForm
                                variation={variation}
                                onChange={(e) => {
                                  variation.selectedOption = e.target.value;
                                  setSelectedVariations([
                                    ...selectedVariations,
                                  ]);
                                }}
                              />
                            </Accordion.Collapse>
                          </Accordion>
                        ) : (
                          <VariationForm
                            variation={variation}
                            label
                            onChange={(e) => {
                              variation.selectedOption = e.target.value;
                              setSelectedVariations([...selectedVariations]);
                            }}
                          />
                        )}
                      </ListGroup.Item>
                    ))}

                  {selectedPersonalizations &&
                    selectedPersonalizations.map((personalization, index) => (
                      <ListGroup.Item key={`personalization-${index}`}>
                        {personalization.isOptional ? (
                          <Accordion>
                            <CustomToggle eventKey={`personalization-${index}`}>
                              {personalization.name}
                              <span>
                                {personalization.isSelected ? (
                                  <i className='fas fa-caret-up ml-1'></i>
                                ) : (
                                  <i className='fas fa-caret-down ml-1'></i>
                                )}
                              </span>
                            </CustomToggle>
                            <Accordion.Collapse
                              eventKey={`personalization-${index}`}
                            >
                              <PersonalizationForm
                                personalization={personalization}
                                onChange={(e) => {
                                  personalization.value = e.target.value;
                                  setSelectedPersonalizations([
                                    ...selectedPersonalizations,
                                  ]);
                                }}
                              />
                            </Accordion.Collapse>
                          </Accordion>
                        ) : (
                          <PersonalizationForm
                            personalization={personalization}
                            label
                            onChange={(e) => {
                              personalization.value = e.target.value;
                              setSelectedPersonalizations([
                                ...selectedPersonalizations,
                              ]);
                            }}
                          />
                        )}
                      </ListGroup.Item>
                    ))}

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='d-flex align-items-center'>
                          <p className='m-0'>Quantity</p>
                        </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            className='form-select border border-secondary rounded'
                            style={{ minWidth: '120px' }}
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
