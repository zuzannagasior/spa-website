import $ from 'jquery';
import {
    Cart
} from '../../cart/cart';

export const validateDate = () => {
    console.log($('#dateTo').data("DateTimePicker"));
    console.log($('[name="dateTo"]').val());
    let valid = true;

    if (!$('[name="dateFrom"]').val().trim() || !$('[name="dateTo"]').val().trim()) {
        valid = false;
        const invalidMsg = $('<i>Uzupełnij datę pobytu.</i>');
        $('.datePickerWrap').find('.invalidMsg').html(invalidMsg);
    } else {
        $('.datePickerWrap').find('.invalidMsg').empty();
    }

    return valid;
}

const getNumberOfDays = () => {
    const dateFrom = $('#dateFrom').data("DateTimePicker").viewDate().toDate().setHours(0,0,0,0);
    const dateTo = $('#dateTo').data("DateTimePicker").viewDate().toDate().setHours(0,0,0,0);

    return (dateTo - dateFrom)/86400000;
}

export const datePickerSection = () => {
    const fragment = $(new DocumentFragment());
    const cart = new Cart();

    const datePickerSectionWrapper = $(`<div class="datePickerWrap"></div>`);

    const datePicker = $(`
        <div>
            <div class="datePickerCont">            
                <label for="dateFrom">Data przyjazdu:</label>
                <div class='input-group date' id='dateFrom'>
                    <input name="dateFrom" type='text' placeholder="DD/MM/YYYY" class="customInput" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
            <div class="datePickerCont">
                <label for="dateTo">Data wyjazdu:</label>
                <div class='input-group date' id='dateTo'>
                    <input name="dateTo" type='text' placeholder="DD/MM/YYYY" class="customInput" />
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
        </div>
        <span class="invalidMsg"></span>`);


    datePicker.find('#dateFrom').datetimepicker({
        useCurrent: false,
        locale: 'pl',
        format: 'DD/MM/YYYY',
        minDate : new Date(),
        defaultDate: new Date()
    });

    datePicker.find('#dateTo').datetimepicker({
        useCurrent: false,
        locale: 'pl',
        format: 'DD/MM/YYYY',
        minDate : new Date()
        });

    datePicker.find("#dateFrom").on("dp.change", function (e) {
        const daysDifference = 31536000000; //365 days in minimist
        const dateFrom = Date.now(e.date);

        if (e.date) {
            $('#dateTo').data("DateTimePicker").minDate(e.date.add(1, 'days'));
            $('#dateTo').data("DateTimePicker").maxDate(new Date(dateFrom + daysDifference));
        }
        $(document).find(`.sum`).html(cart.getCartSum(getNumberOfDays()));

        if (!!$('.datePickerWrap').find('.invalidMsg').html()) {
            validateDate();
        }
    });
    datePicker.find("#dateTo").on("dp.change", function (e) {

        $('#dateFrom').data("DateTimePicker").maxDate(e.date);
        $(document).find(`.sum`).html(cart.getCartSum(getNumberOfDays()));

        if (!!$('.datePickerWrap').find('.invalidMsg').html()) {
            validateDate();
        }
    });

    // datePicker.find('input').on('change', () => {
    //     console.log($('#dateFrom').data("DateTimePicker").viewDate(), '$("#dateFrom").data("DateTimePicker")');
    //     console.log('jestem');
    //     // $('#dateFrom').data("DateTimePicker").maxDate(e.date);
    // });

    datePickerSectionWrapper.prepend(datePicker);
    fragment.append(datePickerSectionWrapper);

    return fragment;
};

