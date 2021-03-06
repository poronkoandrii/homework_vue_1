const app = new Vue({
  el: "#app",
  data: {
    color: "",
    backgroundColor: "",
  },
  computed: {
    styles: function () {
      return { background: this.color };
    },
  },
  methods: {
    changeColor: function () {
      this.color = this.backgroundColor;
      this.backgroundColor = "";
    },
  },
});
