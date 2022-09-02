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
        <a class="nav-link active" aria-current="page" href="#">${category.category_name}   </a>
        `
        ul.appendChild(li);
        // console.log(category)
    });

}

loadCategory();