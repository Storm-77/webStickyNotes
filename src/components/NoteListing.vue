<template>

  <div class="grid" v-if="userId != null">

    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    <NoteComponent />
    
  </div>

</template>

<script>
import NoteComponent from "./NoteComponent";

export default {
  name: "NoteListing",
  components: {
    NoteComponent,
  },
  props: {
    userId: null,
  },
 /*  watch:{
      userId(){
          if(this.userId != null){
              //login
              alert(this.userId);
          }
          else{
              //logout
          }
      }
  } */
};

//dispatching note data
</script>

<style scoped>

.grid{
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto auto auto;
  background-color: #2196F3;
  padding: 10px;
  grid-gap: 25px;
  margin-left: auto;
  margin-right: auto;
}
</style>