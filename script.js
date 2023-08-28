const inputEl = document.getElementById('input');
const itemEl = document.getElementById('item');
const showMoreBtn = document.getElementById('show-more');

let moreItem = true;
let defaultItem = 12;

showMoreBtn.addEventListener('click', (event) => {
  event.preventDefault();
});

function getApi(searchText) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      let dataSlice = data.data;
      dataSlice = dataSlice.slice(0, defaultItem);

      itemEl.innerHTML = '';

      dataSlice.forEach((item) => {
        const { brand, phone_name, slug, image } = item;
        const modifiedData = {
          phoneName: brand,
          phone: phone_name,
          id: slug,
          phoneImg: image,
        };
        displayItems(modifiedData);
      });
    });
}

function handleButton() {
  const inputValue = inputEl.value;
  getApi(inputValue);

  moreItem = false;
  if (!moreItem) {
    showMoreBtn.style.display = 'block';
  }
}

function displayItems(modifiedData) {
  let sliceData = modifiedData;

  const { phoneName, phone, id, phoneImg } = sliceData;

  const createItemDiv = document.createElement('div');
  createItemDiv.classList.add(`card`, `w-96`, `bg-base-100`, `shadow-xl`);
  createItemDiv.innerHTML = `
            <figure>
              <img
                src="${phoneImg}"
                alt="${phone}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phoneName}</h2>
              <p>${id}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
  `;
  itemEl.appendChild(createItemDiv);
}

getApi();
