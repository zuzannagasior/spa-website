import $ from 'jquery';

export const linksSection = () => {
    const linksSection = $('<section id="links"></section>');

    const rooms = $(`<div>
                        <div class="imgBox"><img src="https://images.unsplash.com/photo-1559841644-08984562005a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt=""></img></div>
                        <div>
                            <h2>Pokoje</h2>
                            <p>Zobacz nasze pokoje... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <a>Zobacz więcej →</a>
                        </div>
                    </div>`);
    const treatments = $(`<div>
                            <div class="imgBox"><img src="https://images.unsplash.com/flagged/photo-1560944527-a4a429848866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80" alt=""></img></div>
                            <div>
                                <h2>Zabiegi</h2>
                                <p>Zobacz ofertę zabiegów... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <a>Zobacz więcej →</a>
                            </div>
                        </div>`);

    rooms.find('a').on('click', () => {
        rooms.find('a').trigger('routechange', { path: '/rooms' });
    });

    treatments.find('a').on('click', () => {
        treatments.find('a').trigger('routechange', { path: '/treatments' });
    });

    linksSection.prepend(treatments).prepend(rooms);

    return linksSection;
};