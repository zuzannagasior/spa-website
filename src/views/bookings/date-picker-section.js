import $ from 'jquery';


export const datePickerSection = () => {
    const fragment = $(new DocumentFragment());

    const datePickerSectionWrapper = $(`<div class="datePickerWrap"></div>`);

    const datePicker = $(`
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
            <label for="dateTo">Data wyjazdu: </label>
            <div class='input-group date' id='dateTo'>
                <input name="dateTo" type='text' placeholder="DD/MM/YYYY" class="customInput" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
        </div>`);

    datePicker.find('#dateFrom').datetimepicker({
        useCurrent: false,
        locale: 'pl',
        format: 'DD/MM/YYYY',
        minDate : new Date()

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
        console.log(e.date, 'e.date')
        $('#dateTo').data("DateTimePicker").minDate(e.date.add(1, 'days'));
        $('#dateTo').data("DateTimePicker").maxDate(new Date(dateFrom + daysDifference));

    });
    datePicker.find("#dateTo").on("dp.change", function (e) {
        $('#dateFrom').data("DateTimePicker").maxDate(e.date);
    });

    datePickerSectionWrapper.prepend(datePicker);
    fragment.append(datePickerSectionWrapper);

    return fragment;
};

