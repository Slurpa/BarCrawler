$(document).ready(function () {
    console.log("tadaima~");

    $.ajax({
        url : '/place/get-places',
        method : 'POST',
        dataType : 'json',
        data : {
            query : 'food',
        },
    })
    .then(response => {
        console.log(response);
    })
    .fail(response => {
        console.error(response);
    });
});