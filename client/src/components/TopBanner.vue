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
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            @keyup="enterConfirm"
          />
        </div>
      </div>
      <div class="item">
        <button @click="loginAttempt" class="ui green button">Sign in</button>
      </div>
      <div class="item">
        <button @click="registerAttempt" class="ui orange button">
          Register
        </button>
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
import AjaxService from "../AjaxService";

export default {
  name: "TopBanner",
  components: {},
  methods: {
    enterConfirm(ev) {
      if (ev.keyCode == 13) this.loginAttempt();
    },
    async loginAttempt() {
      const token = await AjaxService.LoginUser({
        login: this.login,
        password: this.password,
      });

      if (!token) {
        alert("login failed");
        return;
      }

      this.login = "";
      this.password = "";
      this.loggedIn = true;

      this.$emit("successfull-login", token);
    },

    async registerAttempt() {
      const token = await AjaxService.RegisterUser({
        login: this.login,
        password: this.password,
      });

      if (!token) {
        alert("cannot register, userlogin might be reserved");
        return;
      }

      this.login = "";
      this.password = "";
      this.loggedIn = true;

      this.$emit("successfull-login", token);
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
