
<style scoped>
.main {
  max-width: 250px;
  flex: 0 1 auto;
  background-color: wheat;
  padding: 10px;
  border-radius: 10px;
}
.head {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 2px brown solid;
}
div {
  font-size: 20px;
  word-wrap: break-word;
}
input {
  margin: 0;
}
.chk {
  margin: 0 5px;
}
img {
  max-height: 16px;
}
.edit {
  margin-top: 10px;
  color: black;
  padding: 0 5px;
}
.urgent {
  background-color: palevioletred;
}
</style>

<template>
  <div class="main">
    <div class="head">
      <input
        type="text"
        placeholder="Title"
        class=""
        v-model="title"
        @keyup="titleKey"
      />
      <input
        class="chk"
        type="checkbox"
        v-model="isurgent"
        @click="chkboxclick"
      />
      <img src="../assets/cancel.png" alt="close" @click="deleteNote" />
    </div>
    <contenteditable
      tag="div"
      class="edit"
      :class="isurgent ? 'urgent' : ''"
      :contenteditable="true"
      v-model="message"
      :noNL="true"
      :noHTML="true"
      @returned="changeAccepted('message')"
    />
    <!-- <div class="edit" contenteditable="true" >    </div> -->
  </div>
</template>

<script>
// import $ from 'jquery'
import contenteditable from "vue-contenteditable";
import AjaxService from "../AjaxService";

export default {
  name: "NoteComponent",
  components: {
    contenteditable,
  },
  props: {
    data: {
      type: Object,
    },
    index: {
      type: Number,
    },
    userToken: null,
  },
  data() {
    return {
      isurgent: false,
      message: "",
      title: "",
    };
  },
  created() {
    this.isurgent = this.data.isurgent;
    this.message = this.data.message;
    this.title = this.data.title;
  },
  methods: {
    async changeAccepted(propName) {
      await AjaxService.UpdateNote(this.userToken, {
        index: this.index,
        propertyname: propName,
        value: this[propName],
      });
    },
    async deleteNote() {
      alert(`note ${this.index} deleated`);
      await AjaxService.DeleteNote(this.userToken, this.index);
    },
    titleKey(ev) {
      ev.preventDefault();
      if (ev.keyCode == 13) this.changeAccepted("title");
    },
    chkboxclick() {
      this.changeAccepted("isurgent");
    },
  },
};

//display data of a single note, edit here too
</script>
