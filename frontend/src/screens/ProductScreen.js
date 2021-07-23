import React, { useState, useEffect } from 'react';
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

import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import VariationForm from '../components/VariantForms/VariationForm';
import PersonalizationForm from '../components/VariantForms/PersonalizationForm';
import DisplayReviews from '../components/reviews/DisplayReviews';
import WriteReviewForm from '../components/reviews/WriteReviewForm';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState([]);
  const [selectedPersonalizations, setSelectedPersonalizations] = useState([]);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    } else {
      setSelectedVariations([...product.variations]);
      setSelectedPersonalizations([...product.personalizations]);
      console.log(product);
    }
  }, [dispatch, match, product]);

  /**
   * Handler for adding an item to cart; dispatches action and redirects to /cart
   * Variant ID is created here as an identifier in the cart between items
   * that have different variations or personalizations
   */
  const addToCartHandler = () => {
    const addedProduct = product;
    addedProduct.variations = selectedVariations;
    addedProduct.personalizations = selectedPersonalizations;
    addedProduct.totalPrice = getTotalPrice();
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
   * Returns the total price of the item inc. variations/personalizations
   */
  const getTotalPrice = () => {
    const variationCost = selectedVariations
      .map((variation) =>
        !variation.isOptional || (variation.isOptional && variation.isSelected)
          ? variation.options[variation.selectedOption].additionalPrice
          : null
      )
      .reduce((acc, value) => acc + value, 0);

    const personalizationCost = selectedPersonalizations
      .map((personalization) =>
        !personalization.isOptional ||
        (personalization.isOptional && personalization.isSelected)
          ? personalization.additionalPrice
          : null
      )
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
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className='mb-5'
              />
              <ListGroup variant='flush'>
                <h2>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Review${
                      product.numReviews === 1 ? '' : 's'
                    }`}
                    textLeft
                  />
                </h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <DisplayReviews reviews={product.reviews} />
                <WriteReviewForm productId={match.params.id} />
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
                              {` (+£${personalization.additionalPrice})`}
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
            <Col sm={12} className='d-block d-md-none'>
              <ListGroup variant='flush' className='mt-5'>
                <h2>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Review${
                      product.numReviews === 1 ? '' : 's'
                    }`}
                    textLeft
                  />
                </h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <DisplayReviews reviews={product.reviews} />
                <WriteReviewForm productId={match.params.id} />
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
