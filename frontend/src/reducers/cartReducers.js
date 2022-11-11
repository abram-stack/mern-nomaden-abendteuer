import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const cartReducer = (state= { cartItems:[] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const itemExist = state.cartItems.find(x => x.product === item.product);

      //if there is already a product, matched with the item in state
      if (itemExist) {
        //return the existing state with ADJUSTED cartItems
        return {
          ...state,
          //map through the cartItems array, find that same item
          //replace the matchig product with new item
          //leave the rest of products, as it is
          cartItems: state.cartItems.map((x) => (
            x.product === itemExist.product ? item : x
          ))
        }

        //otherwise if the item is NOT already in cartItems
      } else {
        //return the existing state with ADJUSTED cartItems, means plus the new item
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case CART_REMOVE_ITEM:
      return{ 
         //we filter state
        ...state,
        cartItems: [...state.cartItems.filter((x) => x.product !== action.payload)]
      }
    default:
      return state;
  }
}