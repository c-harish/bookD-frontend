<template>
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" :data-bs-target="'#editShow' + show_id">
        Edit Show
    </button>
    <div class="modal fade modal-lg" :id="'editShow' + show_id" tabindex="-1" aria-labelledby="editShowLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editShowLabel">Edit Show</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form :id="'editShowForm' + show_id" @submit.prevent="editShow">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>                            
                                        <label for="showName" class="form-label">Edit Show Name</label>
                                    </td>
                                    <td>
                                        <input v-model="showName" type="text" class="form-control" id="showName" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showTime" class="form-label">Edit Show Time</label>
                                    </td>
                                    <td>
                                        <input v-model="showTime" type="text" class="form-control" id="showTime" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showTag" class="form-label">Edit Show Tag</label>
                                    </td>
                                    <td>
                                        <input v-model="showTag" type="text" class="form-control" id="showTag" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showRating" class="form-label">Edit Show Rating</label>
                                    </td>
                                    <td>
                                        <input v-model="showRating" type="text" class="form-control" id="showRating" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showPrice" class="form-label">Edit Show Price</label>
                                    </td>
                                    <td>
                                        <input v-model="showPrice" type="text" class="form-control" id="showPrice" required>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button :form="'editShowForm' + show_id" type="submit" class="btn btn-outline-dark">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['show_name', 'show_price', 'show_tag', 'show_time', 'show_id', 'show_rating', 'show_venue_id', 'show_tickets'],
    emits: ['show-edited'],
    data() {
        return {
            showName: this.show_name,
            showTime: this.show_time,
            showTag: this.show_tag,
            showPrice: this.show_price,
            showRating: this.show_rating,
            showID: this.show_id,
            msg: ""
        }
    },
    methods: {
        editShow() {
            const path = "http://127.0.0.1:5000/shows/" + this.showID;
            const payload = {
                name: this.showName,
                time: this.showTime,
                tag: this.showTag,
                price: this.showPrice,
                tickets: this.show_tickets,
                rating: this.showRating,
                venue: this.show_venue_id,
                id: this.show_id,

            };
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.put(path, payload, auth)
                .then((res) => {
                    if (res.data.message === "success") {
                        this.$refs.CloseModal.click();
                        this.$emit('show-edited');
                    }
                })
                .catch((err) => console.log(err));
        }


    }
}
</script>