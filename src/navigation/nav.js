import $ from 'jquery';
import { routes } from '../router/routes';
import { navItem } from './nav-item';
import { cartIcon } from '../assets/icons/cartIcon'
import {
    toggleIcon
} from './toggle-icon';


export const nav = () => {
    const fragment = $(new DocumentFragment());

    const navBar = $('<nav><ul class="menu"></ul></nav>');
    const navLogo = $('<span class="logo">SPA i RELAX</span>');
    let navBarItems = routes.map(route => {
        return navItem(route);
    });
    const navCartIcon = $('<span class="cartIcon"></span>').prepend(cartIcon);
    const navMenuIcon = toggleIcon();
    
    navBar.prepend(navLogo);
    navBar.find('ul').append(navBarItems);
    navBar.append(navCartIcon).append(navMenuIcon);

    fragment.append(navBar);

    return fragment;
}