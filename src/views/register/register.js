import $ from 'jquery';
import { API_URL } from '../../config/httpConfig';
import { loginModal } from '../../modals/login-modal'

const  checkPasswordStrength = (password) => {
    const passwordLength = password.length;

    const numberPattern = /\d+/;
    const minOneNumber = numberPattern.test(password);

    const capitalLetter = /[A-Z]+/;
    const minOneCapitalLetter = capitalLetter.test(password);

    const strengthTitle = 'Siła hasła: ';
    if (passwordLength >= 12 && minOneCapitalLetter && minOneNumber) {
        $('.passStrenght').html(`${strengthTitle}<span style="color: red">silne</span>`);
    } else if (passwordLength >= 8 && minOneCapitalLetter) {
        $('.passStrenght').html(`${strengthTitle}<span style="color: green">średnie</span>`);
    } else if (passwordLength === 0) {
        $('.passStrenght').empty();
    } else {
        $('.passStrenght').html(`${strengthTitle}<span style="color: blue">słabe</span>`);
    };

};

const validateUser = async (email) => {
    let invalidUser = false;

    await fetch(`${API_URL}/users?email=${email}`)
        .then(response => response.json())
        .then(data => {

            if (data.length > 0) {
                invalidUser =  true;
            };
        });
    
    return invalidUser;
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const registerForm = $('form');
    const newUser = {
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
            $(document.body).append(loginModal(true));
        })
};

export const register = () => {
    const fragment = $(new DocumentFragment());

    const registerBox = $('<section id="registerBox"></section>');
    const heading = $('<header><h1>Rejestracja</h1></header>');

    const state = history.state;

    const registerForm = $(`<form class="register">
                                <div>
                                    <label for="userEmail">Adres email*</label>
                                    <input type="text" id="userEmail" name="userEmail" class="customInput" />
                                    <span class="invalidMsg"></span>
                                </div>
                                <div>
                                    <label for="userPassword">Hasło*</label>
                                    <input type="password" id="userPassword" name="userPassword" class="customInput" />
                                    <span class="passStrenght"></span>
                                </div>
                                <div>
                                    <label for="confirmPassword">Powtórz hasło*</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" class="customInput" />
                                    <span class="invalidMsg"></span>
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

            // const hasMsg = registerForm.find('#userEmail').next().hasClass("invalidMsg");
            if (!emailValid) {
                const invalidMsg = $('<i>Niewłaściwy adres email.</i>');
                registerForm.find('#userEmail').next().html(invalidMsg);
                formInvalid = true;
            } else {
                registerForm.find('#userEmail').next().empty();
            }
        }

        // confirm password

        if ((e.target.id === 'confirmPassword' && !!$('#userPassword').val().trim()) || e.target.id === 'userPassword' && !!$('#confirmPassword').val().trim()) {
            //&& !!$('#userPassword').val().trim()
            const password = $('#userPassword').val();
            const confirmPassValue = $('#confirmPassword').val();

            const passwordValid = password === confirmPassValue;

            //const hasMsg = registerForm.find('#confirmPassword').next().hasClass("invalidMsg");
            if (!passwordValid) {
                const invalidMsg = $('<i>Podane hasła różnią się.</i>');

                registerForm.find('#confirmPassword').next().html(invalidMsg);
                formInvalid = true;
            } else {
                registerForm.find('#confirmPassword').next().empty();
            }
        }

        // if (registerForm.find('.invalidMsg').length > 0) {
        //     formInvalid = true;
        // }

        registerForm.find('button').attr('disabled', formInvalid);

        // check password strength

        if (e.target.id === 'userPassword') {
            checkPasswordStrength(e.target.value);
        }
    })

    // user validation
    registerForm.find('#userEmail').on('blur', async (e) => {
        if (!!e.target.value.trim()) {
            const invalidUser =  await validateUser(e.target.value);
            const invalidMsg = $('<i>Podany adres email jest już w systemie.</i>');

            if (invalidUser) {
                registerForm.find('#userEmail').next().html(invalidMsg);
            } else if (registerForm.find('#userEmail').next().html() === invalidMsg) {
                registerForm.find('#userEmail').next().empty();
            }

            $('.register').find('button').attr('disabled', invalidUser);

        }
    });


    registerBox.prepend(registerForm).prepend(heading);
    fragment.append(registerBox);

    return fragment;
};