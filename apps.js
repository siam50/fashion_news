const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error));
}

const displayCategory = (categories) => {
    const ul = document.getElementById('ul');

    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadCategoryId(${category.category_id})" class="nav-link active me-md-5 text-light" aria-current="page" href="#">${category.category_name}   </a>
        `
        ul.appendChild(li);
    });

}

loadCategory();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> Show Categories By Card <<<<<<<<<<<<<<<<<<<<<
const loadCategoryId = (data) => {
    startSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${0}${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))
        .catch(error => console.log(error));

}

const displayCategoryId = (datas) => {
    // >>>>>>>>>>>>>>>>> Founded Category Part Start <<<<<<<<<<<<<<<<<<<<<
    const categoryFound = document.getElementById('found-category');
    if (datas.length === 0) {
        categoryFound.classList.remove('d-none')
        categoryFound.innerHTML = `
        <h2>No Item Found For Category Entertainments</h2>
        `
        startSpinner(false);
    }
    else {
        categoryFound.classList.remove('d-none')
        categoryFound.innerHTML = `
        <h2>${datas.length} Items Found For Category Entertainments</h2>
        `
    }
    // >>>>>>>>>>>>>>>>> Founded Category Part Start <<<<<<<<<<<<<<<<<<<<<

    // >>>>>>>>>>>>>>>>>>> Sorting Part Start <<<<<<<<<<<<<<<<<<<<
    datas.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    // >>>>>>>>>>>>>>>>>>> Sorting Part End <<<<<<<<<<<<<<<<<<<<
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ``;
    datas.forEach(perId => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                        <img src="${perId.thumbnail_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${perId.title}</h5>
                            <p class="card-text">${perId.details.slice(0, 100)} .....</p>
                            <div class="d-flex justify-content-between align-items-center"><img src="${perId.author.img}" class="card-img-top w-25 h-25 rounded-circle me-1" alt="...">
                            <p class="text-primary text-center me-1"> Athor: ${perId.author.name ? perId.author.name : 'No data found'} </p>
                            <p class="text-center fw-semibold">Views: ${perId.total_view ? perId.total_view : 'No data found'}</p>
                            </div>
                            <div class="d-flex justify-content-center"><button onclick="modalLoadData('${perId._id}')" type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Show Details
                        </button></div>
                        </div>
                    </div>
        `
        cardContainer.appendChild(div);
        startSpinner(false);
    });

}

// >>>>>>>>>>>>>>>>>>>>> Modal Part Start <<<<<<<<<<<<<<<<<<<<<<<
const modalLoadData = (details) => {
    const url = `https://openapi.programming-hero.com/api/news/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalData(data.data[0]))
        .catch(error => console.log(error));

}

const displayModalData = (detailData) => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = detailData.title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${detailData.image_url}" class="card-img-top" alt="...">
    <p>${detailData.details}</p>
    <h6>Athor Information:</h6>
    <div class="d-flex justify-content-between align-items-center"><img src="${detailData.author.img}" class="card-img-top w-25 h-25 rounded-circle me-1" alt="...">
         <p class="text-primary text-center"> Athor: ${detailData.author.name ? detailData.author.name : 'No data found'} </p>
         <p class="text-center fw-semibold"> Views: ${detailData.total_view ? detailData.total_view : 'No data found'} </p>
     </div>
     <h6 class="mt-2 d-inline me-2">Published Date:</h6>
     <span>${detailData.author.published_date ? detailData.author.published_date : 'No data found'}</span>
    `
}
// >>>>>>>>>>>>>>>>>>>>> Modal Part End <<<<<<<<<<<<<<<<<<<<<<<

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Spinner Part <<<<<<<<<<<<<<<<<<<<<<<<<<<<
const startSpinner = (isLoading) => {
    const showSpinner = document.getElementById('show-spinner');
    if (isLoading) {
        showSpinner.classList.remove('d-none');
    }
    else {
        showSpinner.classList.add('d-none');
    }
}
