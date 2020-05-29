import $ from 'jquery';
import 'babel-polyfill';
import {
    headingSection
} from './heading-section';
import { treatmentsList } from './treatments-list';
import { treatmentItem } from './treatment-item';

const getTreatmentsData = async (area = "all") => {
    const areaParameter = area !== "all" ? area : "";

    let response = await fetch(`/treatments/${areaParameter}`);
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