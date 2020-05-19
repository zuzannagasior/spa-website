import $ from 'jquery';
import { headingSection } from './heading-section';
import { aboutSPASection } from './about-SPA';
import { photoLineSection } from './photo-line';
import { linksSection } from './links';
import { reviewsSection } from './reviews';

export const home = () => {
    const fragment = $(new DocumentFragment());

    const headingSectionToDisplay = headingSection();
    const aboutSPASectionToDisplay = aboutSPASection();
    const photoLineSectionToDisplay = photoLineSection();
    const linksSectionToDisplay = linksSection();
    const reviewsSectionToDisplay = reviewsSection();

    fragment.append(headingSectionToDisplay).append(aboutSPASectionToDisplay).append(photoLineSectionToDisplay)
    .append(linksSectionToDisplay).append(reviewsSectionToDisplay);

    return fragment;
};