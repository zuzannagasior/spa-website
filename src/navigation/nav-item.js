import $ from 'jquery';

export const navItem = (route) => {
    const li = $(`<li class="nav-item"></li>`);
    const a = $(`<a class="nav-link text-light">${route.name}</a>`);

    a.on('click', (event) => {
        event.preventDefault();
        //emituje zdarzenie 'routechange' (bąbelkowanie)
        a.trigger('routechange', { path: route.path });
    });

    li.append(a);
    return li;
};

