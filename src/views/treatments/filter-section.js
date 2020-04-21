import $ from 'jquery';
import { areas } from '../../config/treatmentAreas';
import { filterByArea } from './treatments';

export const filterSection = () => {
    console.log('treatmentAreas',areas);
    let filterBtns = new Array;
    areas.forEach((value, key) => {
        let filterBtn = $(`<button value=${key}>${value}</button>`);
        console.log('key', key);
        filterBtn.on('click', (event) => {
            filterByArea(event.target.value);
        });
        return filterBtns.push(filterBtn);
    });

    return filterBtns;
};
