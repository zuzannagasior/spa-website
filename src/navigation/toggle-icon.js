import $ from 'jquery';
import { menuIcon } from '../assets/icons/menuIcon'
import { closeIcon } from '../assets/icons/closeIcon'

const toggleMenu = () => {
    const menuUl = $('.menu');
    const toggleSpan = $('.toggle');
    
    if (menuUl.hasClass("active")) {
        console.log('jestem');
        menuUl.removeClass("active");
        toggleSpan.empty().prepend(menuIcon);
    } else {
        menuUl.addClass("active");
        toggleSpan.empty().prepend(closeIcon);
    }
};

export const createToggleIcon = () => {
    const toggleIcon = $('<span class="toggle"></span>').append(menuIcon);

    toggleIcon.on('click', () => {
        toggleMenu();
    });

    return toggleIcon;
};