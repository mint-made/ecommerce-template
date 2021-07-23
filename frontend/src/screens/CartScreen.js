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
import ItemVariantInfo from '../components/ItemVariantInfo';
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

  //Returns numbers to two decimal points
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Row>
      <Col md={9}>
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
                  <Col xs={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col xs={5}>
                    <ItemVariantInfo item={item} />
                  </Col>
                  <Col xs={2}>
                    <Form.Control
                      as='select'
                      className='form-select border border-secondary rounded form-control-sm'
                      style={{ maxWidth: '70px' }}
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
                  <Col xs={2} className='p-0 text-center'>
                    <h5 className='m-0'>
                      £{addDecimals(item.totalPrice * item.qty)}
                    </h5>
                    {item.qty > 1 && (
                      <p>(£{addDecimals(item.totalPrice)} each)</p>
                    )}
                  </Col>
                  <Col xs={1}>
                    <Button
                      type='button'
                      variant='light'
                      className='btn-sm text-danger'
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
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                {cartItems.reduce((acc, item) => acc + item.qty, 0) > 1
                  ? ' items'
                  : ' item'}
              </h5>
              <h3 className='my-1'>
                £
                {addDecimals(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.totalPrice,
                    0
                  )
                )}
              </h3>
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
