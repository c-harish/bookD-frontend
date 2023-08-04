<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#addVenue">
        Add Venue
    </button>

    <!-- Modal -->
    <div class="modal fade modal-lg" id="addVenue" tabindex="-1" aria-labelledby="addVenueLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addVenueLabel">Add New Venue</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addVenueForm" @submit.prevent="submitVenue">
                        <div class="mb-3">
                            <label for="venueName" class="form-label">Venue Name</label>
                            <input v-model="venueName" type="text" class="form-control" id="venueName" required>
                        </div>
                        <div class="mb-3">
                            <label for="venuePlace" class="form-label">Venue Place</label>
                            <input v-model="venuePlace" type="text" class="form-control" id="venuePlace" required>
                        </div>
                        <div class="mb-3">
                            <label for="venueLocation" class="form-label">Venue Location</label>
                            <input v-model="venueLocation" type="text" class="form-control" id="venueLocation" required>
                        </div>
                        <div class="mb-3">
                            <label for="venueCapacity" class="form-label">Venue Capacity</label>
                            <input v-model="venueCapacity" type="number" class="form-control" id="venueCapacity" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button ref="CloseModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button form="addVenueForm" type="submit" class="btn btn-outline-dark">Add</button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            venueName : "",
            venuePlace : "",
            venueLocation : "",
            venueCapacity : ""
        }
    },
    methods : {
        submitVenue(){
            const path = "http://127.0.0.1:5000/venues";
                const payload = {
                    name: this.venueName,
                    place: this.venuePlace,
                    location: this.venueLocation,
                    capacity: this.venueCapacity
                };
                const auth = {'headers': {'x-access-token': localStorage.getItem('token')}};
                axios.post(path, payload, auth)
                .then((res) => {
                    this.msg = res.data.message;
                    if (this.msg === "success"){
                        this.venueName = "";
                        this.venuePlace = "";
                        this.venueLocation = "";
                        this.venueCapacity="";
                        this.$refs.CloseModal.click();
                    }
                })
                .catch((err) => console.log(err));


            }

        }
    }

</script>