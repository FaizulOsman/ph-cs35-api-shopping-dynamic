/* Load Data from Server with API */
const loadData = async () => {
    const url = `https://fakestoreapi.com/products`
    const res = await fetch(url)
    const data = await res.json()
    return data
}

/* Menu Section */
const setMenu = async () => {
    const menuItemsSection = document.getElementById('menu-items-section')
    const menuArray = []

    /* Use async() and call with await. If use async() in main function, must have to use this in every function */
    const data = await loadData()

    for (const product of data) {
        if (menuArray.indexOf(product.category) == -1) {

            menuArray.push(product.category)
        }
    }
    for (const mentItem of menuArray) {
        const li = document.createElement('li')
        li.innerHTML = `
            <a>${mentItem}</a> 
        `
        menuItemsSection.appendChild(li)
    }
}
setMenu()

/* Search Input Field Section */
const searchInputField = document.getElementById('search-input-field')
const productsSection = document.getElementById('products-section')

searchInputField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        progress(true)
        const allProducts = await loadData()
        const searchInputFieldValue = searchInputField.value
        productsSection.innerHTML = ""
        searchInputField.value = ''
        /* Filter products as search value */
        const filterProducts = allProducts.filter(product => product.category.includes(searchInputFieldValue))

        if (filterProducts.length === 0) {
            alert(`There is no product with the name "${searchInputFieldValue}".`)
            // productsSection.innerHTML = `
            //     <h2 class="text-3xl font-semibold mt-10 text-red-700">There is no product with the name "${searchInputFieldValue}".</h2>
            // `
        }
        /* Add Every Filtered Products */
        filterProducts.forEach(product => {
            const { image, title, description, rating } = product
            const { rate, count } = rating

            const div = document.createElement('div')
            div.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure><img class="h-64" src="${image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${title.slice(0, 20)}...</h2>
                        <p>${description.slice(0, 100)}...</p>
                        <div class="card-actions justify-end">
                            <label onclick="productDetails('${image}','${description}','${rate}','${count}')" for="my-modal-3" class="btn btn-primary">Show Details</label>
                        </div>
                    </div>
                </div>
            `
            productsSection.appendChild(div)
        })
    }
    progress(false)
})


/* Modal Open while click on Show Details Button */
const productDetails = (image, description, rate, count) => {
    const productDetailsModal = document.getElementById('product-details-modal')
    productDetailsModal.innerHTML = `
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <img class="h-36 mx-auto " src="${image}">
                <p class="py-4">Description: ${description}</p>
                <p>Rate: ${rate}, Count: ${count}</p>
            </div>
        </div>
    `
}

/* Progress Bar Set */
const progress = result => {
    const mainSection = document.getElementById('main-section')
    mainSection.innerHTML = ''
    if (result === true) {
        const div = document.createElement('div')
        div.innerHTML = `
        <progress class="progress w-56"></progress>
    `
        mainSection.appendChild(div)
    }
}