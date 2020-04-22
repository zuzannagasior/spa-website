import $ from 'jquery';
import { routes } from '../router/routes';
import { navItem } from './nav-item';
import {
    createToggleIcon
} from './toggle-icon';
import {
    createCartIcon
} from './cart-icon';
import {
    createCartSum
} from '../cart/cart-sum';

export const nav = () => {
    const fragment = $(new DocumentFragment());

    const navBar = $('<nav><ul class="menu"></ul></nav>');
    const navLogo = $('<span class="logo">SPA i RELAX</span>');
    let navBarItems = routes.map(route => {
        return navItem(route);
    });
    const navCartIcon = createCartIcon();
    const navMenuIcon = createToggleIcon();
    
    navBar.prepend(navLogo);
    navBar.find('ul').append(navBarItems);
    navBar.append(navCartIcon).append(navMenuIcon);
    const cartSum = createCartSum();

    fragment.append(navBar).append(cartSum);

    return fragment;
}