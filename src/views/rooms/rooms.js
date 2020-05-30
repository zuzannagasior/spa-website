import $ from 'jquery';
import 'babel-polyfill';
import { roomsList } from './rooms-list';
import { headingSection } from './heading-section';

const getRoomsData = async () => {
    let response = await fetch(`/roomsdb`);
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
    const roomsListSectionToDisplay = roomsList(availableRooms);

    fragment.append(headingSectionToDisplay).append(roomsListSectionToDisplay);

    return fragment;
};