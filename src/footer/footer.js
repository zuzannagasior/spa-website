import $ from 'jquery';
import { createContact } from './contact';

export const footer = () => {
    const fragment = $(new DocumentFragment());

    const contactSection = createContact();
    const footerSection = $(`<footer id="footer">Created by Zuzanna Gąsior. All rights reserved.</footer>`);

    fragment.append(contactSection).append(footerSection);

    return fragment;
}