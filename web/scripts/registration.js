localStorage.fortune_userName = "Majestic"
localStorage.fortune_userPhone = "Majestic",
localStorage.fortune_userEmail = "Majestic"

$("body").removeClass("phone-no-scroll")

// Отобразить блок об успешной регистрации
function showRegistrationDone() {
    $(".wheel-spin-overlap").remove() // Удаляем перекрытие кнопки "Крутить"
    $("#wheel-spin").removeAttr("disabled") // Разблокируем кнопку вращения колеса
}


// Если в браузере сохранены поля после регистрации, то отображаем что пользователь зарегистрирован
if (localStorage.fortune_userEmail && localStorage.fortune_userPhone) {
    showRegistrationDone()
}
