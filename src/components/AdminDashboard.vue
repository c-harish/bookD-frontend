<template>
    <admin-navbar @search-key="adminSearch"></admin-navbar >
    <h2>Admin Dashboard</h2>
    <add-venue @venue-added="getVenues"></add-venue>
    <div>
        <body>
            <div class="card d-flex flex-column">
                <div class="card p-2" v-for="venue in venues" :key="venue.id">
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
                        <div class="d-flex flex-row justify-content-evenly">
                            <add-show :venue_tickets="venue.capacity" :venue_id="venue.id" @show-added="getVenues"></add-show>
                            <edit-venue :venue_name="venue.name" :venue_place="venue.place" :venue_location="venue.location"
                                :venue_id="venue.id" :venue_tickets="venue.capacity" @venue-edited="getVenues">
                            </edit-venue>
                            <button @click="deleteVenue(venue.id)" type="button" class="btn btn-outline-dark">Delete Venue</button>
                        </div>
                        <div>
                            <div class="d-flex justify-content-evenly flex-wrap">
                                <div class="card" v-for="show in shows[venue.id]" :key="show.id">
                                    <div>{{ show.name }}</div>
                                    <div>{{ show.time }}</div>
                                    <div>₹ {{ show.price }}</div>
                                    <div class="d-flex flex-row justify-content-evenly">
                                        <edit-show :show_name="show.name" :show_price="show.price" :show_tag="show.tag"
                                            :show_time="show.time" :show_tickets="show.tickets" :show_rating="show.rating"
                                            :show_id="show.id" :show_venue_id="show.venue_id" @show-edited="getVenues">
                                        </edit-show>
                                        <button @click="deleteShow(show.id)" type="button" class="btn btn-outline-dark">Delete Show</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    </div>
</template>

<script>
import AddVenue from "./AddVenue.vue"
import EditVenue from "./EditVenue.vue"
import AddShow from "./AddShow.vue"
import EditShow from "./EditShow.vue"
import axios from "axios";
export default {
    components: { AddVenue, AddShow, EditVenue, EditShow },
    data() {
        return {
            venues: "",
            shows: {},
            delete_showid: "",
            delete_venueid: ""
        }
    },
    methods: {
        getVenues() {
            const path = "http://127.0.0.1:5000/venues";
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.get(path, auth)
                .then((res) => {
                    this.venues = res.data.venues;
                    this.getShows();
                })
                .catch((err) => console.log(err))
        },
        getShows() {
            const show_path = "http://127.0.0.1:5000/shows?venueid=";
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            this.venues.forEach((venue) => {
                        const showpath = show_path + venue.id;
                        axios.get(showpath, auth)
                            .then((sres) => {
                                this.shows[venue.id] = sres.data.shows;
                            })
                    })
        },
        deleteVenue(dvi) {
            this.delete_venueid = dvi;
            const delete_venue_path = `http://127.0.0.1:5000/venues/${this.delete_venueid}`  
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.delete(delete_venue_path, auth)
                .then((dsres) => {
                    if (dsres.data.message === "success"){
                        console.log("venue delete complete success");
                        this.getVenues();
                    }
                })
                .catch((err) =>
                    console.log(err))
        },
        deleteShow(dsi) {
            this.delete_showid = dsi;
            const delete_show_path = `http://127.0.0.1:5000/shows/${this.delete_showid}`  
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.delete(delete_show_path, auth)
                .then((dsres) => {
                    console.log(dsres.data);
                    if (dsres.data.message === "success"){
                        console.log("show delete complete success");
                        this.getVenues();
                    }
                })
                .catch((err) =>
                    console.log(err))
        },
        adminSearch(sk){
            this.searchVenues(sk);
        },
        searchVenues(sk) {
            const path = `http://127.0.0.1:5000/venues/search?key=${sk}`;
            console.log(path);
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.get(path, auth)
                .then((res) => {
                    this.venues = res.data.venues;
                    this.searchShows(sk);
                })
                .catch((err) => console.log(err))
        },
        searchShows(sk) {
            const show_path = `http://127.0.0.1:5000/shows/search?key=${sk}&venueid=`;
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            this.venues.forEach((venue) => {
                        const showpath = show_path + venue.id;
                        axios.get(showpath, auth)
                            .then((sres) => {
                                console.log(sres.data.shows);
                                this.shows[venue.id] = sres.data.shows;
                            })
                    })
        },

    },
    created() {
        this.getVenues();
        document.title = "Admin Dashboard";
    },
}

</script>