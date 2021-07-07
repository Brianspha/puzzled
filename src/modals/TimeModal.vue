<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.timeDialog" persistent>
      <v-card>
        <v-card-title class="text-h5">
          Select Time to add
        </v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000, 200)"
                >1 Minute @200 PTokens
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000 * 3, 1000)"
                >3 Minute @1000 PTokens
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000 * 6, 3000)"
                >6 Minute @3000 PTokens
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000 * 10, 6000)"
                >10 Minute @6000 PTokens
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000 * 15, 12000)"
                >15 Minutes @12000 PTokens
              </v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                height="60"
                align="center"
                justify="center"
                depressed
                color="transparent"
                @click="addTime(60000 * 30, 18000)"
                >30 Minutes @18000 PTokens
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :color="$store.state.primaryColor"
            text
            @click="
              $store.state.timeDialog = false;
              $store.dispatch('continueTimer');
            "
          >
            Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import bigNumber from "bignumber.js";
export default {
  data() {
    return {};
  },
  methods: {
    addTime(time, amount) {
      let _this = this;
      _this.$store.state.timeDialog = false;
      _this.$store.state.token.methods
        .balanceOf(_this.$store.state.userAddress)
        .call({ from: _this.$store.state.userAddress, gas: 6000000 })
        .then((balance, error) => {
          console.log("user balance: ", balance, balance == 0);
          if (
            new bigNumber(balance).toFixed() <=
            new bigNumber(amount * (1 * 10 ** 18)).toFixed()
          ) {
            _this.$store.dispatch(
              "error",
              `Seems like you dont have a valid balance please ensure you have a  valid balance equal to 
                    ${amount.toString()} P Token`
            );
            _this.$store.state.timeDialog = true;
            _this.$store.state.isLoading = false;
          } else {
            _this.$store.state.token.methods
              .approve(
                _this.$store.state.tournamentContract.options.address,
                new bigNumber(amount * (1 * 10 ** 18)).toFixed()
              )
              .send({
                from: _this.$store.state.userAddress,
                gas: 6000000,
              })
              .then((receipt, error) => {
                _this.$store.state.token.methods
                  .transfer(
                    _this.$store.state.tournamentContract.options.address,
                    new bigNumber(amount * (1 * 10 ** 18)).toFixed()
                  )
                  .send({
                    from: _this.$store.state.userAddress,
                    gas: 6000000,
                  })
                  .then((receipt, error) => {
                    _this.$store.state.timeDialog = true;
                    _this.$store.state.isLoading = false;
                    console.log(
                      "_this.$store.state.currentTime before: ",
                      _this.$store.state.time
                    );
                    _this.$store.state.time += time;
                    console.log(
                      "_this.$store.state.currentTime after: ",
                      _this.$store.state.currentTime
                    );
                  })
                  .catch(async (error) => {
                    console.log("error approving token to play game: ", error);
                    _this.$store.dispatch(
                      "error",
                      "Something went wrong whilst transfering tokens to purchasing more time please ensure you have a sufficient balance"
                    );
                    await _this.$store.state.token.methods
                      .approve(
                        _this.$store.state.tournamentContract.options.address,
                        new bigNumber(amount * (1 * 10 ** 18)).toFixed()
                      )
                      .send({
                        from: _this.$store.state.userAddress,
                        gas: 6000000,
                      });
                    _this.$store.state.timeDialog = true;
                    _this.$store.state.isLoading = false;
                  });
              })
              .catch((error) => {
                console.log("error approving token to play game: ", error);
                _this.$store.dispatch(
                  "error",
                  "Something went wrong whilst approving tokens to purchasing more time please ensure you have a sufficient balance"
                );
                _this.$store.state.timeDialog = true;
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
    },
  },
};
</script>

<style></style>
