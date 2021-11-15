const filterBox = document.querySelectorAll(`.cards__item`);

document.querySelector(`ul`).addEventListener(`click`, (event)=> {
    if (event.target.tagName !== `LI`) return false;

    let filterClass = event.target.dataset[`f`];
    filterBox.forEach(elem => {
            elem.classList.remove(`hide`);
        if(!elem.classList.contains(filterClass) && filterClass !=="all") {
            elem.classList.add(`hide`);
        }
    }
        )
});
// Cart quantity//
let carts = document.querySelectorAll(`button`);

let products = [
    {
    name: "Boots 1",
    color: "Black",
    price: 40,
    inCart: 0,
    },
    {
    name: "Boots 2",
    color: "Black",
    price: 45,
    inCart: 0,
    },
    {
    name: "Boots 3",
    color: "Black",
    price: 90,
    inCart: 0,
    },
    {
    name: "Boots 4",
    color: "Black",
    price: 90,
    inCart: 0,
    },
    {
    name: "Boots 5",
    color: "Black",
    price: 150,
    inCart: 0,
    },
    {
    name: "Boots 6",
    color: "Black",
    price: 160,
    inCart: 0,
    },
];


function onLoadCartNumbers () {
    let productNumbers = localStorage.getItem(`cartNumbers`);

    if (productNumbers) {
        document.querySelector(`.cart span`).textContent = productNumbers;
    }
}


for (let i=0;i<carts.length;i++) {
    carts[i].addEventListener(`click`, () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}
function cartNumbers(product) {
  
    let productNumbers = localStorage.getItem(`cartNumbers`);

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem(`cartNumbers`,productNumbers+1);
        document.querySelector(`.cart span`).textContent = productNumbers+1;
    } else {
    localStorage.setItem(`cartNumbers`,1);
    document.querySelector(`.cart span`).textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem(`productsInCart`);
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        
        cartItems[product.name].inCart += 1;
            
    } else {
    product.inCart = 1;
    cartItems = {
        [product.name]: product
    }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}   

function totalCost (product) {
  
    let cartCost = localStorage.getItem("totalCost");
   
  

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product-container");

    let cartCost = localStorage.getItem(`totalCost`);

    if ( cartItems && productContainer) {
        productContainer.innerHTML = " ";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name= "close-circle"></ion-icon>
                <span>${item.name}</span>
            </div>
            <div class="price">
                $${item.price}.00
            </div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `
        });
        productContainer.innerHTML += `
        <div class=basketTotal>
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}.00
            </h4>
        </div>`
    }

}


onLoadCartNumbers();
displayCart();