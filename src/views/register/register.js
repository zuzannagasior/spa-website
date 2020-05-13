import $ from 'jquery';
import { API_URL } from '../../config/httpConfig';
import { loginModal } from '../../modals/login-modal'

const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('e', e);

    const registerForm = $('form');
    const newUser = {
        login: registerForm.find('#userLogin').val(),
        password: registerForm.find('#userPassword').val(),
        email: registerForm.find('#userEmail').val()
    };

    fetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify({...newUser}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            $(document.body).append(loginModal(true));
        })

    console.log(newUser, 'newUser');
};

export const register = () => {
    const fragment = $(new DocumentFragment());

    const registerBox = $('<section id="registerBox"></section>');
    const heading = $('<header><h1>Rejestracja</h1></header>');

    const state = history.state;
    console.log(state, 'state')
    console.log(history, 'history')

    const registerForm = $(`<form class="register">
                                <div>
                                    <label for="userLogin">Login*</label>
                                    <input text="text" id="userLogin" name="userLogin" class="customInput" />
                                </div>
                                <div>
                                    <label for="userEmail">Adres email*</label>
                                    <input type="text" id="userEmail" name="userEmail" class="customInput" />
                                </div>
                                <div>
                                    <label for="userPassword">Hasło*</label>
                                    <input type="password" id="userPassword" name="userPassword" class="customInput" />
                                </div>
                                <div>
                                    <label for="confirmPassword">Powtórz hasło*</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" class="customInput" />
                                </div>

                                <p>* <span>- pole jest wymagane</span></p>
                                <div>
                                    <button type="button" class="customButton secondary">Wstecz</button>
                                    <button type="submit" class="customButton colored" disabled>Zatwierdź</button>
                                </div>
                            </form>`);

    registerForm.find('button:first-child').on('click', () => {
        registerForm.find('button:first-child').trigger('routechange', { path: '/bookings' });
    });
    registerForm.on('submit', (e) => onFormSubmit(e));

    // validation
    registerForm.find('input').on('input', (e) => {
        let formInvalid = false;
        registerForm.find('input').each((i, el) => {
            if (!$(el).val().trim()) {formInvalid = true;};
        })
        
        // email validation
        if (e.target.id === 'userEmail' && !!e.target.value.trim()) {
            const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const emailValue = e.target.value;
            const emailValid = regExp.test(emailValue.toLowerCase());

            const hasMsg = registerForm.find('#userEmail').next().hasClass("invalidMsg");
            if (!emailValid && !hasMsg) {
                const invalidMsg = $('<span class="invalidMsg"><i>Niewłaściwy adres email.</i></span>');

                registerForm.find('#userEmail').after(invalidMsg);
            } else if (emailValid && hasMsg) {
                registerForm.find('#userEmail').next().remove();
            }
        }

        // confirm password

        if ((e.target.id === 'confirmPassword' && !!$('#userPassword').val().trim()) || e.target.id === 'userPassword' && !!$('#confirmPassword').val().trim()) {
            //&& !!$('#userPassword').val().trim()
            const password = $('#userPassword').val();
            const confirmPassValue = $('#confirmPassword').val();

            const passwordValid = password === confirmPassValue;

            const hasMsg = registerForm.find('#confirmPassword').next().hasClass("invalidMsg");
            if (!passwordValid && !hasMsg) {
                const invalidMsg = $('<span class="invalidMsg"><i>Podane hasła różnią się.</i></span>');

                registerForm.find('#confirmPassword').after(invalidMsg);
            } else if (passwordValid && hasMsg) {
                registerForm.find('#confirmPassword').next().remove();
            }
        }

        if (registerForm.find('.invalidMsg').length > 0) {
            formInvalid = true;
        }

        registerForm.find('button').attr('disabled', formInvalid);
    })



    registerBox.prepend(registerForm).prepend(heading);
    fragment.append(registerBox);

    return fragment;
};