import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker';
import 'moment/locale/pl';
import './it-spa.scss';
import { Router, routes } from './router';
import { nav } from './navigation/nav'
import { footer } from './footer/footer'


const main = $('main');
const router = new Router(routes);

main.before(nav);
main.after(footer);

//element main - to outlet na widoki
router.mount(main);

// przy uruchomieniu strony pierwszy raz
//nawigujemy do ścieżki z paska adresu
router.init();