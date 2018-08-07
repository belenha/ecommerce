var form = $('#searchForm');

var search = $('#searchProducts');
var searchedForText;

form.submit(function (ev) {
    ev.preventDefault();
    searchedForText = search.val();
    $('#searchProducts').val("");

    getData();
});

// Obteniendo Data de mercado libre

function getData() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`,
        contentType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function (data) {
            for(var i = 0; i <= 5; i++) {
                var productImg = data.results[i].thumbnail;
                var productTitle = data.results[i].title;
                var price = '$ ' + data.results[i].price;
                var productState = data.results[i].address["state_name"];
                var productCity = data.results[i].address["city_name"];
                var template = `<div class="card grey darken-1" style="">
                    <div class="card-content white-text">
                        <img class="responsive-img" src="${productImg}" alt="Card image cap">
                        <h5 class="card-title">${productTitle}</h5>
                        <h5 id="state" class="card-state">${productState}</h5>
                        <h6 id="city" class="card-city">${productCity}</h6>
                        <p class="card-text">${price}</p>
                        <a class="btn-floating halfway-fab waves-effect light-blue darken-1"><i class="material-icons">add</i></a>
                    </div>
                 </div>`;

                $('#info').append(template);  
            };
        }
    });
};