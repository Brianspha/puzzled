<template>
  <v-card max-width="100vw" max-height="80px" class="bottom-stick" flat>
    <v-card-text>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="sm">
          <v-card tile>
            <v-card-title
              class="d-flex justify-center mb-6 subtitle-1"
              style="padding-bottom:0px;"
              >Score
            </v-card-title>
            <v-card-text class="d-flex justify-center">{{
              $store.state.currentScore
            }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="sm">
          <v-card tile>
            <v-card-title
              class="d-flex justify-center mb-6 subtitle-1"
              style="padding-bottom:0px;"
              >Moves
            </v-card-title>
            <v-card-text class="d-flex justify-center">{{
              $store.state.currentMoves
            }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="sm">
          <v-card tile>
            <v-card-title
              class="d-flex justify-center mb-6 subtitle-1"
              style="padding-bottom:0px;"
              >Time
            </v-card-title>
            <v-card-text class="d-flex justify-center">{{
              (currentTime / 1000).toFixed(0) + " s"
            }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="sm">
          <v-card @click="buyTime">
            <v-card-title
              class="d-flex justify-center mb-6 subtitle-1"
              style="padding-bottom:0px;"
              >Add Time</v-card-title
            >
            <v-card-text class="d-flex justify-center"
              ><v-icon>mdi-clock-time-five-outline</v-icon></v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <time-modal />
  </v-card>
</template>

<script>
import TimeModal from "../modals/TimeModal.vue";
import swal from "sweetalert2";
export default {
  components: { TimeModal },
  data() {
    return {
      currentTime: 0,
    };
  },
  watch: {
    "$store.state.levelUp": function() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.state.timer.on("tick", (ms) => {
        console.log("currentScore: ", this.$store.state.scoreDecrementor);
        if (this.$store.state.currentScore <= 0) {
          this.$store.state.currentScore = 0;
        } else {
          this.$store.state.currentScore += this.$store.state.scoreDecrementor;
        }
        if (ms <= 0) {
          this.currentTime = "Times up!!";
          console.log("done");
          this.timesUp = true;
          swal
            .fire({
              title: "You have run out of time",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: `Buy More Time`,
              denyButtonText: `End Game`,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                this.buyTime();
              } else {
                localStorage.clear();
                 window.location.href = "/";
              }
            });
        } else {
          this.currentTime = ms;
          this.$store.state.time = ms;
          console.log(
            "current time left: ",
            (this.currentTime / 1000).toFixed(0) + " s"
          );
        }
      });
      this.$store.state.timer.on("done", () => console.log("done!"));
      this.$store.state.timer.on("statusChanged", (status) =>
        console.log("status:", status)
      );
      this.$store.state.timer.start(
        this.$store.state.time + this.$store.state.shuffleTime * 1000
      );
    },
    startCountDown() {},
    buyTime() {
      this.$store.state.timeDialog = true;
      this.$store.dispatch("stopTimer");
    },
  },
};
</script>

<style>
.bottom-stick {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 150px;
  z-index: 1;
}
</style>
