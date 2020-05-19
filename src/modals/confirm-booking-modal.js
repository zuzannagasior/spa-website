import $ from 'jquery';
import { closeIcon } from '../assets/icons/closeIcon'
import spaLogo from '../assets/img/sparelaxlogo.png';

export const confirmModal = () => {

    const div = $(`<div id="infoModal">
                        <div class="modalWrapper">
                            <div class="logo"><img src="${spaLogo}" alt="" /></div>
                            <div class="modalContentWrapper">
                                <button class="close"></button>
                                <div class="modalContent">
                                    <h4>Rezerwacja została przyjęta</h4>
                                    <hr />
                                    <p>Rezerwacja pobytu zakończona pomyślnie.</p>
                                </div>
                            </div>    
                        </div>
                    </div>`);

    div.find('.close').prepend(closeIcon);
    div.find('.close').on('click', () => {
        $(document.body).find('#infoModal').remove();
    })
  
    return div;
};

