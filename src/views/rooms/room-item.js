import $ from 'jquery';
import { bedIcon } from '../../assets/icons/bedIcon';
import { peopleIcon } from '../../assets/icons/peopleIcon';
import {
    Cart
} from '../../cart/cart';


export const roomItem = (data) => {
    const fragment = $(new DocumentFragment());
    const cart = new Cart();
    const roomItemBox = $(`<div class="roomItemBox"></div>`);
    const roomItemImg = $(`<div class="imgBox"><img src="${data.photoUrl}" alt=""></img></div>`);

    const roomItemCont = $(`<div class="roomItemCont">
                                <h2>${data.name}</h2>
                                <p><span>${peopleIcon} ${data.guests}</span>
                                <span>${bedIcon} ${data.beds}</span></p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <footer>
                                    <span>${data.price},- zł</span>
                                    <button class="customButton">Rezerwuj</button>
                                </footer>
                            </div>`);
    roomItemCont.find('button').on('click', () => {
                                cart.add(data);
                            });

    roomItemBox.prepend(roomItemCont).prepend(roomItemImg);
    fragment.append(roomItemBox);
    return fragment;
};