console.log("window opened");

if (document.querySelector('#order_button')) {
    document.querySelector('#order_button').addEventListener("click", function() {
        console.log("Order button clicked");
        location.href = "browse.html"
    });
}

if (document.querySelector('#orig')) {
    document.querySelector('#orig').addEventListener("click", function() {
        console.log("Original details clicked")
        location.href = "original_details.html"
    });
}

if (document.querySelector('#blackberry')) {
    document.querySelector('#blackberry').addEventListener("click", function() {
        location.href = "blackberry_details.html"
    });
}

if (document.querySelector('#walnut')) {
    document.querySelector('#walnut').addEventListener("click", function() {
        location.href = "walnut_details.html"
    });
}
    
if (document.querySelector('#gf')) {
    document.querySelector('#gf').addEventListener("click", function() {
        location.href = "original_gf_details.html"
    });
}

if (document.querySelector('#caramel')) {
    document.querySelector('#caramel').addEventListener("click", function() {
        location.href = "details.html"
    });
}

if (document.querySelector('#ps')) {
    document.querySelector('#ps').addEventListener("click", function() {
        location.href = "pumpkin_details.html"
    });
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

if (document.querySelector('.dropbtn')) {
    document.querySelector('.dropbtn').addEventListener('click', () => {
        document.querySelector('.dropbtn').classList.add('details_styling');
    });
}

// SHOPPING CART FUNCTIONALITY
// referenced: https://codepen.io/chrisachinga/pen/MWwrZLJ

var shoppingCart = (function() {
    cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    var obj = {};
    obj.addItemToCart = function(name, price, count) {
        for (var item in cart) {
          if (cart[item].name === name) {
            cart[item].count++;
            saveCart();
            return;
          }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    obj.setCountForItem = function(name, count) {
        for(var i in cart) {
            if (cart[i].name === name) {
              cart[i].count = count;
              break;
            }
        }
    };
    obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
          totalCount += cart[item].count;
        }
        return totalCount;
    }
    obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
          totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }
    obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
          item = cart[i];
          itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }
      return obj;
})();

if (document.querySelector('.add-to-cart')) {
    document.querySelector('.add-to-cart').addEventListener("click", function(event) {
        event.preventDefault();
        console.log("added to cart");
        var name = event.target.getAttribute('data-name');
        var price = Number(event.target.getAttribute('data-price'));
        shoppingCart.addItemToCart(name, price, 1);
        displayCart();
    });
}

function displayCart() {
    console.log("displaying cart");
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' id='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    document.querySelector('.show-cart').innerHTML = output;
    document.querySelector('.total-cart').innerHTML = shoppingCart.totalCart();
    document.querySelector('.total-count').innerHTML = shoppingCart.totalCount();
}

if (document.querySelector('.show-cart')) {
    document.querySelector('.show-cart').addEventListener("change", function(event) {
        console.log("showing cart");
        if (event.target.id == 'item-count') {
            var name = $(this).data('name');
            var count = Number($(this).val());
            shoppingCart.setCountForItem(name, count);
            displayCart();
        }
    });
}

displayCart();
  
function menuSelect(a, b, c, d) {
    var select = document.getElementById("quantity");
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].value == c) {
            select.options[i].selected = true;
        }
    }
}