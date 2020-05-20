import $ from 'jquery';
import spaLogo from '../assets/img/sparelaxlogo.png';
import { envelopeIcon, phoneIcon } from '../assets/icons/index';

export const createContact = () => {

    const contact = $(`<section id="contact">
                        <div class="imgBox"><img src="${spaLogo}" alt=""></img></div>
                        <div>
                            <h4>Hotel SPA i relax</h4>
                            <p>ul. Relaksu 123
                            <br />
                            43-700, Lubienice</p>
                            
                            <p>${envelopeIcon}contact@spairelax.pl
                            <br />
                            ${phoneIcon}telefon 685-345-356</p>
                        </div>
                    </section>`);


    return contact;
}