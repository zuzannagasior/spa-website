import $ from 'jquery';
import { cartListSection } from './cart-list-section';

export const bookings = () => {
    const fragment = $(new DocumentFragment());

    const cartListSectionToDisplay = cartListSection();

    fragment.append(cartListSectionToDisplay);

    return fragment;
};