import $ from 'jquery';

export const navItem = (route) => {
    const li = $(`<li class="menuItem"></li>`);
    const a = $(`<a>${route.name}</a>`);

    a.on('click', (event) => {
        event.preventDefault();
        //emituje zdarzenie 'routechange' (bąbelkowanie)
        a.trigger('routechange', { path: route.path });
    });

    li.append(a);
    return li;
};

