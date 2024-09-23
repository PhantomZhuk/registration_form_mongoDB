$(document).ready(() => {
    function getUsers() {
        axios.get('/allUsers')
            .then(res => {
                const users = res.data;
                for (let user of users) {
                    $(`.usersContainer`).prepend(`
                        <div class="userContainer" id="user${user._id}">
                            <div class="login">${user.login}</div>
                        </div>
                    `)
                }
            })
    }

    getUsers();
})