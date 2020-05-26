import $ from 'jquery';
import { arrowDownDblIcon } from '../../assets/icons/index';

export const headingSection = () => {
    const heading = $('<header id="treatmentHeading"><header>');

    const title = $('<p>Zabiegi</p>');

    const seeMoreBtn = $(`<a>${arrowDownDblIcon}</a>`);

    seeMoreBtn.on('click', () => { 
        $('html, body').animate({
            scrollTop: $("#treatmentsList").offset().top  - $("nav").height()
        }, 500);
    });

    heading.prepend(title).prepend(seeMoreBtn);

    return heading;
};