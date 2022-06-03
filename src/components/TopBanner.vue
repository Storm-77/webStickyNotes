<template>
  <nav class="ui menu inverted navbar page grid" style="margin-bottom: 0px">
    <a href="" class="brand item">Simple notes</a>
    <div class="right menu" v-if="!loggedIn">
      <div class="item">
        <div class="ui input">
          <input type="input" placeholder="Login" v-model="login" />
        </div>
      </div>
      <div class="item">
        <div class="ui input">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
      </div>
      <div class="item">
        <button @click="loginAttempt" class="ui green button">Sign in</button>
      </div>
    </div>
    <div v-else class="right menu">
      <div class="item" v-if="loggedIn">
        <button @click="logoutAttempt" class="ui red button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopBanner",
  components: {},
  methods: {
    loginAttempt() {
      this.loggedIn = true;

      //todo handle user authentication functionality

      this.login = "";
      this.password = "";

      this.$emit("successfull-login", 123);
    },

    logoutAttempt() {
      this.loggedIn = false;
      this.$emit("logout-attempt");
    },
  },
  data() {
    return {
      login: "",
      password: "",
      loggedIn: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
