import $ from 'jquery';
import { arrowDownDblIcon } from '../../assets/icons/index';

export const headingSection = () => {
    const heading = $('<header id="homeHeading"></header>');
    const seeMoreBtn = $(`<a href="#about">${arrowDownDblIcon}</a>`);

    heading.prepend(seeMoreBtn);

    return heading;
};