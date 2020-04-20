import $ from 'jquery';

export const errorPage = () => {
    const fragment = $(new DocumentFragment());

    const h1 = $('<h1>Error</h1>');
    const p = $('<p>Nie ma takiej podstrony!</p>');

    fragment.append(h1).append(p);

    return fragment;
};