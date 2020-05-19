import { home, rooms, treatments, bookings, summary, register } from '../views';

export const routes = [
    { name: 'Strona główna', path: '/', component: home, data: {} },
    { name: 'Pokoje', path: '/rooms', component: rooms, data: {} },
    { name: 'Zabiegi', path: '/treatments', component: treatments, data: {} },
    { name: 'Rezerwacja', path: '/bookings', component: bookings, data: {} },
    { name: 'Podsumowanie rezerwacji', path: '/summary', component: summary, data: {} },
    { name: 'Rejestracja', path: '/register', component: register, data: {} }
];