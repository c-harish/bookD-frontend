<template>
    <div>
        <home-navbar></home-navbar>
    </div>
    <h2>
        User Log In
    </h2>

    <div>
        <form @submit.prevent="submitLogin">
            <div class="mb-3">
                <label for="loginEmail" class="form-label">Email address</label>
                <input v-model="loginEmail" type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input v-model="loginPassword" type="password" class="form-control" id="loginPassword">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data() {
            return {
                loginEmail: "",
                loginPassword: "",
                msg: "",
                role: "user",
            }
        },
        methods: {
            submitLogin() {
                const path = "http://127.0.0.1:5000/login/user";
                const auth = {username : this.loginEmail, password : this.loginPassword};
                axios.post(path, {}, {auth})
                .then((res) => {
                    if (res.data.message === 'success'){
                        localStorage.setItem('token', res.data.token);
                        this.loginEmail = "";
                        this.loginPassword = "";
                        this.$router.push('/user')
                }
                })
                .catch((err) => console.log(err));
            }
        },
        created() {
            document.title = "User Login";
        }
    }

</script>
