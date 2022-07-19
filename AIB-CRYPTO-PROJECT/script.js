const API = 'https://api.coingecko.com/api/v3/coins/';


const renderItems = async (items) => {

    const container = document.getElementsByClassName("coinsContainer")[0];
    container.innerHTML = '';

    items.forEach(async (item) => {

        let itm = document.createElement("div");
        itm.classList.add("item");

        const img = document.createElement("img");
        img.src = item.image.thumb;
        itm.appendChild(img);

        const name = document.createElement('span');
        name.innerText = item.name;
        itm.appendChild(name);

        const symbol = document.createElement('span');
        symbol.innerText = item.symbol;
        itm.appendChild(symbol);

        const currentPrice = document.createElement('span');
        currentPrice.innerText = item.market_data.current_price.eur;
        itm.appendChild(currentPrice);

        const h24 = document.createElement('span');
        h24.innerText = item.market_data.high_24h.eur;
        itm.appendChild(h24);

        const l24 = document.createElement('span');
        l24.innerText = item.market_data.low_24h.eur;
        itm.appendChild(l24);

        itm.addEventListener('click', () => displaySingleItemData(item.id))

        container.appendChild(itm);
    });
};

const renderPagination = (items) => {

    const numberOfItems = items.length;
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

    const pagination = document.getElementsByClassName('pagination')[0];

    for (let i = 0; i < numberOfPages; i++) {

        let button = document.createElement('button');
        button.innerText = i + 1;

        const initialIndex = i * itemsPerPage;
        const itemsToRender = items.slice(initialIndex, initialIndex + itemsPerPage);

        button.addEventListener('click', () => renderItems(itemsToRender));

        pagination.appendChild(button);
    }
};

const getData = async () => {

    const result = await fetch(`${API}`).then(
        async (response) => await response.json());

    const sorted = result.sort((a, b) => b.market_data.market_cap.eur - a.market_data.market_cap.eur);

    renderPagination(sorted);

    document.getElementsByClassName('display-data')[0].style.display = 'none';
};

const closePopup = () => {

    const popupCtr = document.getElementById('modal-one');
    popupCtr.style.display = 'none';

    const mainContainer = document.getElementById('main-info');
    mainContainer.style.display = 'block';
}

const displaySingleItemData = async (id) => {

    let data = await fetch(`${API}${id}`)
        .then(async response => await response.json());

    let name = document.getElementsByClassName('name')[0];
    name.textContent = `Name: ${data.name}`;

    let symbol = document.getElementsByClassName('symbol')[0];
    symbol.textContent = `Symbol: ${data.symbol}`;

    let algorithm = document.getElementsByClassName('algorithm')[0];
    algorithm.textContent = `Hashing algorithm: ${data.hashing_algorithm}`;
    let description = document.getElementsByClassName('description')[0];
    description.textContent = `Description: ${data.description.en.slice(0, 2000)}.`;
    let marcetCap = document.getElementsByClassName('marcet-cap-euro')[0];
    marcetCap.textContent = `Market cap: ${data.market_cap_rank}`;
    let homepage = document.getElementsByClassName('homepage')[0];
    homepage.setAttribute('href', data.links.homepage);
    homepage.textContent = `Home page: ${data.links.homepage}`;

    let genesisDate = document.getElementsByClassName('genesis-date')[0];
    genesisDate.textContent = `Genesis data: ${data.genesis_date}`;


    const popupCtr = document.getElementById('modal-one');
    popupCtr.style.display = 'flex';

    const exitButton = document.querySelector(".modal #modal-exit");
    exitButton.addEventListener('click', closePopup);

    const mainContainer = document.getElementById('main-info');
    mainContainer.style.display = 'none';
};
