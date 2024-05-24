//สร้างArrayมาเก็บข้อมูล
let products = [];
let id = 0;
// สร้างตะกร้าไว้ใส่สินค้า
let cart = [];

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('productNameF').value;
    const price = document.getElementById('priceF').value;
    const image = document.getElementById('imageUrlF').value;
//collect data
    if (productName && price && image) {
        const product = {
            id: ++id,
            name: productName,
            price: parseFloat(price),
            img: image,
            check: false
        };
        if (!invalidSMS(product)) {
            return;
        }
        products.push(product);
        displayUpload(product);
    }
});

//ทำให้ข้อมูลที่เราใส่มาdisplay
function displayUpload(product) {
    const displaySection = document.getElementById("displaySection");
    const card = document.createElement("div");
    card.className = "flex bg-white rounded-lg shadow-lg";

    card.innerHTML = `
    <div class="flex bg-white rounded-lg shadow-lg">
        <div class="flex align-middle pl-2">
            <input type="checkbox" data-id="${product.id}" onchange="toggleSelection(event)">
        </div>
        <div class="w-1/12">
            <img src="${product.img}" alt="${product.name}" class="w-full aspect-square rounded p-2">
        </div>
        <div class="flex flex-col w-3/4 p-4">
            <label for="id" id="id">${product.id}</label>
            <label for="productNameF" id="productNameF" class="text-xl">${product.name}</label>
            <label id="Price" class="font-normal">${product.price}$</label>
        </div>
    </div>
    `;
    displaySection.appendChild(card);
}
// check in valid img
function invalidSMS(product) {
    const errorMessage = document.getElementById('errorMessage');
    if (!product.img.endsWith('.jpg') && !product.img.endsWith('.png') && !product.img.endsWith('.gif')) {
        errorMessage.textContent = 'Image URL must end with .jpg, .png, or .gif';
        return false;
    }
    errorMessage.textContent = ''; 
    return true;
}
//เลือกของ
function toggleSelection(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        product.check = event.target.checked;
    }
}

document.getElementById('btnAdd').addEventListener('click', () => {
    cart = products.filter(product => product.check);
    displayCart();
});
// เอาของที่เราเลือกมาแสดงผล
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.className = "flex bg-white rounded-lg shadow-lg p-2";
        cartItem.innerHTML = `
            <div class="w-1/12">
                <img src="${product.img}" alt="${product.name}" class="w-full aspect-square rounded p-2">
            </div>
            <div class="flex flex-col w-3/4 p-4">
                <label for="id" id="id">${product.id}</label>
                <label class="text-xl">${product.name}</label>
                <label class="font-normal">${product.price}$</label>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    updateTotalPrice();
}
// คำนวณค่าที่เราเลือกมา
function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('totalPrice').textContent = `Total Price: ${totalPrice}$`;
}

