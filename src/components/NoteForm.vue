<template>
  <div class="note-form">
    <v-card class="rounded-lg">
      <input type="text" v-model="title" />
      <textarea v-model="textContent"></textarea>
    </v-card>
    <div class="add-note" @click="addNote"><span>add</span></div>
  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      id: this.notes.length,
      title: "",
      textContent: ""
    };
  },
  methods: {
    addNote() {
      const note = {
        id: this.notes.length,
        title: this.title,
        textContent: this.textContent
      };
      this.$emit("addNote", [...this.notes, note]);
    }
  }
};
</script>

<style lang="scss" scoped>
.note-form {
  position: relative;
  display: flex;
  .v-card {
    background: #fff;
    width: 274px;
    height: 180px;
    z-index: 10;
    input,
    textarea {
      width: 80%;
      margin: 5px;
      border-bottom: 1px solid black;
      outline: none;
      transition: 0.4s;
      &:focus {
        border-bottom: 1px solid blue;
      }
    }

    input {
      height: 30px;
    }

    textarea {
      height: 100px;
      resize: none;
    }
  }
  .add-note {
    width: 36px;
    height: 72px;

    position: relative;
    display: flex;
    align-items: center;
    transform: translateY(18px);
    // z-index: -10;

    background: #84e0a9;
    border-radius: 0px 15px 15px 0px;

    transition: 0.5s;

    cursor: pointer;

    span {
      transform: rotate(-90deg);
    }

    &::before {
      content: "";
      position: absolute;
      width: 15px;
      height: 72px;
      background: #84e0a9;
      z-index: -10;
      transform: translate(-10px);
    }

    &:hover {
      transform: translate(5px, 18px);
    }
  }
}
</style>
