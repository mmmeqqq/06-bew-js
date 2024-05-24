//สร้างarrayเปล่าไว้เก็บdata
let products = [];
let id = 0;
let cart = [];
//
document.getElementById('form').addEventListener('submit',(event) => {
    event.preventDefault();
const productName = document.getElementById('productNameF').value;
const price = document.getElementById('priceF').value;
const image = document.getElementById('imageUrlF').value;

//เก็บค่าไปใส่ใน products
    if (productName && price && image){
            const product = {
                id: ++id,
                name: productName,
                price: price,
                img: image,
                check: false   
                }
//check condition img
                if (!invalidSMS(product)){
                    return;
                }
                products.push(product);
                console.log(products);
                displayUpload(product);

        };
//เอาไปแสดงใน section display
    function displayUpload(product) {
        const displaySection = document.getElementById("displaySection");
        const card = document.createElement("div");
        card.className = "flex bg-white rounded-lg shadow-lg";
    
        card.innerHTML = `
        <div class="flex bg-white rounded-lg shadow-lg">
            <div class="flex align-middle pl-2">
                <input type="checkbox" data-id="${product.id}" onchange="toggleLike(event)">
            </div>
            <div class="w-1/12">
                <img src="${product.img}" alt="${product.name}" class="w-full aspect-square rounded p-2">
            </div>
            <div class="flex flex-col w-3/4 p-4">
                <label for="id" id="id">${id}</label>
                <label for="productNameF" id="productNameF" class="text-xl">${product.name}</label>
                <label id="Price" class="font-normal">${product.price}$ </label>
            </div>
        </div>
    `;
        displaySection.appendChild(card);
    }
});
//invalid
function invalidSMS(product) {
    const errorMessage = document.getElementById('errorMessage');
    if (!product.img.endsWith('.jpg') && !product.img.endsWith('.png') && !product.img.endsWith('.gif')) {
        errorMessage.textContent = 'Image URL must end with .jpg, .png, or .gif';
        return false;
    }
    errorMessage.textContent = ''; // Clear error message if URL is valid
    return true;
}