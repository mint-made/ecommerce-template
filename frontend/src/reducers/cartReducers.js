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
      const newItem = action.payload;
      const existsItem = state.cartItems.find((item) => {
        return item._id === newItem._id && item.variantId === newItem.variantId;
      });

      if (!existsItem) {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((item) => {
              if (
                item._id === newItem._id &&
                item.variantId === newItem.variantId
              ) {
                item.qty = newItem.qty;
              }
              return item;
            }),
          ],
        };
      }

    case CART_REMOVE_ITEM:
      const { _id, variantId } = action.payload;
      console.log('remove from cart reducer');
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== _id && item.variantId !== variantId
        ),
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
