<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" :data-bs-target="'#addShow' + venue_id">
        Add Show
    </button>

    <!-- Modal -->
    <div class="modal fade modal-lg" :id="'addShow' + venue_id" tabindex="-1" aria-labelledby="addShowLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addShowLabel">Add New Show</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form :id="'addShowForm' + venue_id" @submit.prevent="submitShow">
                        <div class="mb-3">
                            <label for="showName" class="form-label">Show Name</label>
                            <input v-model="showName" type="text" class="form-control" id="showName" required>
                        </div>
                        <div class="mb-3">
                            <label for="showTime" class="form-label">Show Time</label>
                            <input v-model="showTime" type="text" class="form-control" id="showTime" required>
                        </div>
                        <div class="mb-3">
                            <label for="showTag" class="form-label">Show Tag</label>
                            <input v-model="showTag" type="text" class="form-control" id="showTag" required>
                        </div>
                        <div class="mb-3">
                            <label for="showPrice" class="form-label">Show Price</label>
                            <input v-model="showPrice" type="number" class="form-control" id="showPrice" required>
                        </div>
                        <div class="mb-3">
                            <label for="showRating" class="form-label">Show Rating</label>
                            <input v-model="showRating" type="number" class="form-control" id="showRating" required>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button :form="'addShowForm' + venue_id" type="submit" class="btn btn-outline-dark">Add</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['venue_id', 'venue_tickets'],
    data() {
        return {
            showName: "",
            showTime: "",
            showTag: "",
            showPrice: "",
            showRating: "",
            show_venue: ""
        }
    },
    methods: {
        submitShow() {
            const path = "http://127.0.0.1:5000/shows";
            const payload = {
                name: this.showName,
                time: this.showTime,
                tag: this.showTag,
                price: this.showPrice,
                rating: this.showRating,
                venue: this.venue_id,
                tickets: this.venue_tickets
                
            };
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.post(path, payload, auth)
                .then((res) => {
                    this.msg = res.data.message;
                    if (this.msg === "success") {
                        this.showName = "";
                        this.showPrice = "";
                        this.showTime = "";
                        this.showRating = "";
                        this.showTag = "";
                    }
                })
                .catch((err) => console.log(err));
            this.$refs.CloseModal.click();

        }

    }
}

</script>