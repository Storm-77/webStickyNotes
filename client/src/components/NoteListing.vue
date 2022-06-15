<template>
  <div class="grid" v-if="userToken != null">
    <NoteComponent v-for="(note, index) in notes" :key="note" :data="note" :index="index" :userToken="userToken" />

    <button class="addBtn" @click="addNote">+</button>
  </div>
</template>

<script>
import NoteComponent from "./NoteComponent";
import AjaxService from "../AjaxService";

export default {
  name: "NoteListing",
  components: {
    NoteComponent,
  },
  props: {
    userToken: null,
  },
  data() {
    return {
      notes: [],
    };
  },
  methods: {
    addNote() {
      this.notes.push({
        title: "default",
        message: "default",
        isurgent: false,
      });
    },
  },
  watch: {
    userToken() {
      if (this.userToken != null) {
        AjaxService.GetNotes(this.userToken).then(
          (notes) => (this.notes = notes)
        );
      } else {
        this.notes = [];
      }
    },
  },
};

//dispatching note data
</script>

<style scoped>
.grid {
  /* display: grid; */
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* grid-template-columns: auto auto auto auto auto; */
  background-color: #2196f3;
  padding: 15px;
  grid-gap: 25px;
  /* margin-left: auto; */
  /* margin-right: auto; */
}
.addBtn {
  width: 40px;
  height: 40px;
  outline-style: initial;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  background-color: orange;
  color: brown;
  border: 3px brown solid;
  cursor: pointer;
}
</style>