$(document).ready(function(){
    $('.modal').modal();
  });

var form = $('#searchForm');
var search = $('#searchProducts');
var searchedForText;
var count = 0;
var array = [];
var total = 0;

form.submit(function (ev) {
    ev.preventDefault();
    searchedForText = search.val();
    $('#searchProducts').val("");
    // if (searchedForText.length !== 0) {
    //     $('#info').empty();
    // }

    getData();
});

// El usuario puede buscar productos
function getData() {  
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`,
        categoriesType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function (data) {
            for(var i = 0; i < 20; i++) {
                var productImg = data.results[i].thumbnail;
                var productName = data.results[i].title;
                var price = '$ ' + data.results[i].price;
                var productState = data.results[i].address["state_name"];
                var productCity = data.results[i].address["city_name"];
                var template = `<div class="card searchedProducts">
                    <div class="card-categories">
                        <img class="responsive-img" src="${productImg}" alt="Card image cap">
                        <hr class="line">
                        <h5 class="card-title">${productName}</h5>
                        <h5 id="state" class="card-state">${productState}</h5>
                        <h6 id="city" class="card-city">${productCity}</h6>
                        <p class="card-text">${price}</p>
                        <hr class="line">
                        <a href="#" class="btn-floating halfway-fab carrito" data-product="${productName}" data-price="${price}" style="background:#FF7B31">Add</a>
                    </div>
                 </div>`;

                $('#info').append(template);  
            };
            $('.carrito').click(getElementsCart);
        }
    });
};

// Obteniendo las  categorías
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
                var dataCategories = $(element).attr('data-categorie');
                $('#categories').empty();
                productCategories(dataCategories);

            });
        }
    ).fail(error);
}

$('#home').click(function() {
        $('#categories').empty();
        // $('#tittle').empty();
        $('#info').empty();
    
    getAll();
});

function error() {
    alert("No se pueden cargar los datos");
}

function productCategories(dataCategories) {

    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?category=${dataCategories}`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(getOne).fail(error);

    function getOne(data) {

        for (var i = 0; i <= 20; i++) {
            var photoProduct = data.results[i].thumbnail;
            var nameProduct = data.results[i].title;
            var costProduct = '$' + '' + data.results[i].price;
            var shipping = data.results[i].address.state_name + ',' + data.results[i].address.city_name;
            var template = `<div class="card">
                                    <div class="card categorieCard center-align">
                                        <img class="card-img-top" src="${photoProduct}" alt="Card image">
                                        <h5 class="card-title">${nameProduct}</h5>
                                        <p class="card-text">${costProduct}</p>
                                        <hr class="line">
                                        <p>Ciudad del vendedor: ${shipping}</p>
                                        <hr class="line">
                                        <a href="#" class="waves-effect btn carrito" style="background:#FF7B31 "data-product="${nameProduct}" data-price= "${costProduct}">Comprar</a>
                                    </div>
                                </div>`;
            $('#categories').append(template);
        }
        $('.carrito').click(getElementsCart); 
    }
};

function error() {
    alert("No se pueden cargar los datos");
};

// Agregar productos al carrito
function getElementsCart(e, nameProductCar, priceProductCar){
    var elem = e.target;
    var nameProductCar = $(elem).attr('data-product');
    var priceProductCar = $(elem).attr('data-price');
    var templateModal =
                            `<table class="table">
                                 <thead>
                                        <tr>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td id="price-modal">${priceProductCar}</td>
                                            <td id="product-modal">${nameProductCar}</td>
                                        </tr>
                                    </tbody>
                                </table>`;
    $('#modal-info').append(templateModal);
    count += 1;
    $('#count').text(count);
    array.push(parseInt(priceProductCar));
    for(var i = 0; i < array.length; i++){
        total += array[i];
    };
    
    $('#total').html("Total: $ " + total);
};

$(document).ready(function() {
    getAll();
});