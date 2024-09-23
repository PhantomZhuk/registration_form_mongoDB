$(document).ready(() => {

    $('#submit').click((e) => {
        const correctPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/
        const correctLogin = /[a-zA-Z0-9]{3,}/
        const login = $('#login').val();
        const password = $('#password').val();

        if (correctLogin.test(login)) {
            $(`.loginRequirementsContainer`).text('');
            if (correctPassword.test(password)) {
                $(`.passwordRequirementsContainer`).text('');
                e.preventDefault();
                axios.post('http://localhost:3000/register', { login, password })
                    .then(res => {
                        console.log(res.data);
                        $('#login').val('');
                        $('#password').val('');
                        $(`.registerContainer`).css(`display`, `none`);
                        $(`.notificationPopup`).css(`display`, `flex`);
                        $(`.notificationPopup`).css(`animation`, `2s ease forwards draw`);
                        setTimeout(() => {
                            $(`.notificationPopup`).css(`animation`, `none`);
                            $(`.notificationPopup`).css(`display`, `none`);
                            $(`.registerContainer`).css(`display`, `flex`);
                            $(`.animate`).css(`display`, `flex`);
                        }, 2000);
                    }).catch(err => {
                        console.log(err.message);
                    })
            } else {
                $(`.registerContainer`).css(`animation`, `0.4s ease forwards wrongly`);
                $(`.passwordRequirementsContainer`).text(`Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.`);
                setTimeout(() => {
                    $(`.registerContainer`).css(`animation`, `none`);
                }, 500)
            }
        } else {
            $(`.registerContainer`).css(`animation`, `0.4s ease forwards wrongly`);
            $(`.loginRequirementsContainer`).text(`Login must be at least 3 characters long and contain only letters and numbers.`);
            setTimeout(() => {
                $(`.registerContainer`).css(`animation`, `none`);
            }, 500)
        }
    })

    $(`#login`).focus(() => {
        $(`.passwordRequirementsContainer`).text('');
    })
    $(`#password`).focus(() => {
        $(`.loginRequirementsContainer`).text('');
    })
})