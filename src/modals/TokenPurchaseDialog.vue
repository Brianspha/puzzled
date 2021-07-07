<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.tokenPurchaseDialog"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title class="text-h5">
          Purchase Tokens
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              :color="$store.state.primaryColor"
              label="Number of P Tokens"
              type="number"
              v-model="amount"
              :rules="numberRules"
            >
            </v-text-field>
            <v-btn
              :disabled="!valid"
              :color="$store.state.primaryColor"
              class="mr-4"
              @click="purchase"
            >
              Purchase
            </v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="$store.state.tokenPurchaseDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import utils from "web3-utils";
import bigNumber from 'bignumber.js'
export default {
  data() {
    return {
      amount: 0,
      valid: true,
      numberRules: [
        (v) => !!v || "Number is required",
        (v) =>
          (v && !isNaN(v) && parseInt(v) > 0) ||
          "Invalid number must be greater than 0",
      ],
    };
  },
  methods: {
    purchase() {
      let _this = this;
      this.$store.state.tokenPurchaseDialog = false;
      this.$store.state.isLoading = true;
      this.$store.state.tournamentContract.methods
        .purchaseTokens(this.amount)
        .send({
          from: this.$store.state.userAddress,
          gas: 6000000,
          value: utils.toWei(
            new bigNumber(0.0000045 * 10 ** 18)
              .multipliedBy(_this.amount)
              .toFixed(),
            "wei"
          ),
        })
        .then((receipt, error) => {
          _this.$store.state.isLoading = false;
          _this.$store.dispatch("success", "Succesfully purchased tokens");
        })
        .catch((error) => {
          console.log("error purchasing tokens: ", error);
          _this.$store.state.isLoading = false;
          _this.$store.dispatch(
            "error",
            "Something went wrong whilst purchasing tokens"
          );
        });
    },
  },
};
</script>

<style></style>
