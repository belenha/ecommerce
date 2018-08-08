$(document).ready(function(){
    $('.carousel').carousel();
  });

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
        categoriesType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function (data) {
            for(var i = 0; i <= 15; i++) {
                var productImg = data.results[i].thumbnail;
                var productTitle = data.results[i].title;
                var price = '$ ' + data.results[i].price;
                var productState = data.results[i].address["state_name"];
                var productCity = data.results[i].address["city_name"];
                var template = `<div class="card searchedProducts">
                    <div class="card-categories">
                        <img class="responsive-img" src="${productImg}" alt="Card image cap">
                        <hr class="line">
                        <h5 class="card-title">${productTitle}</h5>
                        <h5 id="state" class="card-state">${productState}</h5>
                        <h6 id="city" class="card-city">${productCity}</h6>
                        <p class="card-text">${price}</p>
                        <hr class="line">
                        <a class="btn-floating halfway-fab waves-effect" style="background:#FF7B31"><i class="material-icons">add</i></a>
                    </div>
                 </div>`;

                $('#info').append(template);  
            };
        }
    });
};

function getAll() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/categories`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(
        function(data) {
            for (var i = 0; i < data.length; i++) {
                var categories = data[i].name;
                var idCategories = data[i].id;
                var templateCategories = `<div class="card">
                                    <div class="card-body center-align">
                                        <p data-categorie="${idCategories}" class="card-title template">${categories} </p>
                                    </div>
                                </div>`;
                $('#categories').append(templateCategories);

            }

            $('.template').click(function(e) {

                var element = e.target;
                var cateData = $(element).attr('data-categorie');
                // console.log(cateData);
                $('#categories').empty();
                productCategories(cateData);

            });
        }
    ).fail(error);

}

$('#home').click(function() {
    if (searchedForText.length !== 0) {
        $('#categories').empty();
        $('#tittle').empty();
    }

    getAll();

});

function error() {
    alert("No se pueden cargar los datos");
}

function productCategories(cateData) {

    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?category=${cateData}`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(getOne).fail(error);

    function getOne(data) {

        for (var i = 0; i <= 15; i++) {
            var photoProduct = data.results[i].thumbnail;
            var nameProduct = data.results[i].title;
            var costProduct = '$' + '' + data.results[i].price;
            console.log(photoProduct);
            var shipping = data.results[i].address.state_name + ',' + data.results[i].address.city_name;
            console.log(shipping);
            var template = `<div class="card">
                                    <div class="card categorieCard center-align">
                                        <img class="card-img-top" src="${photoProduct}" alt="Card image">
                                        <h5 class="card-title">${nameProduct}</h5>
                                        <p class="card-text">${costProduct}</p>
                                        <hr class="line">
                                        <p>Ciudad del vendedor: ${shipping}</p>
                                        <hr class="line">
                                         <a href="#" class="waves-effect waves-light btn" style="background:#FF7B31">Comprar</a>
                                    </div>
                                </div>`;
            $('#categories').append(template);
        }
    }
};

function error() {
    alert("No se pueden cargar los datos");
};

$(document).ready(function() {
    getAll();
});