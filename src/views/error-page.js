import $ from 'jquery';

export const errorPage = () => {
    const fragment = $(new DocumentFragment());

    const errorBox = $('<section id="errorBox"></section>');

    const h1 = $('<h1>Error</h1>');
    const p = $('<p>Nie ma takiej podstrony!</p>');

    errorBox.prepend(p).prepend(h1);
    fragment.append(errorBox);

    return fragment;
};