import $ from 'jquery';
import { treatmentItem } from './treatment-item';
import {
    filterSection
} from './filter-section';

export const treatmentsList = (availableTreatments) => {
    const fragment = $(new DocumentFragment());
    const treatmentsListWrap = $('<section id="treatmentsList"></section>');
    const treatmentsListIntro = $(`<div class="treatmentsListIntro">
                                <h1>Zabiegi</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>`);
    const treatmentsListCont =  $('<div id="treatmentsListCont"></div>');

    const filterSectionToDisplay = $('<section class="filters"></section>').prepend(filterSection());

    const availableTreatmentsToDisplay = availableTreatments.map(treatmentData => {
        return treatmentItem(treatmentData);
    });
    treatmentsListCont.prepend(availableTreatmentsToDisplay);
    treatmentsListWrap.prepend(treatmentsListCont).prepend(filterSectionToDisplay).prepend(treatmentsListIntro);
    fragment.append(treatmentsListWrap);

    return fragment;
};