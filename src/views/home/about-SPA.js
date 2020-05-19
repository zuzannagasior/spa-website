import $ from 'jquery';
import spaLogo from '../../assets/img/sparelaxlogo.png';

export const aboutSPASection = () => {
    const aboutSection = $('<section id="about"></section>');

    const logo = $(`<div class="logo"><img src="${spaLogo}" alt="" /></div>`);
    const aboutSPAtxt = $('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>');

    aboutSection.prepend(aboutSPAtxt).prepend(logo);

    return aboutSection;
};