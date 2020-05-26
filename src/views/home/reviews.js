import $ from 'jquery';
import { arrowLeftIcon } from '../../assets/icons/index';
import { arrowRightIcon } from '../../assets/icons/index';

const reviews = [{photoUrl: "https://images.unsplash.com/photo-1541089404510-5c9a779841fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                    author: "Ania i Jacek z Włocławka",
                    text: "Było bardzo fajnie. Polecamy."},
                    {photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                    author: "Joanna z Warszawy",
                    text: "Super, super, super."},
                    {photoUrl: "https://images.unsplash.com/photo-1501901609772-df0848060b33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                    author: "Wiola i Marcin",
                    text: "Bardzo udany wyjazd, w pięknym miejscu."}];

const createReviewBox = (i) => {
    const review = reviews[i];

    const result = $(`<div>
                        <div class="imgBox"><img src="${review.photoUrl}" alt=""></img></div>
                        <div>
                            <h3>${review.author}</h3>
                            <q>${review.text}</q>
                        </div>
                    </div>`);

    return result;
};

export const reviewsSection = () => {
    const reviewsSection = $('<section id="reviews"></section>');

    const reviewNav = $(`<button class="previous">${arrowLeftIcon}</button><button class="next">${arrowRightIcon}</button>`);

    let indexOfReview = 0;
    const reviewBox = createReviewBox(indexOfReview);

 
    reviewsSection.prepend(reviewNav);
    reviewsSection.find('button:first-child').after(reviewBox);

    reviewsSection.find('button').on('click', (e) => {
        const target = e.currentTarget.className;
        const numberOfReviews = reviews.length;

        if (target === 'next') {
            if (indexOfReview < numberOfReviews - 1) {
                indexOfReview++;
            } else {
                indexOfReview = 0;
            }
        } else if (target === 'previous') {
            if (indexOfReview > 0) {
                indexOfReview--;
            } else {
                indexOfReview = numberOfReviews -1;
            }
        }
        const reviewBox = createReviewBox(indexOfReview);
        $('#reviews').find('button:first-child').next().remove();
        $('#reviews').find('button:first-child').after(reviewBox);
    });

    const intervalId = setInterval(() => {
        if ($('#reviews').length > 0) {
            const numberOfReviews = reviews.length;

            if (indexOfReview < numberOfReviews - 1) {
                indexOfReview++;
            } else {
                indexOfReview = 0;
            }
    
            const reviewBox = createReviewBox(indexOfReview);
            $('#reviews').find('button:first-child').next().remove();
            $('#reviews').find('button:first-child').after(reviewBox);    
        } else {
            clearInterval(intervalId);
        }
        }, 5000);

    return reviewsSection;
};