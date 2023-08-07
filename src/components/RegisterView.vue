<template>
    <div>
        <home-navbar></home-navbar>
    </div>
    <h2>
        Sign Up
    </h2>

    <div>
        <form @submit.prevent="submitRegister">
            <div class="mb-3">
                <label for="registerEmail" class="form-label">Email address</label>
                <input v-model="registerEmail" type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="registerUsername" class="form-label">Name</label>
                <input v-model="registerUsername" type="text" class="form-control" id="registerUsername" required>
            </div>
            <div class="mb-3">
                <label for="registerPassword" class="form-label">Password</label>
                <input v-model="registerPassword" type="password" class="form-control" id="registerPassword" required>
            </div>
            <div class="mb-3 form-check">
                <label class="form-check-label" for="adminCheck">Sign Up as Admin</label>
                <input v-model="registerAdmin" type="checkbox" class="form-check-input" id="adminCheck">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    <div>{{ msg }}</div>
</template>

<script>
    import axios from "axios";
    export default{
        data() {
            return {
                registerEmail: "",
                registerUsername: "",
                registerPassword: "",
                registerAdmin: "",
                msg: ""
            }
        },
        methods: {
            submitRegister() {
                const path = "http://127.0.0.1:5000/register";
                const payload = {
                    email: this.registerEmail,
                    username: this.registerUsername,
                    password: this.registerPassword,
                    admin: this.registerAdmin
                };
                axios.post(path, payload)
                .then((res) => {
                    if (res.data.message === "success"){
                        this.message = "Registration Successfull"
                        this.registerEmail = "";
                        this.registerUsername = "";
                        this.registerPassword = "";
                        this.registerAdmin="";
                        if (this.registerAdmin){
                            this.$router.push('/login/admin');
                        }
                        else{this.$router.push('/login/user')}
                    }
                })
                .catch((err) => console.log(err));
            }
        },
        created() {
            document.title = "Sign Up";
        }
    }

</script>
