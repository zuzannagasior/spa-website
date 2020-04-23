import $ from 'jquery';
import {
    Cart
} from './cart';

export const createCartSum = () => {
    const fragment = $(new DocumentFragment());
    const cartSumBox = $('<div class="cartSum"></div>');
    const cart = new Cart();
    const cartSumContent = $(new DocumentFragment());
    console.log('cart.getItSpaCart()', cart.getItSpaCart());
    console.log('cart.getItSpaCart().length', cart.getItSpaCart().length);

    if (cart.getItSpaCart().length > 0) {
        const items = cart.getItSpaCart();
        cartSumContent.append($(`    
        <section></section>
        <button class="customButton">Przejdź do koszyka</button>`));

        const roomsListLabel = $(`<p><b>Pokoje</b></p>`)
        const roomsListWrap = $(`<ul></ul>`);
        const roomsList = items.map(item => {
            console.log('item', item);
            return $(`<li>${item.name}</li>`);
        })
        roomsListWrap.prepend(roomsList);
        cartSumContent.find('section').prepend(roomsListWrap).prepend(roomsListLabel);

        cartSumContent.find('button').on('click', () => {
            cartSumContent.find('button').trigger('routechange', { path: '/bookings' });
            cart.showCartSum('hide');
        });
    } else {
        console.log('jestem hej')
        cartSumContent.append($('<p>Twój koszyk jest pusty.</p>'));
    }

    cartSumBox.on('mouseover mouseout', (event) => {
        const action = event.type === 'mouseover' ? 'show' : 'hide';
        cart.showCartSum(action);
    });

    cartSumBox.prepend(cartSumContent);
    fragment.append(cartSumBox);

    return fragment;
};