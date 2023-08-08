<template>
    <user-navbar></user-navbar>
    <h2>User Profile</h2>
    <table class="table">
        <tbody>
            <tr>
                <th scope="row">Name</th>
                <td>{{ username }}</td>
            </tr>
            <tr>
                <th scope="row">Email</th>
                <td>{{ useremail }}</td>
            </tr>
            <tr>
                <th scope="row">Last Login Time</th>
                <td>{{ userlastlogin}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            useremail: "",
            userlastlogin: ""
        }
    },
    methods: {
        parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = (JSON.parse(jsonPayload));
            this.username = payload.username;
            this.useremail = payload.useremail;
            this.userlastlogin = payload.lastlogin;
        }
    },
    created(){
        this.parseJwt(localStorage.getItem('token'));
        document.title = "Profile";
    },
}
</script>