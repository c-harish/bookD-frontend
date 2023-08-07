<template>
    <Bar :options="barchartOptions" :data="barchartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Legend, Title, Tooltip, BarElement, CategoryScale, LinearScale)

export default {
    props: ['label', 'data', 'activepage'],
    components: { Bar },
    data() {
        return {
            barchartData: {
                labels: "",
                datasets: []
            },
            barchartOptions: {
                responsive: true
            },
        }
    },
    created() {
        this.barchartData['labels'] = this.label;
        if (this.activepage === 'Venue'){
            this.barchartData['datasets'].push({ data: this.data, label: 'Percent Booked in Venues' })}
        else{
            this.barchartData['datasets'].push({ data: this.data, label: 'Booked Tickets in Shows' })}

        }
    }
</script>