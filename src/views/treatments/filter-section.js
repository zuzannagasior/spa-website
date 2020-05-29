import $ from 'jquery';
import { areas } from '../../config/treatmentAreas';
import { filterByArea } from './treatments';

export const filterSection = () => {
    const label = $(`<label for="filters">Filtruj</label>`);

    const filters = $(`<select id="filters" class="form-control"></select>`);

    let filterOptions = new Array;
    areas.forEach((value, key) => {
        let filterOption = $(`<option value=${key}>${value}</option>`);
  
        return filterOptions.push(filterOption);
    });

    filters.prepend(filterOptions);
    filters.after(label);

    filters.on('change', (event) => {
        filterByArea(event.target.value);
    });

    return filters;
};
