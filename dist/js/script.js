const hamburger = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu'),
        close = document.querySelector('.menu__close');
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

close.addEventListener('click', () => {
    menu.classList.remove('active');
});

const precent = document.querySelectorAll('.skills__creation__precent'),
lines = document.querySelectorAll('.skills__creation__divider');

precent.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});

$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
});

function valideForms(form){
    $(form).validate({
        rules: {
            name: "required",
            text: "required",
            check: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Пожалуйста, введите свое имя",
            text: "Пожалуйста, введите свое сообщение",
            check: "Пожалуйста, введите свое сообщение",
            email: {    
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
        }
    });
};

valideForms('#consultation-form');


$('form').submit(function(e){
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function(){
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});