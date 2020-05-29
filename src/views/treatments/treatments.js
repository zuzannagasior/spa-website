import $ from 'jquery';
import {
    API_URL
} from '../../config/httpConfig';
import 'babel-polyfill';
import {
    headingSection
} from './heading-section';
import { treatmentsList } from './treatments-list';
import { treatmentItem } from './treatment-item';

const getTreatmentsData = async (area = "all") => {
    const areaParameter = area !== "all" ? `?area=${area}` : "";

    console.log(API_URL, 'API_URL');
    let response = await fetch(`${API_URL}/treatments${areaParameter}`);
    let data = await response.json()
    return data;
}

export const filterByArea = async (area) => {
    let availableTreatments;

    await getTreatmentsData(area)
        .then(function (treatments) {
            availableTreatments = treatments;
        })
        .catch(function (error) {
            console.log(error);
        });

    const availableTreatmentsToDisplay = availableTreatments.map(treatmentData => {
        return treatmentItem(treatmentData);
    });

    $('#treatmentsListCont').empty().prepend(availableTreatmentsToDisplay);
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
    const treatmentsListSectionToDisplay = treatmentsList(availableTreatments);

    fragment.append(headingSectionToDisplay).append(treatmentsListSectionToDisplay);

    return fragment;
};