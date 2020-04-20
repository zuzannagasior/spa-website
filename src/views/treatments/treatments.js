import $ from 'jquery';
import {
    API_URL
} from '../../config/httpConfig';
import 'babel-polyfill';
import {
    treatment
} from './treatment';
import {
    headingSection
} from './headingSection';
import {
    filterSection
} from './filterSection';

const getTreatmentsData = async (area = "all") => {
    const areaParameter = area !== "all" ? `?area=${area}` : "";

    let response = await fetch(`${API_URL}/treatments${areaParameter}`);
    let data = await response.json()
    return data;
}

export const filterByArea = async (area) => {
    console.log('area', area);
    let availableTreatments;

    await getTreatmentsData(area)
        .then(function (treatments) {
            console.log(treatments);
            availableTreatments = treatments;
        })
        .catch(function (error) {
            console.log(error);
        });

    const availableTreatmentsToDisplay = availableTreatments.map(treatmentData => {
        return treatment(treatmentData);
    });
    
    $('#treatments').empty().prepend(availableTreatmentsToDisplay);
};

export const treatments = async () => {
    const fragment = $(new DocumentFragment());
    let availableTreatments;

    await getTreatmentsData()
        .then(function (treatments) {
            availableTreatments = treatments;
        })
        .catch(function (error) {
            console.log(error);
        });

    const headingSectionToDisplay = headingSection();
    const filterSectionToDisplay = filterSection();
    let availableTreatmentsSectionToDisplay = $(`<section id="treatments"></section>`);
    const availableTreatmentsToDisplay = availableTreatments.map(treatmentData => {
        return treatment(treatmentData);
    });
    availableTreatmentsSectionToDisplay.prepend(availableTreatmentsToDisplay);
    fragment.append(headingSectionToDisplay).append(filterSectionToDisplay).append(availableTreatmentsSectionToDisplay);

    return fragment;
};