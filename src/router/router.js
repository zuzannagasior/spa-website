import $ from 'jquery';
import { errorPage } from '../views/error-page';
import 'babel-polyfill';

export class Router {

    constructor(routes) {
        this.routes = routes;
        this.outlet;
        this.body = $(document.body)
    }

    mount(outlet) {
        this.outlet = outlet;
        this.body.on('routechange', (event, detail) => {
            const { path, data } = detail;
            this.navigate(path, data);
        });
    }

    init() {
        const path = location.pathname;
        this.navigate(path);
    }

    get(path) {
        return this.routes.find(route => route.path === path);
    }

    has(path) {
        return this.get(path) !== undefined;
    }

    async navigate(path, data = {},) {
        console.log(data, 'data router');
        history.pushState(data, '', path);

        if (this.has(path)) {
            //obsługa istniejącej ścieżki
            const { component, title } = this.get(path);
            const html = await component();
            // renderuje nowy widok wewnątrz elementu
            this.outlet.empty().append(html);
            $(window).scrollTop(0);
            document.title = title;
        } else {
            //obsługa nieistniejącej ścieżki
            console.log('fjdh');
            const html = errorPage();
            this.outlet.empty().append(html);
        }
    }
}