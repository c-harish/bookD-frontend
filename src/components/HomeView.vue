<template>
  <div>
    <home-navbar></home-navbar>
    <h1>
      {{ msg }}
    </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    getResponse() {
      const path = "http://127.0.0.1:5000/";
      axios
        .get(path)
        .then((res) => {
          console.log(res);
          this.msg = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getResponse();
  },
};
</script>
