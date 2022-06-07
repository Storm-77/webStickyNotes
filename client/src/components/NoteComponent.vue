
<style scoped>
.main {
  max-width: 230px;
  background-color: wheat;
  padding: 10px;  
  border-radius: 10px;
}
.head {
  display:flex;
  align-items:center;
  padding: 5px 0;
  border-bottom: 2px brown solid;
}
div{
   font-size: 20px;
}
input{
  margin:0;
}
.chk{

  margin: 0 5px;
}
img{
  max-height: 16px;
}
.edit {
  margin-top: 10px;
  color: black;
  padding: 0 5px;
}
.urgent{
background-color: palevioletred;
}
</style>

<template>
  <div class="main">
    <div class="head">
      <input type="text" placeholder="Title" class="" v-model="title" />
      <input class="chk" type="checkbox" v-model="isUrgent" />
      <img src="../assets/cancel.png" alt="close" @click="deleteNote">

    </div>
    <contenteditable
      tag="div"      
      class="edit"      
      :class="isUrgent?'urgent':''"
      :contenteditable="true"
      v-model="msg"
      :noNL="true"
      :noHTML="true"
      @returned="changeAccepted"
    />
    <!-- <div class="edit" contenteditable="true" >    </div> -->
  </div>
</template>

<script>
// import $ from 'jquery'
import contenteditable from "vue-contenteditable";

export default {
  name: "NoteComponent",
  components: {
    contenteditable,
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      isUrgent: false,
      msg: "",
      title: "",
    };
  },
  created() {
    // $(".ui.checkbox").checkbox();
  },
  methods: {
    changeAccepted() {
      //save changes
      alert("Enter Pressed");
    },
    deleteNote(){
      alert(`note ${this.title} deleated`);
      //delete from database
    }
  },
  watch:{
    isUrgent(val){
      console.log(val);
    }
  }
};

//display data of a single note, edit here too
</script>
