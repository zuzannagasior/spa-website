import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';

const createCartItemCont = (data) => {
    const fragment = $(new DocumentFragment());
    const cart = new Cart();

    const numberOfItems = cart.getNumberOfItems(data.name);
    const priceLabel = Object.keys(data).includes('beds') ? ' / noc' : '';
    const cartItemCont = $(`<div class="first">
                    <button id="delete">x</button>
                    <div class="imgBox">
                        <img src="${data.photoUrl}" alt="" / >
                    </div>
                    ${data.name}
                </div>
                <div class="second">
                    <button id="add">+</button>
                    <span class="amount">${numberOfItems}</span>
                    <button id="remove">-</button>
                    <span class="price">${data.price},00 zł${priceLabel}</span>
                </div>`);

    cartItemCont.find('button#remove').attr('disabled', numberOfItems === 1);
    cartItemCont.find('button#delete').on('click', () => {
        cart.delete(data);
        $(document).find(`#${data.id}`).remove();
        $(document).find(`.sum`).html(cart.getCartSum());
    });
    cartItemCont.find('button#add').on('click', () => {
        cart.add(data);
        $(document).find(`#${data.id}`).html(createCartItemCont(data));
        $(document).find(`.sum`).html(cart.getCartSum());
    });
    cartItemCont.find('button#remove').on('click', () => {
        cart.remove(data);
        $(document).find(`#${data.id}`).html(createCartItemCont(data));
        $(document).find(`.sum`).html(cart.getCartSum());
    });
    fragment.append(cartItemCont);        

    return fragment;
};

export const cartItem = (data) => {
    const fragment = $(new DocumentFragment());
    const cartItemBox = $(`<div id="${data.id}" class="cartItemBox"></div>`);

    const cartItemCont = createCartItemCont(data);
    
    cartItemBox.prepend(cartItemCont);
    fragment.append(cartItemBox);
    return fragment;
};