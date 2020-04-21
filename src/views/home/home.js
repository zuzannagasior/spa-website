import $ from 'jquery';
import { headingSection } from './heading-section';

export const home = () => {
    const fragment = $(new DocumentFragment());

    const headingSectionToDisplay = headingSection();

    fragment.append(headingSectionToDisplay);

    return fragment;
};