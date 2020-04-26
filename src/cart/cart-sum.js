import $ from 'jquery';
import {
    Cart
} from './cart';

export const createCartSum = () => {
    const fragment = $(new DocumentFragment());
    const cartSumBox = $('<div class="cartSum"></div>');
    const cart = new Cart();
    const cartSumContent = $(new DocumentFragment());

    if (cart.getItSpaCart().length > 0) {
        let cartData = new Array();
        cart.getItSpaCart().forEach(item => {
            if (!cartData.find(c => c.name === item.name)) {
                cartData.push(item);
            }
        });

        cartSumContent.append($(`    
        <section></section>
        <button class="customButton">Przejdź do koszyka</button>`));

        const roomsListWrap = $(`<ul></ul>`);
        const roomsList = cartData.map(item => {
            console.log('item', item);
            const numberOfItems = cart.getNumberOfItems(item.name);
            return $(`<li><b>${item.name}</b> <div><span>${numberOfItems}x</span><span>${item.price},00 zł</span></div></li>`);
        })
        const sum = $(`<p>Suma: <b>${cart.getCartSum()},00 zł</b></p>`);
        roomsListWrap.prepend(roomsList);
        cartSumContent.find('section').prepend(sum).prepend(roomsListWrap);

        console.log(cartSumContent, 'cartSumContent');

    } else {
        cartSumContent.append($('<p>Twój koszyk jest pusty.</p>'));
    }

    cartSumBox.on('mouseover mouseout', (event) => {
        const action = event.type === 'mouseover' ? 'show' : 'hide';
        cart.showCartSum(action);
    });

    cartSumBox.prepend(cartSumContent);

    
    cartSumBox.find('button').on('click', () => {
        console.log("cartSumContent.find('button')", cartSumContent.find('button'));
        cartSumBox.find('button').trigger('routechange', { path: '/bookings' });
        cart.showCartSum('hide');
    });
    fragment.append(cartSumBox);

    return fragment;
};