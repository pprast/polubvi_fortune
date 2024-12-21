// Кнопка "Участвую" в блоке Home, прокручивает страницу до блока регистрации
$("#goto-registration").on("click tap", () => {
    $("#wheel").get(0).scrollIntoView({behavior: 'smooth'})
})

