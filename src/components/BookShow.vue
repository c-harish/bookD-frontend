<template>
    <!-- Button trigger modal -->
    <div v-if="show_available_tickets > 0">
        <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" :data-bs-target="'#bookShow' + show_id">
            Book Show
        </button>
    </div>
    <div v-else>
        <button type="button" class="btn btn-dark" disabled data-bs-toggle="modal" :data-bs-target="'#bookShow' + show_id">
            Sold Out
        </button>
    </div>

    <!-- Modal -->
    <div class="modal fade modal-lg" :id="'bookShow' + show_id" tabindex="-1" aria-labelledby="bookShowLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="bookShowLabel">Book Show{{ show_available_tickets }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form :id="'bookShowForm' + show_id" @submit.prevent="bookShow">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>                            
                                        <label for="showName" class="form-label"> Name</label>
                                    </td>
                                    <td>
                                        <input v-model="showName" type="text" class="form-control" id="showName" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showTime" class="form-label"> Time</label>
                                    </td>
                                    <td>
                                        <input v-model="showTime" type="text" class="form-control" id="showTime" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showTag" class="form-label"> Tag</label>
                                    </td>
                                    <td>
                                        <input v-model="showTag" type="text" class="form-control" id="showTag" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showRating" class="form-label"> Rating</label>
                                    </td>
                                    <td>
                                        <input v-model="showRating" type="text" class="form-control" id="showRating" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showPrice" class="form-label"> Price</label>
                                    </td>
                                    <td>
                                        <input v-model="showPrice" type="text" class="form-control" id="showPrice" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showTickets" class="form-label"> Total Seats</label>
                                    </td>
                                    <td>
                                        <input v-model="showTickets" type="text" class="form-control" id="showTickets" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="showAvailableTickets" class="form-label"> Available Seats</label>
                                    </td>
                                    <td>
                                        <input :value="show_available_tickets" type="number" class="form-control" id="show_available_tickets" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="bookTickets" class="form-label"> Book Seats</label>
                                    </td>
                                    <td>
                                        <input v-model="bookTickets" type="number" min="0" max="show_available_tickets" class="form-control" id="bookTickets" required>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div>{{ msg }}</div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button :form="'bookShowForm' + show_id" type="submit" class="btn btn-outline-dark">Book</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['show_name', 'show_price', 'show_tag', 'show_time', 'show_id', 'show_rating', 'show_venue_id', 'show_tickets', 'show_venue_place', 'show_venue_location', 'show_venue_name', 'show_available_tickets'],
    emits: ['show-booked'],
    data() {
        return {
            showName: this.show_name,
            showTime: this.show_time,
            showTag: this.show_tag,
            showPrice: this.show_price,
            showRating: this.show_rating,
            showTickets: this.show_tickets,
            showAvailableTickets: this.show_available_tickets,
            showID: this.show_id,
            bookTickets: "",
            msg: ""
        }
    },
    methods: {
        bookShow() {
            const path = "http://127.0.0.1:5000/bookings";
            const payload = {
                showname: this.showName,
                showtime: this.showTime,
                price: this.showPrice,
                tickets: this.bookTickets,
                rating: this.showRating,
                venueid: this.show_venue_id,
                showid: this.show_id,
                venuename: this.show_venue_name,
                venueplace: this.show_venue_place,
                venuelocation: this.show_venue_location,
                showtag: this.showTag
            };
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.post(path, payload, auth)
                .then((res) => {
                    if (res.data.message === "success") {
                        this.bookTickets = "";
                        this.$refs.CloseModal.click();
                        this.$emit('show-booked')
                    }
                    else{
                        this.msg = res.data.reason;
                    }
                })
                .catch((err) => console.log(err));
        }


    }
}
</script>