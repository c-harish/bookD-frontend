<template>
    <div class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/admin">bookD</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/admin/summary">Summary</a>
                        </li>
                        <form class="d-flex" role="search" v-if="currentRouteName === 'AdminDashboard'" @submit.prevent="adminSearch">
                            <input v-model="searchKey" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <li class="nav-item">
                            <a class="nav-link active" @click="logOut" aria-current="page" href="#">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            searchKey: ""
        }
    },
    emits: ['search-key'],
    methods: {
        logOut() {
            localStorage.removeItem('token');
            this.$router.push('/');
        },
        adminSearch(){
            this.$emit('search-key', this.searchKey);
        }
    },
    computed: {
    currentRouteName() {
        return this.$route.name;
    }
}
};
</script>
    