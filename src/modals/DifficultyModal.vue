<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.difficultyDialog"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title class="text-h5">
          Select Level Difficulty
        </v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col v-for="level in 6" :key="level" cols="12" md="4">
              <v-btn
                width="60"
                height="60"
                align="center"
                justify="center"
                class="display-3"
                depressed
                color="transparent"
                @click="startGame(level)"
                >{{ level }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="$store.state.primaryColor"
            text
            @click="$store.state.difficultyDialog = false"
          >
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import swal from "sweetalert2";
export default {
  data() {
    return {};
  },
  methods: {
    startGame(level) {
      switch (level) {
        case 1:
          this.$store.state.time = 90000;
          this.$store.state.difficulty = 4;
          this.$store.state.shuffleTime = 4;
          this.$store.state.noOfShuffles = 4;
          this.$store.state.scoreDecrementor = -50;
          this.$store.state.currentScore = 5000;
          this.$store.state.selectedLevel = level;
          break;
        case 2:
          this.$store.state.time = 90000 * 3;
          this.$store.state.difficulty = 9;
          this.$store.state.shuffleTime = 6;
          this.$store.state.noOfShuffles = 6;
          this.$store.state.scoreDecrementor = -150;
          this.$store.state.currentScore = 10000;
          this.$store.state.selectedLevel = level;
          break;
        case 3:
          this.$store.state.time = 90000 * 4;
          this.$store.state.difficulty = 11;
          this.$store.state.shuffleTime = 8;
          this.$store.state.noOfShuffles = 8;
          this.$store.state.scoreDecrementor = -350;
          this.$store.state.currentScore = 15000;
          this.$store.state.selectedLevel = level;
          break;
        case 4:
          this.$store.state.time = 90000 * 6;
          this.$store.state.difficulty = 13;
          this.$store.state.shuffleTime = 10;
          this.$store.state.noOfShuffles = 10;
          this.$store.state.scoreDecrementor = -515;
          this.$store.state.currentScore = 25000;
          this.$store.state.selectedLevel = level;
          break;
        case 5:
          this.$store.state.time = 90000 * 12;
          this.$store.state.difficulty = 15;
          this.$store.state.shuffleTime = 12;
          this.$store.state.noOfShuffles = 12;
          this.$store.state.scoreDecrementor = -500;
          this.$store.state.currentScore = 45000;
          this.$store.state.selectedLevel = level;
          break;
        case 6:
          this.$store.state.time = 90000 * 25;
          this.$store.state.difficulty = 17;
          this.$store.state.shuffleTime = 15;
          this.$store.state.noOfShuffles = 15;
          this.$store.state.scoreDecrementor = -500;
          this.$store.state.currentScore = 225000;
          this.$store.state.selectedLevel = level;
          break;
      }
      localStorage.setItem(
        "user" + this.$store.state.userAddress,
        JSON.stringify({
          level: level,
          time: this.$store.state.time,
          difficulty: this.$store.state.difficulty,
          shuffleTime: this.$store.state.shuffleTime,
          noOfShuffles: this.$store.state.noOfShuffles,
          scoreDecrementor: this.$store.state.scoreDecrementor,
          score: this.$store.state.currentScore,
        })
      );
      this.$store.state.difficultyDialog = false;
      this.playWarning(this.$store.state.levelJoinFee, level);
    },
    playWarning(playFee, level) {
      let _this = this;
      swal
        .fire({
          title: "Play Fee",
          showCancelButton: true,
          confirmButtonText: `Continue`,
          text: `Playing the game requires you transfer ${playFee /
            (1 * 10 ** 18)} Puzzled Tokens`,
        })
        .then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            _this.$store.state.difficultyDialog = false;
            _this.$store.state.isLoading = true;
            console.log("paying");
            _this.$store.state.token.methods
              .balanceOf(_this.$store.state.userAddress)
              .call({ from: _this.$store.state.userAddress, gas: 6000000 })
              .then((balance, error) => {
                console.log("user balance: ", balance, balance == 0);
                if (balance == 0) {
                  _this.$store.dispatch(
                    "error",
                    `Seems like you dont have a valid balance please ensure you have a balance equal to 
                    ${(
                      _this.$store.state.levelJoinFee /
                      (1 * 10 ** 18)
                    ).toString()} P Token`
                  );
                  _this.$store.state.difficultyDialog = true;
                  _this.$store.state.isLoading = false;
                } else {
                  _this.$store.state.token.methods
                    .approve(
                      _this.$store.state.tournamentContract.options.address,
                      _this.$store.state.levelJoinFee
                    )
                    .send({
                      from: _this.$store.state.userAddress,
                      gas: 6000000,
                    })
                    .then((receipt, error) => {
                      _this.$store.state.token.methods
                        .transfer(
                          _this.$store.state.tournamentContract.options.address,
                          _this.$store.state.levelJoinFee
                        )
                        .send({
                          from: _this.$store.state.userAddress,
                          gas: 6000000,
                        })
                        .then(async (receipt, error) => {
                          receipt = await _this.$store.state.tournamentContract.methods
                            .play(level)
                            .send({
                              from: _this.$store.state.userAddress,
                              gas: 6000000,
                            });
                          _this.$store.state.levelId =
                            receipt.events.NewGame.returnValues.levelId;
                          console.log("levelId: ", _this.$store.state.levelId);
                          _this.$store.state.isLoading = false;
                          _this.$store.state.difficultyDialog = false;
                          _this.$router.push({ path: "/game" });
                        });
                    })
                    .catch(async (error) => {
                      console.log(
                        "error approving token to play game: ",
                        error
                      );
                      _this.$store.dispatch(
                        "error",
                        "Something went wrong whilst approving tokens to play game please ensure you have a sufficient balance"
                      );
                      await _this.$store.state.token.methods
                        .approve(
                          _this.$store.state.tournamentContract.options.address,
                          _this.$store.state.levelJoinFee
                        )
                        .send({
                          from: _this.$store.state.userAddress,
                          gas: 6000000,
                        });
                      _this.$store.state.difficultyDialog = true;
                      _this.$store.state.isLoading = false;
                    });
                }
              })
              .catch((error) => {
                console.log("error checking user balance: ", error);
                console.log("ending game");
                _this.$store.state.difficultyDialog = true;
                _this.$store.state.isLoading = false;
              });
          } else if (result.isDenied) {
            console.log("ending game");
            _this.$store.state.isLoading = false;
            _this.$store.state.difficultyDialog = true;
          }
        });
    },
  },
};
</script>

<style></style>
