function initDatePicker() {
    $(document).ready(function(){
        var date_input=$('input[name="fechaInicio"]'); //our date input has the name "date"
        var container="body";//$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: "dd/mm/yyyy",
            language: "es",
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
        var date_input=$('input[name="fechaFin"]'); //our date input has the name "date"
        date_input.datepicker({
            format: "dd/mm/yyyy",
            language: "es",
            container: container,
            todayHighlight: true,
            autoclose: true,
        })
    })
}


