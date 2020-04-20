import $ from 'jquery';

export const room = (data) => {
    const p = $(`<p>${data.name}</p>`);
    // console.log('p', p);

    // a.on('click', (event) => {
    //     event.preventDefault();
    //     //emituje zdarzenie 'routechange' (bąbelkowanie)
    //     a.trigger('routechange', { path: route.path });
    // });
    return p;
};