import $ from 'jquery';
import 'babel-polyfill';
import { API_URL } from '../../config/httpConfig';
import { room } from './room';
import { headingSection } from './heading-section';

const getRoomsData = async () => {
    let response = await fetch(`${API_URL}/rooms`);
    let data = await response.json()
    return data;
}

export const rooms = async () => {
    const fragment = $(new DocumentFragment());
    let availableRooms;

    await getRoomsData()
        .then(function (rooms) {
            availableRooms = rooms;
        })
        .catch(function (error) {
            console.log(error);
        });

    const headingSectionToDisplay = headingSection();

    const availableRoomsToDisplay = availableRooms.map(roomData => {
        return room(roomData);
    });
    fragment.append(headingSectionToDisplay).append(availableRoomsToDisplay);

    return fragment;
};