<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" :data-bs-target="'#editVenue' + venue_id">
        Edit Venue
    </button>

    <!-- Modal -->
    <div class="modal fade modal-lg" :id="'editVenue' + venue_id" tabindex="-1" aria-labelledby="editVenueLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editVenueLabel">Edit Venue</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <form :id="'editVenueForm' + venue_id" @submit.prevent="editVenue">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>                            
                                        <label for="venueName" class="form-label">Edit Venue Name</label>
                                    </td>
                                    <td>
                                        <input v-model="venueName" type="text" class="form-control" id="venueName" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="venuePlace" class="form-label">Edit Venue Place</label>
                                    </td>
                                    <td>
                                        <input v-model="venuePlace" type="text" class="form-control" id="venuePlace" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="venueLocation" class="form-label">Edit Venue Location</label>
                                    </td>
                                    <td>
                                        <input v-model="venueLocation" type="text" class="form-control" id="venueLocation" required>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button :form="'editVenueForm' + venue_id" type="submit" class="btn btn-outline-dark">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props: ['venue_name', 'venue_place', 'venue_location', 'venue_id', 'venue_tickets'],
    data() {
        return {
            venueName: this.venue_name,
            venuePlace: this.venue_place,
            venueLocation: this.venue_location,
            venueCapacity: this.venue_tickets,
            venueID: this.venue_id
        }
    },
    methods: {
        editVenue() {
            const path = "http://127.0.0.1:5000/venues/" + this.venueID;
            const payload = {
                name: this.venueName,
                place: this.venuePlace,
                location: this.venueLocation,
                capacity: this.venueCapacity,
                id: this.venueID
            };
            const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
            axios.put(path, payload, auth)
                .then((res) => {
                    this.msg = res.data.message;
                    if (res.data.message === "success") {
                        console.log('venue edited successfully');
                        this.$refs.CloseModal.click();
                    }
                })
                .catch((err) => console.log(err));


        }


    }
}
</script>