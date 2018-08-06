var form = $('#search-form');

var search = $('#searchProducts');
let searchedForText;

form.submit(function (ev) {
    ev.preventDefault();
    searchedForText = search.val();
    $('#searchProducts').val("");

    getData();
});

function getData() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`,
        contentType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function (response) {
            for(var i = 0; i <= 5; i++) {
                var photo = response.results[i].thumbnail;
                console.log(photo);
                
                var titleProduct = response.results[i].title;
                var priceProduct = '$' + '' + response.results[i].price;
                var template = `<div class="card grey darken-1" style="">
                    <div class="card-content white-text">
                        <img class="responsive-img" src="${photo}" alt="Card image cap">
                        <h5 class="card-title">${titleProduct}</h5>
                        <p class="card-text">${priceProduct}</p>
                        <a class="btn-floating halfway-fab waves-effect light-blue darken-1"><i class="material-icons">add</i></a>
                    </div>
                 </div>`;

                $('#info').append(template);

                
            };

        }
    });


};