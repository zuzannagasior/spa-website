import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';
import { areas } from '../../config/treatmentAreas';
import { timeIcon, personIcon, arrowDownIcon, arrowUpIcon } from '../../assets/icons/index';

const showMore = (id) => {
    const treatmentInfo = $(`#${id}`).find('.treatmentInfo');
    const showMoreBtn = $(`#${id}`).find('.showMoreBtn');

    if (treatmentInfo.hasClass('showMore')) {
        treatmentInfo.removeClass("showMore");
        showMoreBtn.empty().prepend(`${arrowDownIcon} więcej`);
    } else {
        treatmentInfo.addClass("showMore");
        showMoreBtn.empty().prepend(`${arrowUpIcon} mniej`);    
    } 
}

const showHover = (event, id) => {
    const treatmentItemBox = $(`#${id}`).find('.imgBox');
    console.log('treatmentItemBox', treatmentItemBox);
    if (event.type === 'mouseover') {
        treatmentItemBox.addClass("showHover");
    } else {
        treatmentItemBox.removeClass("showHover");
    } 
}

export const treatmentItem = (data) => {
    const fragment = $(new DocumentFragment());
    const cart = new Cart();
    const treatmentItemBox = $(`<div id="${data.id}" class="treatmentItemBox"></div>`);

    const treatmentItemCont = $(`<div class="imgBox">
                                    <img src="${data.photoUrl}" alt=""></img>
                                    <button class="customButton addToCartBtn">Dodaj do koszyka</button>
                                </div>
                                <div class="treatmentItemCont">
                                    <h2>${data.name}</h2>
                                    <p><span>${timeIcon} ${data.time} min</span>
                                    <span>${personIcon} ${areas.get(data.area)}</span></p>
                                    <p class="treatmentInfo">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <footer><span class="price">${data.price},- zł</span><button class="showMoreBtn">${arrowDownIcon} więcej</button></footer>
                                </div>`);
    treatmentItemCont.find('button.addToCartBtn').on('click', () => {
        cart.add(data);
    });
    treatmentItemCont.find('button.showMoreBtn').on('click', () => {
        showMore(data.id);
    });
    treatmentItemBox.on('mouseover mouseout', (event) => {
        showHover(event, data.id);
    });

    treatmentItemBox.prepend(treatmentItemCont);
    fragment.append(treatmentItemBox);
    return fragment;
};