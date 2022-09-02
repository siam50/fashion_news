const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
    // .catch(error=> console.log(error));
}

const displayCategory = (categories) => {
    const ul = document.getElementById('ul');

    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="loadCategoryId(${category.category_id})" class="nav-link active" aria-current="page" href="#">${category.category_name}   </a>
        `
        ul.appendChild(li);
        // console.log(category)
    });

}

loadCategory();

const loadCategoryId = (data) => {
    startSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${0}${data}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryId(data.data))

}

const displayCategoryId = (datas) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ``;
    datas.forEach(perId => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                        <img src="${perId.thumbnail_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${perId.title}</h5>
                            <p class="card-text">${perId.details.slice(0, 100)} .....</p>
                            <div><img src="${perId.author.img}" class="card-img-top w-25 h-25 rounded-circle me-3" alt="...">
                            <span class="text-primary me-5"> ${perId.author.name ? perId.author.name : 'No Author'} </span>
                            <span> Views: ${perId.total_view ? perId.total_view : 'No Views'} </span>
                            </div>
                            <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Show Details
                            </button>
                        </div>
                    </div>
        `
        cardContainer.appendChild(div);
        console.log(perId)
        startSpinner(false);
    });

}

// Spinner Part<<<<<<<<<<<<<<<
const startSpinner = (isLoading) => {
    const showSpinner = document.getElementById('show-spinner');
    if (isLoading) {
        showSpinner.classList.remove('d-none');
    }
    else {
        showSpinner.classList.add('d-none');
    }
}