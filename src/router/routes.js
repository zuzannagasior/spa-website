import { home, rooms, treatments, bookings, summary, register } from '../views';

export const routes = [
    { name: 'Strona główna', path: '/', component: home, data: {}, title: 'Hotel SPA i RELAX Lubienice'},
    { name: 'Pokoje', path: '/rooms', component: rooms, data: {}, title: 'Pokoje | Hotel SPA i RELAX' },
    { name: 'Zabiegi', path: '/treatments', component: treatments, data: {}, title: 'Zabiegi | Hotel SPA i RELAX Lubienice' },
    { name: 'Koszyk', path: '/bookings', component: bookings, data: {}, title: 'Koszyk | Hotel SPA i RELAX Lubienice' },
    { name: 'Podsumowanie rezerwacji', path: '/summary', component: summary, data: {}, title: 'Podsumowanie rezerwacji | Hotel SPA i RELAX Lubienice' },
    { name: 'Rejestracja', path: '/register', component: register, data: {}, title: 'Rejestracja | Hotel SPA i RELAX Lubienice' }
];