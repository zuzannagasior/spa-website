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
            const { path } = detail;
            this.navigate(path);
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

    async navigate(path, data = {}) {
        console.log('path', path);
        if (this.has(path)) {
            //obsługa istniejącej ścieżki
            const { component } = this.get(path);
            const html = await component();
            // renderuje nowy widok wewnątrz elementu
            this.outlet.empty().append(html);
        } else {
            //obsługa nieistniejącej ścieżki
            console.log('fjdh');
            const html = errorPage();
            this.outlet.empty().append(html);
        }

        history.pushState(data, '', path);
    }
}