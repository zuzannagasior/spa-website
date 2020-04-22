import $ from 'jquery';
import { cartIcon } from '../assets/icons/cartIcon'
import {
    Cart
} from '../cart/cart';

export const createCartIcon = () => {
    const cart = new Cart();
    const cartIconWrap = $('<span class="cartIcon"></span>').prepend(cartIcon);
    
    cartIconWrap.on('mouseover mouseout', (event) => {
        const action = event.type === 'mouseover' ? 'show' : 'hide';
        cart.showCartSum(action);
    });

    return cartIconWrap;
};