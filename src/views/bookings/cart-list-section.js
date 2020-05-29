import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';
import { cartItem } from './cart-item';
import { datePickerSection, validateDate } from './date-picker-section';

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
    let roomsListToDisplay;
    if (roomsList.length > 0) {
        roomsListToDisplay = roomsList.map(item => {
            return cartItem(item);
        });
    } else {
        roomsListToDisplay = $(`<p>Brak wybranego pokoju w koszyku. Przejdź do zakładki <i>Pokoje</i> by wybrać jeden.</p>`);
    }


    const treatment = $('<h3><b>Zabiegi</b></h3>');
    const treatmentsList = cartData.filter(item => Object.keys(item).includes('time'));
    let treatmentsListToDisplay;
    if (treatmentsList.length > 0) {
        treatmentsListToDisplay = treatmentsList.map(item => {
            return cartItem(item);
        });
    } else {
        treatmentsListToDisplay = $(`<p>Brak wybranych zabiegów w koszyku. Przejdź do zakładki <i>Zabiegi</i> by dobrać odpowiednią pielęgnację.</p>`);
    }

    const datePickerH = $('<h3><b>Wybierz datę pobytu</b></h3>');
    const datePicker = datePickerSection();

    const sum = $(`<div class="summary"><span>Suma: <b><span class="sum">${cart.getCartSum()}</span>,00 zł</b></span>
                        <button class="customButton colored">Przejdź do podsumowania</button>
                    </div>`);

    sum.find('button').on('click', () => {

        const dateValid = validateDate();

        if (dateValid) {
            const data = {
                dateFrom: $('#dateFrom').data("DateTimePicker").viewDate().toDate(),
                dateTo: $('#dateTo').data("DateTimePicker").viewDate().toDate()
            };
            sum.find('button').trigger('routechange', { path: '/summary', data: data });

        }
    });

    cartListBox.prepend(sum).prepend(treatmentsListToDisplay).prepend(treatment)
    .prepend(roomsListToDisplay).prepend(rooms).prepend(datePicker).prepend(datePickerH).prepend(heading);
    return cartListBox;
};