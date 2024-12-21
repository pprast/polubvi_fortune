// let gifts // Глобальный массив с данными

let gifts = [ // глобальный массив с данными
    {
        "color": "#ff7eaa",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Любой дизайн в подарок"
    },
    {
        "color": "#fff",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "5 минут массажа рук"
    },
    {
        "color": "#ffdce8",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Скидка в размере 10%"
    },
    {
        "color": "#ff7eaa",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Парафинотерапия"
    },
    {
        "color": "#fff",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Лимонад с собой"
    },
    {
        "color": "#ffdce8",
        "image_url": "./web/assets/gifts/8.png",
        "prize": "Кофе с собой"
    }
];

// Отрисовываем секцию с подарками
renderGiftsSection()

// Отрисовываем колесо
renderFortuneWheel()


// Рендер секции и призами
function renderGiftsSection() {
    for (let gift of gifts) {
        $(".gifts__container").append(`
            <div class="gifts__gift">
                <img class="gifts__gift-image" src="${gift.image_url}" alt="gift">
                <p class="gifts__gift-text">${gift.prize}</p>
            </div>
        `)
    }
}