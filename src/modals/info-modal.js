import $ from 'jquery';
import { closeIcon } from '../assets/icons/closeIcon'
import spaLogo from '../assets/img/sparelaxlogo.png';

export const infoModal = (data) => {
    $("body").addClass("modal-open");

    const treatmentPath = window.location.pathname.includes('treatment');
    const roomsPath = window.location.pathname.includes('rooms');

    let modalText;
    let btnText;
    if (treatmentPath) {
        modalText = 'Jeżeli jeszcze nie wybrałeś pokoju przejdź do zakładki <i>Pokoje</i> i wybierz odpowiedni dla siebie.';
        btnText = 'Przeglądaj pokoje';
    } else if (roomsPath) {
        modalText = 'Przejdź do zakładki <i>Zabiegi</i>, aby dobrać dla siebie odpowiednią pielęgnację lub przejdź do koszyka by wybrać datę pobytu i sfinalizować zakup.';
        btnText = 'Przeglądaj zabiegi';
    }

    const div = $(`<div id="infoModal">
                        <div class="modalWrapper">
                            <div class="logo"><img src="${spaLogo}" alt="" /></div>
                            <div class="modalContentWrapper">
                                <button class="close"></button>
                                <div class="modalContent">
                                    <h4>Wybrałeś <b>${data.name}</b>.</h4>
                                    <hr />
                                    <p>${modalText}</p>
                                </div>
                                <div class="modalNav">
                                    <button class="customButton colored">${btnText}</button>
                                    <button class="customButton">Przejdź do koszyka</button>
                                </div>
                            </div>    
                        </div>
                    </div>`);

    div.find('.close').prepend(closeIcon);
    div.find('.close').on('click', () => {
        $(document.body).find('#infoModal').remove();
        $("body").removeClass("modal-open");
    })
    div.find('.modalNav button:first-child').on('click', () => {
        if (treatmentPath) {
            div.find('.modalNav button:first-child').trigger('routechange', { path: '/rooms' });
        } else if (roomsPath) {
            div.find('.modalNav button:first-child').trigger('routechange', { path: '/treatments' });
        }
        $(document.body).find('#infoModal').remove();
        $("body").removeClass("modal-open");
    })
    div.find('.modalNav button:last-child').on('click', () => {
        div.find('.modalNav button:last-child').trigger('routechange', { path: '/bookings' });
        $(document.body).find('#infoModal').remove();
        $("body").removeClass("modal-open");
    })
  
    return div;
};

