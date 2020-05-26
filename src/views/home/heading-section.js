import $ from 'jquery';
import { arrowDownDblIcon } from '../../assets/icons/index';

export const headingSection = () => {
    const heading = $('<header id="homeHeading"></header>');
    const seeMoreBtn = $(`<a>${arrowDownDblIcon}</a>`);

    seeMoreBtn.on('click', () => { 
        $('html, body').animate({
            scrollTop: $("#about").offset().top - $("nav").height()
        }, 500);
    });

    heading.prepend(seeMoreBtn);

    return heading;
};