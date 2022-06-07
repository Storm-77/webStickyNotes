<template>
  <TopBanner @successfull-login="onLogin" @logout-attempt="onLogout" />

  <NoteListing :userId="userId" />
</template>

<script>
import TopBanner from "./components/TopBanner";
import NoteListing from "./components/NoteListing";

export default {
  name: "App",
  components: {
    TopBanner,
    NoteListing,
  },
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    onLogin(userId) {
      this.userId = userId;      
    },
    onLogout() {
      this.userId = null;
    },
  },
  async created() {
    // const res = await fetch(
    //       "https://randomuser.me/api/?results=15&noinfo&inc=name,login,id,picture,gender"
    //     );
    //     res.json().then((data) => {
    //       this.contacts = data.results;
    //     });
  },
};
</script>

<style>
html,
body {
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: whitesmoke;
  /* margin-top: 60px; */
}
</style>
