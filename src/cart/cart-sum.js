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
        cartSumContent.append($(`    <section><p><b>Pokoje</b></p>
        <ul>
            <li>Pokój binarny<span>x1</span></li>
            <li>Pokój czteroosobowy<span>x2</span></li>
        </ul>
        <p><b>Zabiegi</b></p>
        <ul>
            <li>Masaż<span>x1</span></li>
            <li>Peeling<span>x2</span></li>
        </ul>
        </section>
        <button class="customButton">Przejdź do koszyka</button>`));
        
        cartSumContent.find('button').on('click', () => {
            all.find('button').trigger('routechange', { path: '/bookings' });
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