import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Timer from "tiny-timer";
import swal from "sweetalert2";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import ERC20 from "../../contracts/embarkArtifacts/contracts/ERC20";
const { publicKey, privateKey } = genKeyPairFromSeed(
  process.env.VUE_APP_APP_SECRET
);
const bigNumber = require("bignumber.js");
const client = new SkynetClient("https://siasky.net/");
Vue.use(Vuex);
localStorage.setItem("nextLevel", false);
/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "keyname",
      storage: window.localStorage,
    }),
  ],
  modules: {},
  state: {
    levelUp: false,
    mediaRecorder: {},
    tokenPurchaseDialog: false,
    levelId: "",
    levelJoinFee: new bigNumber(500 * 10 ** 18).toFixed(),
    tournamentContract: require("../../contracts/embarkArtifacts/contracts/TournamentContract")
      .default,
    token: ERC20,
    appSecret: process.env.VUE_APP_APP_SECRET,
    privateKey: privateKey,
    publicKey: publicKey,
    skyClient: client,
    isLoading: false,
    currentMoves: 0,
    scoreDecrementor: 0,
    currentScore: 0,
    timeDialog: false,
    selectedlevel: 1,
    primaryColor: "green darken-1",
    difficultyDialog: false,
    leaderboardDialog: false,
    time: 90000,
    difficulty: 4,
    shuffleTime: 4,
    noOfShuffles: 4,
    userAddress: "0xbd6581FBDc3d3f42B44A1f1416ee5c2a5B7b85f6",
    tokenAddress: "",
    connected: false,
    timer: new Timer(),
    revision: 1,
    stream: {},
  },
  actions: {
    setUpRecorder() {
      //store.state.stream = document.getElementById("mazeCanvas");
      stream = store.state.stream.captureStream();
      let options = { mimeType: "video/webm" };
      recordedBlobs = [];
      try {
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e0) {
        console.log("Unable to create MediaRecorder with options Object: ", e0);
        try {
          options = { mimeType: "video/webm;codecs=vp8" };
          mediaRecorder = new MediaRecorder(stream, options);
        } catch (e1) {
          console.log(
            "Unable to create MediaRecorder with options Object: ",
            e1
          );
          try {
            options = { mimeType: "video/webm;codecs=daala" };
            mediaRecorder = new MediaRecorder(stream, options);
          } catch (e2) {
            try {
              options = { mimeType: "video/webm;codecs=h264" };
              mediaRecorder = new MediaRecorder(stream, options);
            } catch (error) {
              try {
                options = { mimeType: "video/webm;codecs=h264" };
                mediaRecorder = new MediaRecorder(stream, options);
              } catch (error) {
                try {
                  options = { mimeType: "video/mpeg" };
                  mediaRecorder = new MediaRecorder(stream, options);
                } catch (error) {
                  alert(
                    "MediaRecorder is not supported by this browser.\n\n" +
                      "Try Firefox 29 or later, or Chrome 47 or later, " +
                      "with Enable experimental Web Platform features enabled from chrome://flags."
                  );
                  console.error("Exception while creating MediaRecorder:", e2);
                  return;
                }
              }
            }
          }
        }
      }
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;
    },
    saveData: async function(context, data) {
      const results = await client.db.setJSON(
        this.state.privateKey,
        this.state.appSecret,
        data,
        BigInt(this.state.revision)
      );
      console.log("results: ", results);
    },
    stopTimer(context, _) {
      this.state.timer.stop();
    },
    continueTimer(context, _) {
      this.state.timer.stop();
      this.state.timer.start(this.state.time);
    },
    updateTime(context, time) {
      console.log("updating time with: ", time);
      this.state.time += time;
      console.log("new time: ", this.state.time);
    },
    success(context, message) {
      console.log("shwoing success message: ", message);
      swal.fire("Success", message, "success");
    },
    warning(context, message) {
      console.log("shwoing success message: ", message);
      swal.fire("Warning", message, "warning");
    },
    error(context, message) {
      console.log("shwoing error message: ", message);
      swal.fire("Error!", message, "error").then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("leveled");
        } else if (result.isDenied) {
          console.log("ending game");
        }
      });
    },
    successWithFooter(context, message) {
      console.log("shwoing successWithFooter message: ", message);
      swal.fire({
        icon: "success",
        title: "Success",
        text: message.message,
        footer: `<a href= https://testnet.bscscan.com/tx/${message.txHash}> View on Binance Explorer</a>`,
      });
    },
    errorWithFooterMetamask(context, message) {
      console.log("shwoing successWithFooter message: ", message);
      swal.fire({
        icon: "error",
        title: "Error!",
        text: message,
        footer: `<a href= https://metamask.io> Download Metamask</a>`,
      });
    },
    nextLevel(context, _) {
      swal
        .fire({
          title: "Next Level",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Continue`,
          denyButtonText: `End Game`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            console.log("leveled");
          } else if (result.isDenied) {
            console.log("ending game");
          }
        });
    },
  },
});

export default store;
