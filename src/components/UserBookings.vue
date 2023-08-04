<template>
    <user-navbar></user-navbar>
    <h2>User Bookings</h2>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Show Name</th>
                <th scope="col">Time</th>
                <th scope="col">Tag</th>
                <th scope="col">Venue</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                <th scope="col">Tickets</th>
                <th scope="col">Rating</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(booking, index) in bookings" :key="booking.booking_id">
                <th scope="row">{{ (index + 1) }}</th>
                <td>{{ booking.show_name }}</td>
                <td>{{ booking.show_time }}</td>
                <td>{{ booking.show_tag }}</td>
                <td>{{ booking.venue_name }}</td>
                <td>{{ booking.venue_location }}</td>
                <td>{{ booking.price }}</td>
                <td>{{ booking.tickets }}</td>
                <td v-if="booking.user_rating===null">{{ booking.show_rating }}</td>
                <td v-else>{{ booking.user_rating }}</td>
                <td>
                    <rate-show :show_name="booking.show_name"
                                :show_time="booking.show_time"
                                :show_tag="booking.show_tag"
                                :booking_price="booking.price"
                                :booking_venue="booking.venue_name"
                                :booking_tickets="booking.tickets"
                                :booking_id="booking.booking_id"
                                @booking-rated="getBookings">
                    </rate-show>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script>
import RateShow from "./RateShow.vue"
import axios from "axios";
export default {
    components: { RateShow },
    data() {
        return {
            bookings: "",
            rating: ""
        }
    },
    methods: {
        getBookings() {
            const path = "http://127.0.0.1:5000/bookings";
            const auth = { 'headers': { 'x-access-token': localStorage.getItem('token') } };
            axios.get(path, auth)
                .then((res) => {
                    this.bookings = res.data.bookings;
                })
        },
    },
    created() {
        this.getBookings();
    },
}
</script>