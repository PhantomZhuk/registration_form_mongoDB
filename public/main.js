$(document).ready(() => {

    $('#submit').click((events) => {
        alert('hello');
        events.preventDefault();
        const login = $('#login').val();
        const password = $('#password').val();
        axios.post('http://localhost:3000/register', { login, password })
            .then(res => {
                console.log(res.data);
                $('#login').val('');
                $('#password').val('');
                alert('User created');
            }).catch(err => {
                console.log(err.message);
            })
    })
})