import $ from 'jquery';
import { arrowDownDblIcon } from '../../assets/icons/index';

export const headingSection = () => {
    const heading = $('<header id="roomsHeading"><header>');

    const title = $('<p>Pokoje</p>');

    const seeMoreBtn = $(`<a>${arrowDownDblIcon}</a>`);

    
    seeMoreBtn.on('click', () => { 
        console.log('$("nav").height()', $("nav").height());
        console.log('$("#roomsList").offset().top', $("#roomsList").offset().top);

        $('html, body').animate({
            scrollTop: $(".roomsListIntro").offset().top - $("nav").height()
        }, 500);
    });

    heading.prepend(title).prepend(seeMoreBtn);

    return heading;
};