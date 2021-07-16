import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (productId, variantId) => {
    dispatch(removeFromCart(productId, variantId));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={`${item._id}-${item.variantId}`}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                    {item.variantId}
                  </Col>
                  <Col md={3}>
                    <p>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </p>
                    {item.variations &&
                      item.variations.map((variation, index) => (
                        <p key={`variation-${index}`}>
                          {variation.name + ' - '}
                          {variation.options[variation.selectedOption].name}
                          {' (+£' +
                            variation.options[variation.selectedOption]
                              .additionalPrice +
                            ')'}
                        </p>
                      ))}
                  </Col>
                  <Col md={2}>
                    ${item.totalPrice} qty: {item.qty}
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as='select'
                      className='form-select border border-secondary rounded'
                      style={{ minWidth: '112px' }}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={`option-${x + 1}`} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() =>
                        removeFromCartHandler(item._id, item.variantId)
                      }
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.totalPrice, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
