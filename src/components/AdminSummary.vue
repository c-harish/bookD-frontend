<template>
    <admin-navbar></admin-navbar>
    <h2>Summary</h2>

    <div class="btn-group" role="group">
        <button @click="activePage = 'Venue'" class="btn btn-light">Venues</button>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Shows
            </button>
            <ul class="dropdown-menu">
                <li @click="showToggle(venue.id)" v-for="venue in venues" :key="venue.id"><a class="dropdown-item" href="#">{{ venue.name }}</a></li>
            </ul>
        </div>
    </div>
    <venue-summary class="card" :label="venue_list" :data="percent_booked_list" :activepage="activePage"
        v-if="activePage === 'Venue'"></venue-summary>
    <venue-summary class="card" :label="show_list" :data="show_booked_list" :activepage="activePage"
        v-if="activePage === 'Show'"></venue-summary>

</template>

<script>
import axios from 'axios';
import VenueSummary from './VenueSummary.vue'
export default {
    components: { VenueSummary },
    data() {
        return {
            activePage: "",
            venues: "",
            venue_list: "",
            percent_booked_list: "",
            booked_list: "",
            show_list: "",
            show_booked_list: ""
        }
    },
    methods: {
        togglePage(p) {
            this.activePage = p;
        },
        getVenues() {
            const path = "http://127.0.0.1:5000/venues";
            const auth = { 'headers': { 'x-access-token': localStorage.getItem('token') } };
            axios.get(path, auth)
                .then((res) => {
                    this.venues = res.data.venues;
                })
                .catch((err) => console.log(err))
        },
        getVenueBookings() {
            const boooking_path = "http://127.0.0.1:5000/venue_bookings"
            const auth = { 'headers': { 'x-access-token': localStorage.getItem('token') } };
            axios.get(boooking_path, auth)
                .then((sres) => {
                    this.venue_list = sres.data.name_list;
                    this.percent_booked_list = sres.data.percent_list;
                    this.booked_list = sres.data.booked_list;
                })
        },
        getShowBookings(vid) {
            const show_booking_path = "http://127.0.0.1:5000/show_bookings?venueid=";
            const auth = { 'headers': { 'x-access-token': localStorage.getItem('token') } };
            axios.get(show_booking_path + vid, auth)
                .then((bres) => {
                    console.log(bres);
                    this.show_list = bres.data.name_list;
                    this.show_booked_list = bres.data.booked_list;
                    this.activePage = 'Show';
                })
        },
        showToggle(vid) {
            this.activePage = "";
            this.getShowBookings(vid);
        }
    },
    created() {
        document.title = "Summary";
        this.getVenues();
        this.getVenueBookings();
    }
}


</script>