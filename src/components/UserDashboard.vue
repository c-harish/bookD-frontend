<template>
    <user-navbar></user-navbar>
    <h2>User Dashboard</h2>
    <div>
        <body>
            <!-- Example Code -->
            <div class="d-flex flex-column">
                <div class="p-2" v-for="venue in venues" :key="venue.id">
                    <div>
                        <div class="d-flex flex-row justify-content-evenly">
                            <div>
                                <h4> {{ venue.name }} </h4>
                            </div>
                            <div>
                                <h6> {{ venue.place }} </h6>
                            </div>
                            <div>
                                <h6> {{ venue.location }} </h6>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-evenly flex-wrap">
                                <div v-for="show in shows[venue.id]" :key="show.id">
                                    <div>{{ show.name }}</div>
                                    <div>{{ show.time }}</div>
                                    <div>₹ {{ show.price }}</div>
                                    <div>{{ available_tickets[show.id] }}</div>
                                    <div class="d-flex flex-row justify-content-evenly">
                                        <book-show :show_name="show.name" 
                                        :show_price="show.price" 
                                        :show_tag="show.tag"
                                        :show_time="show.time" 
                                        :show_tickets="show.tickets" 
                                        :show_rating="show.rating"
                                        :show_id="show.id" 
                                        :show_venue_id="show.venue_id" 
                                        :show_venue_name="venue.name" 
                                        :show_venue_place="venue.place" 
                                        :show_venue_location="venue.location" 
                                        :show_available_tickets="available_tickets[show.id]"
                                        @show-booked="getVenues">
                                        </book-show>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End Example Code -->
        </body>
    </div>
</template>

<script>
import BookShow from "./BookShow.vue"
import axios from "axios";
export default {
    components: { BookShow },
    data() {
        return {
            venues: "",
            shows: {},
            book_showid: "",
            available_tickets: "",
        }
    },
    methods: {
        getVenues() {
            const path = "http://127.0.0.1:5000/venues";
            axios.get(path)
                .then((res) => {
                    this.venues = res.data.venues;
                    this.getShows();
                })
                .catch((err) => console.log(err))
        },
        getShows() {
            const show_path = "http://127.0.0.1:5000/shows/";
            this.venues.forEach((venue) => {
                        const showpath = show_path + venue.id;
                        axios.get(showpath)
                            .then((sres) => {
                                this.shows[venue.id] = sres.data.shows;
                                this.getAvailableTickets();
                            })
                    })
        },
        getAvailableTickets(){
            const path = "http://127.0.0.1:5000/tickets";
            axios.get(path)
                .then((res) => {
                    if (res.data.message === 'success'){
                    this.available_tickets = res.data.available;
                    }
                })

        }
    },
    created() {
        this.getVenues();
        // this.getShows();
    },
    // updated(){
    //     this.getVenues();
    // }
}

</script>