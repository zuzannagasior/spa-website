import { home, rooms, treatments, bookings, summary, register } from '../views';

export const routes = [
    { name: 'Home', path: '/', component: home, data: {} },
    { name: 'Rooms', path: '/rooms', component: rooms, data: {} },
    { name: 'Treatments', path: '/treatments', component: treatments, data: {} },
    { name: 'Bookings', path: '/bookings', component: bookings, data: {} },
    { name: 'Summary', path: '/summary', component: summary, data: {} },
    { name: 'Register', path: '/register', component: register, data: {} }
];