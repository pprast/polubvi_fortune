// Маска ввода номера телефона в модальном окне
const consultationPhoneMask = IMask($("#consultation-phone")[0], {mask: "+0(000)000-00-00"})

// Поле name, удаление лишних пробелов
$("#consultation-name").on("change", () => {
    $("#consultation-name").val($("#consultation-name").val().replace(/ +/g, " ").trim())
})

// Поле email, удаление всех пробелов
$("#consultation-email").on("change", () => {
    $("#consultation-email").val($("#consultation-email").val().replaceAll(" ", "").trim())
})

// Автоматические скрытие ошибки при обновлении инпутов
$(".win-modal input").on("input", () => {
    $(".form-error").hide()
})

$(".win-modal").submit((event) => { 
    event.preventDefault() // Отключение базового перехода
    $(".form-error").hide()
    
    // Получаем поля из фомы
    const formData = new FormData($(".win-modal")[0])
    const formName = formData.get("name").trim()
    const formPhone = consultationPhoneMask.unmaskedValue.trim()
    const formEmail = formData.get("email").trim()
    const formPolicy = formData.get("policy")

    // Если поле имя не заполнено
    if (!formName.length) {
        setFormError(".win-modal", "Вы не заполнили поле имя!")
        return
    }
    // Проверка максимальной длины имени
    if (formName.length > 50) {
        setFormError(".win-modal", "Длина имени не может превышать 50 символов!")
        return
    }

    // Проверка поля Номер телефона на регулярном выражении (является ли значение числом) или не равен 11 символам
    let rePhone = /^-?\d+$/
    if (!rePhone.test(formPhone) || formPhone.length !== 11) {
        setFormError(".win-modal", "Неверный формат номера телефона!")
        return
    }

    // Проверка поля Почты на регулярном выражении
    let reEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    if (!reEmail.test(formEmail)) {
        setFormError(".win-modal", "Неверный формат email!")
        return
    }

    // Если поле почты не заполнено
    if (!formEmail.length) {
        setFormError(".win-modal", "Вы не заполнили поле email!")
        return
    }

    // Проверка максимальной длины почты
    if (formEmail.length > 50) {
        setFormError(".win-modal", "Длина email не может превышать 50 символов!")
        return
    }

    // Проверка галочки политики конфиденциальности
    if (!formPolicy) {
        setFormError(".win-modal", "Вы не поставили галочку!")
        return
    }

    // Если все проверки прошло - отключаем кнопку и ждем ответа от сервера
    $("#modal-submit").attr("disabled", true).html("Подождите")

    // Текущая дата
    let date = new Date()

    let hours = date.getHours().toString()
    hours = hours.length !== 2 ? "0" + hours : hours // Формат часов 00

    let minutes = date.getMinutes().toString()
    minutes = minutes.length !== 2 ? "0" + minutes : minutes // Формат минут 00

    let day = date.getDate().toString()
    day = day.length !== 2 ? "0" + day : day // Формат дня 00

    let month = (date.getMonth() + 1).toString() // Добавляем 1 т.к. месяц начинается с нуля
    month = month.length !== 2 ? "0" + month : month // Формат месяца 00

    let year = date.getFullYear()

   // После отправки меняем модальное окно
   winModalChange()

   localStorage.fortune_sendConsultationForm = "true"
})

// Отобразить модальное окно "Карьерный консультант"
$("#win-open-modal").on("click tap", () => {
    $("body").addClass("no-scroll") // Отключаем прокрутку
    $(".win-modal__wrapper").addClass("show") // Показываем модальное окно
    setTimeout(() => $(".win-modal__wrapper").css({"opacity": "1"}), 10) // Плавно показываем модальное окно

    // Если поля пустые, то заполняем их
    if (!$("#consultation-name").val() && !$("#consultation-phone").val() && !$("#consultation-email").val()) {
        $("#consultation-name").val(localStorage.fortune_userName)
        consultationPhoneMask.value = localStorage.fortune_userPhone
        $("#consultation-email").val(localStorage.fortune_userEmail)
    }

    // Клик вне мадального окна закрывает его
    $(document).click((event) => {
        if ($(event.target).is(".win-modal__wrapper")) {
            $("#win-close-modal").click()
        }
    })
})

// Скрыть модальное окно "Карьерный консультант"
$(".win-modal").on("click tap", "#win-close-modal", () => {
    $(".win-modal__wrapper").css({"opacity": "0"}) // Плавно скрываем модальное окно
    $("body").removeClass("no-scroll") // Включаем прокрутку
    setTimeout(() => {
        $(".win-modal__wrapper").removeClass("show") // Скрываем модальное окно
    }, 500)

    // Убираем прослушку клика
    $(document).unbind("click")
})

// Закрыть модальное окно и перейти к курсам
$(".win-modal").on("click tap", "#goto-catalog", () => {
    $("#win-close-modal").click()
    $("#catalog").get(0).scrollIntoView({behavior: 'smooth'})
})

// Заменяем модальное окно 
function winModalChange() {
    $(".win-modal").html(`
        <h1 class="section-title">Спасибо за заявку!</h1>
        <p class="win-modal__text-big">Мы свяжемся в ближайшее время</p>
        <p class="win-modal__text" style="margin-top: 12px;">А пока вы можете посмотреть, какие курсы есть в нашем каталоге</p>
        <button class="button-green" id="goto-catalog" type="button" style="margin-top: 30px;">Показать каталог курсов</button>
        <button class="button-green transparent" id="win-close-modal" type="button" style="margin-top: 30px;">Понятно</button>
    `)
}

// Если пользователь уже отправлял сообщение, то сразу меняем модальное окно
if (localStorage.fortune_sendConsultationForm) {
    winModalChange()
}