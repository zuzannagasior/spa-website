import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';
import { cartItem } from './cart-item';
import { datePickerSection } from './date-picker-section';

export const cartListSection = () => {
    const cart = new Cart();

    const cartListBox = $('<section id="cartListBox"></section>');
    const heading = $('<header><h1>Koszyk</h1></header>');

    let cartData = new Array();
    cart.getItSpaCart().forEach(item => {
        if (!cartData.find(c => c.name === item.name)) {
            cartData.push(item);
        }
    });

    const rooms = $('<h3><b>Pokoje</b></h3>');
    const roomsList = cartData.filter(item => Object.keys(item).includes('beds'));
    const roomsListToDisplay = roomsList.map(item => {
        return cartItem(item);
    });

    const treatment = $('<h3><b>Zabiegi</b></h3>');
    const treatmentsList = cartData.filter(item => Object.keys(item).includes('time'));
    const treatmentsListToDisplay = treatmentsList.map(item => {
        return cartItem(item);
    });

    const datePickerH = $('<h3><b>Wybierz datę pobytu</b></h3>');
    const datePicker = datePickerSection();

    const sum = $(`<div class="summary"><span>Suma: <b><span class="sum">${cart.getCartSum()}</span>,00 zł</b></span>
                        <button class="customButton">Przejdź do podsumowania</button>
                    </div>`);

    cartListBox.prepend(sum).prepend(treatmentsListToDisplay).prepend(treatment)
    .prepend(roomsListToDisplay).prepend(rooms).prepend(datePicker).prepend(datePickerH).prepend(heading);
    return cartListBox;
};