import $ from 'jquery';
import { API_URL } from '../config/httpConfig';
import { closeIcon } from '../assets/icons/closeIcon'
import spaLogo from '../assets/img/sparelaxlogo.png';
import { confirmModal } from './confirm-booking-modal'

const checkUser = async (e, p) => {
    let invalidUser = true;

    await fetch(`${API_URL}/users?email=${e}`)
        .then(response => response.json())
        .then(data => {
            console.log('data.length', data.length);

            if (data.length > 0) {
                invalidUser =  data[0].password !== p;
            };
        });
    
    return invalidUser;
};

export const loginModal = (afterRegister = false) => {

    const div = $(`<div id="infoModal">
                        <div class="modalWrapper">
                            <div class="logo"><img src="${spaLogo}" alt="" /></div>
                            <div class="modalContentWrapper">
                                <button class="close"></button>
                                <div class="modalContent">
                                    <form class="login">
                                        <h3>Zaloguj się</h3>
                                        <input name="userEmail" id="userEmail" type='text' placeholder="Adres email" class="customInput" />
                                        <input name="userPassword" id="userPassword" type='password' placeholder="Hasło" class="customInput" />
                                        <button type="submit" class="customButton colored" disabled>Zaloguj</button>
                                        <p>Nie masz konta? <a>Zarejestruj się!</a></p>
                                    </form>
                                </div>
                            </div>    
                        </div>
                    </div>`);

    div.find('.close').prepend(closeIcon);
    div.find('.close').on('click', () => {
        $(document.body).find('#infoModal').remove();
    });

    const loginForm = div.find('.login');

    if (afterRegister) {
        loginForm.before('<div class="validMsg"><p>Rejestracja zakończona pomyślnie. Zaloguj się aby zatwierdzić rezerwację.</p></div>');
    }

    console.log('loginForm', loginForm);
    loginForm.find('input').on('input', () => {
        const email = loginForm.find('#userEmail').val();
        const password = loginForm.find('#userPassword').val();

        loginForm.find('button').attr('disabled', !(!!email.trim() && !!password.trim()));
    })

    loginForm.on('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.find('#userEmail').val();
        const password = loginForm.find('#userPassword').val();

        const invalidUser =  await checkUser(email, password);

        if (!invalidUser) {
            loginForm.find('button').trigger('routechange', { path: '/' });
            $(document.body).find('#infoModal').remove();

            $(document.body).append(confirmModal());
        } else {
            const invalidUserMsg = $('<span class="invalidMsg"><i>Nieprawidłowy login lub hasło.</i></span>');

            loginForm.find('.invalidMsg').remove();
            loginForm.find('h3').after(invalidUserMsg);
        };

    })
    loginForm.find('a').on('click', () => {
        loginForm.find('a').trigger('routechange', { path: '/register' });
        $(document.body).find('#infoModal').remove();

    })
  
    return div;
};

