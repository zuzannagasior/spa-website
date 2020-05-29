import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';
import { loginModal } from '../../modals/login-modal'

const getNumberOfDays = () => {
    const state = history.state;

    let dateFrom = state.dateFrom.setHours(0,0,0,0);
    let dateTo = state.dateTo.setHours(0,0,0,0);

    return (dateTo - dateFrom)/86400000;
}

export const summary = () => {
    const fragment = $(new DocumentFragment());
    const cart = new Cart();

    const summaryBox = $('<section id="summaryBox"></section>');
    const heading = $('<header><h1>Podsumowanie rezerwacji</h1></header>');

    const state = history.state;
    
    const summaryCont = $(new DocumentFragment());
    
    const dateSection = $(`<div class="summarySection">
                                <div>Data pobytu</div>
                                <div>Od ${state.dateFrom.toLocaleDateString()} do ${state.dateTo.toLocaleDateString()}</div>
                            </div>`); 
    const daysSection = $(`<div class="summarySection">
                            <div>Liczba dni pobytu</div>
                            <div>${getNumberOfDays()}</div>
                        </div>`); 

    let cartData = new Array();
    cart.getItSpaCart().forEach(item => {
        if (!cartData.find(c => c.name === item.name)) {
            cartData.push(item);
        }
    });
    const roomsList = cartData.filter(item => Object.keys(item).includes('beds'));
    const roomsListToDisplay = roomsList.map(item => {
        const numberOfItems = cart.getNumberOfItems(item.name);
        return $(`<li><div>
                    <span>x${numberOfItems}</span>
                    <div class="imgBox">
                        <img src="${item.photoUrl}" alt="" / >
                        </div>
                    ${item.name}
                    </div>
                    <span>${item.price},00 zł / noc</span>
                </li>`);
    });

    const roomsSection = $(`<div class="summarySection">
                            <div>Pokoje</div>
                            <div><ul></ul></div>
                        </div>`); 
    roomsSection.find('div:last-child ul').prepend(roomsListToDisplay);

    const treatmentsList = cartData.filter(item => Object.keys(item).includes('time'));
    const treatmentsListToDisplay = treatmentsList.map(item => {
        const numberOfItems = cart.getNumberOfItems(item.name);
        return $(`<li><div>
                    <span>x${numberOfItems}</span>
                    <div class="imgBox">
                        <img src="${item.photoUrl}" alt="" / >
                        </div>
                    ${item.name}
                    </div>
                    <span>${item.price},00 zł</span>
                </li>`);
    });
    const treatmentsSection = $(`<div class="summarySection">
                        <div>Zabiegi</div>
                        <div><ul></ul></div>
                    </div>`); 
    treatmentsSection.find('div:last-child ul').prepend(treatmentsListToDisplay);

    const sumSection = $(`<div class="summarySection">
                    <div>Suma</div>
                    <div><b>${cart.getCartSum(getNumberOfDays())},00 zł</b></div>
                </div>`); 
    const btnsSection = $(`<div class="btnsSection">
                                <button type="button" class="customButton secondary">Wstecz</button>
                                <button type="button" class="customButton colored">Rezerwuj</button>
                            </div>`);

    btnsSection.find('button:first-child').on('click', () => {
        history.back();
    });
    btnsSection.find('button:last-child').on('click', () => {
        $(document.body).append(loginModal());
    });

    summaryCont.append(dateSection).append(daysSection).append(roomsSection).append(treatmentsSection).append(sumSection);
    summaryBox.prepend(btnsSection).prepend(summaryCont).prepend(heading);
    fragment.append(summaryBox);

    return fragment;
};