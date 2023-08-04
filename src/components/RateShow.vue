<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" :data-bs-target="'#rateBooking' + booking_id">
        Rate
    </button>

    <!-- Modal -->
    <div class="modal fade modal-lg" :id="'rateBooking' + booking_id" tabindex="-1" aria-labelledby="rateBookingLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="rateBookingLabel">Rate the Show</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form :id="'rateBookingForm' + booking_id" @submit.prevent="rateBooking">
                        <div class="mb-3">
                            <label for="showName" class="form-label">Show Name</label>
                            <input v-model="showName" type="text" class="form-control" id="showName" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="showTime" class="form-label">Time</label>
                            <input v-model="showTime" type="text" class="form-control" id="showTime" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="showTag" class="form-label">Tag</label>
                            <input v-model="showTag" type="text" class="form-control" id="showTag" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="bookingPrice" class="form-label">Price</label>
                            <input v-model="bookingPrice" type="text" class="form-control" id="bookingPrice" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="bookingVenue" class="form-label">Venue</label>
                            <input v-model="bookingVenue" type="text" class="form-control" id="bookingVenue" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="bookingTickets" class="form-label">Tickets</label>
                            <input v-model="bookingTickets" type="text" class="form-control" id="bookingTickets" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="userRating" class="form-label">Your Rating</label>
                            <input v-model="userRating" type="text" class="form-control" id="userRating" required>
                        </div>


                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button :form="'rateBookingForm' + booking_id" type="submit" class="btn btn-outline-dark">Rate
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['show_name', 'show_tag', 'show_time', 'booking_price', 'booking_venue', 'booking_tickets', 'booking_id'],
    emits: ['booking-rated'],
    data() {
        return {
            showName: this.show_name,
            showTime: this.show_time,
            showTag: this.show_tag,
            bookingPrice: this.booking_price,
            bookingVenue: this.booking_venue,
            bookingID: this.booking_id,
            bookingTickets: this.booking_tickets,
            userRating: "",
            msg: ""
        }
    },
    methods: {
        rateBooking() {
            const path = "http://127.0.0.1:5000/bookings/" + this.bookingID;
            const payload = {
                rating: this.userRating,
            };
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.put(path, payload, auth)
                .then((res) => {
                    if (res.data.message === "success") {
                        this.userRating = "";
                        this.$refs.CloseModal.click();
                        this.$emit('booking-rated');
                    }
                })
                .catch((err) => console.log(err));
        }


    }
}
</script>