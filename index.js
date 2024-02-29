const loadData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const news = data.data.news_category;
  const navButtonn = document.getElementById("navBar-button");
    
  news.forEach((element) => {
    console.log(element);
    
    const div = document.createElement("div");
    div.innerHTML = `
        <button onclick="handleButton('${element.category_id}')" class="btn btn-primary">${element.category_name } </button>
        `;
    navButtonn.appendChild(div);
   
  });
  
};

const handleButton = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${category}`
  );
  const data = await response.json();
  const search = data.data;
  console.log(search);
  showCatagoryDetails(search);
};

const showCatagoryDetails = (search) => {
    const catagoryCard = document.getElementById("catagory-card");

    catagoryCard.innerText = '';
  search.forEach((item) => {
    console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card card-side bg-base-100 shadow-xl my-5 ">
            <div class="flex-1 w-full h-full"><figure><img src="${item.image_url}" alt="Movie"/></figure> </div>
            <div class="card-body flex-1">
              <h2 class="card-title">${item.title}</h2>
              <p>${item.details.slice(0,150)}</p>
              <div class="flex justify-between">
              <p> <span class="font-bold">Author: <span>${item.author.name} </p>
              <p> <span class="font-bold">Publish Date: <span>${item.author.published_date} </p> 
              </div>
              <p> <span class="font-bold">Total View: <span>${item.total_view} </p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>
          </div>
             `;
    catagoryCard.appendChild(div);
  });
};
const handleSearch = () => {
    const inputValue = document.getElementById('input-Value').value;

    if (inputValue === "01" || inputValue === "08") {
        handleButton(inputValue);
    } else if (isNaN(inputValue)) {
        alert("Please enter a valid category ID (01-08) or a string");
    } else {
        handleButton(inputValue);
    }
}




loadData();
handleButton("01");
