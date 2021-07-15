import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newCartItem = action.payload;

      const existItem = state.cartItems.find(
        (item) => item.productId === newCartItem.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.productId === existItem.productId ? newCartItem : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newCartItem],
        };
      }
    case CART_REMOVE_ITEM:
      console.log('remove from cart reducer');
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
