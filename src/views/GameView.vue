<template>
  <v-row justify="center" align="center">
    <level-details />
  </v-row>
</template>

<script>
import LevelDetails from "./LevelDetails.vue";
import swal from "sweetalert2";
import FileSaver from "file-saver";
export default {
  components: { LevelDetails },
  data() {
    return {
      frame: {},
      stream: {},
      recordedBlobs: [],
      mediaRecorder: {},
      stage: {},
    };
  },
  mounted() {
    //  this.setUpRecorder();
    this.init();
  },
  methods: {
    getSkyData: async function() {
      var test = await this.$store.state.skyClient.db.getJSON(
        publicKey,
        appSecret
      );
      return test;
    },
    setUpRecorder() {
      this.stream = document.getElementById("myCanvas");
      this.stream = this.stream.captureStream();
      let options = { mimeType: "video/webm" };
      this.recordedBlobs = [];
      try {
        console.log("assinged mediaRecorder");
      } catch (e0) {
        console.log("Unable to create MediaRecorder with options Object: ", e0);
        try {
          options = { mimeType: "video/webm;codecs=vp8" };

          console.log("assinged mediaRecorder1");
        } catch (e1) {
          console.log(
            "Unable to create MediaRecorder with options Object: ",
            e1
          );
          try {
            options = { mimeType: "video/webm;codecs=daala" };
            console.log("assinged mediaRecorder2");
          } catch (e2) {
            try {
              options = { mimeType: "video/webm;codecs=h264" };
              console.log("assinged mediaRecorder3");
            } catch (error) {
              try {
                options = { mimeType: "video/webm;codecs=h264" };
                console.log("assinged mediaRecorder4");
              } catch (error) {
                try {
                  options = { mimeType: "video/mpeg" };
                  console.log("assinged mediaRecorder5");
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
      this.mediaRecorder = new MediaRecorder(this.stream, options);
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.onstop = this.handleStop;
      // this.setUpRecorder();
    },
    startRecording() {
      this.mediaRecorder.start();
      //mediaRecorder.start();
    },
    stopRecording() {
      this.mediaRecorder.stop();
    },
    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    },
    handleStop: async function(event) {
      let _this = this;
      console.log("this.recordedBlobs: ", this.recordedBlobs);
      var test = URL.createObjectURL(this.recordedBlobs[0]);
      console.log("url: ", test);
      fetch(test)
        .then((r) => r.blob())
        .then(async (blob) => {
          this.$store.state.isLoading = true;
          var file_name = this.$store.state.userAddress + "recording.webm"; //e.g ueq6ge1j_name.pdf
          var file_object = new File([blob], file_name, { type: "video/webm" });
          const { skylink } = await this.$store.state.skyClient.uploadFile(
            file_object
          );
          console.log("output file name: ", file_object, " skylink: ", skylink); //Output
          _this.$store.state.tournamentContract.methods
            .completeLevel(
              _this.$store.state.levelId,
              _this.$store.state.currentScore
            )
            .send({ from: _this.$store.state.userAddress, gas: 6000000 })
            .then((receipt, error) => {
              swal
                .fire({
                  title: "Next Level",
                  showCancelButton: true,
                  confirmButtonText: `Continue`,
                  denyButtonText: `End Game`,
                })
                .then(async (result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    _this.$store.state.selectedLevel++;
                    switch (_this.$store.state.selectedLevel) {
                      case 1:
                        _this.$store.state.time += 90000;
                        _this.$store.state.difficulty = 4;
                        _this.$store.state.shuffleTime = 4;
                        _this.$store.state.noOfShuffles = 4;
                        _this.$store.state.scoreDecrementor = -50;
                        _this.$store.state.currentScore = 5000;
                        _this.$store.state.selectedLevel = 1;
                        break;
                      case 2:
                        _this.$store.state.time += 90000 * 3;
                        _this.$store.state.difficulty = 9;
                        _this.$store.state.shuffleTime = 6;
                        _this.$store.state.noOfShuffles = 6;
                        _this.$store.state.scoreDecrementor = -150;
                        _this.$store.state.currentScore = 10000;
                        _this.$store.state.selectedLevel = 2;
                        break;
                      case 3:
                        _this.$store.state.time += 90000 * 4;
                        _this.$store.state.difficulty = 11;
                        _this.$store.state.shuffleTime = 8;
                        _this.$store.state.noOfShuffles = 8;
                        _this.$store.state.scoreDecrementor = -150;
                        _this.$store.state.currentScore = 15000;
                        _this.$store.state.selectedLevel = 3;
                        break;
                      case 4:
                        _this.$store.state.time += 90000 * 6;
                        _this.$store.state.difficulty = 13;
                        _this.$store.state.shuffleTime = 10;
                        _this.$store.state.noOfShuffles = 10;
                        _this.$store.state.scoreDecrementor = -205;
                        _this.$store.state.currentScore = 25000;
                        _this.$store.state.selectedLevel = 4;
                        break;
                      case 5:
                        _this.$store.state.time += 90000 * 12;
                        _this.$store.state.difficulty = 15;
                        _this.$store.state.shuffleTime = 12;
                        _this.$store.state.noOfShuffles = 12;
                        _this.$store.state.scoreDecrementor = -300;
                        _this.$store.state.currentScore = 45000;
                        _this.$store.state.selectedLevel = 5;
                        break;
                      case 6:
                        _this.$store.state.time += 90000 * 25;
                        _this.$store.state.difficulty = 17;
                        _this.$store.state.shuffleTime = 15;
                        _this.$store.state.noOfShuffles = 15;
                        _this.$store.state.scoreDecrementor = -400;
                        _this.$store.state.currentScore = 225000;
                        _this.$store.state.selectedLevel = 6;
                        break;
                      default:
                        swal
                          .fire({
                            title: "You have completed all levels",
                            showCancelButton: false,
                            confirmButtonText: `To Menu`,
                          })
                          .then(async (result) => {
                             localStorage.clear()
                             window.location.href = "/";
                          });
                        break;
                    }
                    receipt = await _this.$store.state.tournamentContract.methods
                      .play(_this.$store.state.selectedLevel)
                      .send({
                        from: _this.$store.state.userAddress,
                        gas: 6000000,
                      });
                    _this.$store.state.levelId =
                      receipt.events.NewGame.returnValues.levelId;
                    console.log("levelId: ", _this.$store.state.levelId);
                    _this.$store.state.isLoading = false;
                    _this.$store.state.difficultyDialog = false;
                    console.log("leveled");

                    localStorage.setItem(
                      "user" + _this.$store.state.userAddress,
                      JSON.stringify({
                        level: _this.$store.state.selectedLevel,
                        time: _this.$store.state.time,
                        difficulty: _this.$store.state.difficulty,
                        shuffleTime: _this.$store.state.shuffleTime,
                        noOfShuffles: _this.$store.state.noOfShuffles,
                        score: _this.$store.state.currentScore,
                        scoreDecrementor: _this.$store.state.scoreDecrementor,
                      })
                    );
                    localStorage.setItem("nextLevel", true);
                    _this.$router.go();
                    _this.$store.state.levelUp = true;
                    // _this.stage.update()
                  } else if (result.isDenied) {
                    console.log("ending game");
                  }
                });
              this.$store.state.isLoading = false;
            })
            .catch((error) => {
              _this.$store.dispatch(
                "Something went wrong whilst transferring level tokens"
              );
              _this.$store.state.isLoading = false;
              console.log(
                "error cashing user tokens: ",
                error,
                " no of tokens: ",
                _this.$store.state.currentScore
              );
            });
        });
      // const superBuffer = new Blob(this.recordedBlobs, { type: "video/webm" });
      //var data = await Promise.resolve(this.blobToVideo(superBuffer));
      //await Promise.resolve(upload(data));
      //FileSaver.saveAs(data, "recording" + Date.now() + ".webm");
    },
    blobToVideo: async function(blob) {
      return new Promise((resolve) => {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
          if (evt.target.readyState == FileReader.DONE) {
            console.log("done loading file: ", btoa(evt.target.result));
            //callback(evt.target.result);
            resolve("data:video/webm;base64," + btoa(evt.target.result));
          }
        };
        console.log("blob: ", blob);
        reader.readAsDataURL(blob);
      });
    },
    init() {
      localStorage.setItem("nextLevel", false);
      let _this = this;
      var waiter = new Waiter();
      this.frame = new Frame({
        scaling: "fit",
        width: window.innerWidth,
        height: window.innerHeight,
        color: "white",
        outerColor: "orange",
        assets: [
          "level1.jpeg",
          "level2.jpeg",
          "level3.jpeg",
          "level4.jpeg",
          "level5.jpeg",
          "level6.jpeg",
        ],
        path: "levels/",
        progress: waiter,
      });
      this.frame.on("ready", () => {
        this.setUpRecorder();
        this.startRecording();
        var user = JSON.parse(
          localStorage.getItem("user" + _this.$store.state.userAddress)
        );
        _this.$store.state.level = user.level;
        _this.$store.state.difficulty = user.difficulty;
        _this.$store.state.shuffleTime = user.shuffleTime;
        _this.$store.state.noOfShuffles = user.noOfShuffles;
        _this.$store.state.time = user.time;
        _this.$store.state.currentScore = user.score;
        _this.$store.state.scoreDecrementor = user.scoreDecrementor;
        // often need below - so consider it part of the template
        const stage = this.frame.stage;
        const stageW = this.frame.width;
        const stageH = this.frame.height;
        _this.state = stage;

        // REFERENCES for ZIM at https://zimjs.com
        // see https://zimjs.com/intro.html for an intro example
        // see https://zimjs.com/learn.html for video and code tutorials
        // see https://zimjs.com/docs.html for documentation
        // see https://codepen.io/topic/zim/ for ZIM on CodePen

        // CODE HERE

        const thumbs = [];
        const cols = user.difficulty;
        const rows = user.difficulty;
        console.log("user: ", user);
        const image = asset(`level${user.level}.jpeg`);
        console.log("image: ", image);
        const w = image.width / cols;
        const h = image.height / rows;

        // cut up the image and shift its location
        loop(rows, (r) => {
          loop(cols, (c) => {
            thumbs.push(new Bitmap(image, w, h, c * w, r * h));
          });
        });

        // normally a Tile makes copies of the object passed to it
        // and if we passed an array, it would randomly pick from the array
        // As of ZIM Cat... an unique parameter has been added to Tile (true here)
        // that means it will just use the array to make a unique series
        var tile = new Tile(thumbs, cols, rows, 0, 0, true);
        console.log(
          "scramble: ",
          user.shuffleTime, // optional time to scramble and number of scrambles
          user.noOfShuffles
        );
        // the Scrambler will let the user slide the tile elements!
        const puzzle = new Scrambler({
          tile: tile,
          time: user.shuffleTime, // optional time to scramble and number of scrambles
          num: user.noOfShuffles,
        }).center();

        document
          .getElementById("myCanvas")
          .addEventListener("click", function() {
            _this.$store.state.currentMoves++;
            console.log("currentMoves: ", _this.$store.state.currentMoves);
          });
        puzzle.on("complete", function() {
          console.log("completed puzzle");
          _this.stopRecording();
          _this.$store.dispatch("stopTimer");
          image.centerReg().animate({
            props: { rotation: -360 },
            time: 2,
            ease: "backInOut",
          });
          puzzle.removeFrom();
          stage.update();
          if (_this.$store.state.selectedLevel == 6) {
            console.log("no more levels");
          } else {
            stage.update();
          }
        });
        stage.update(); // this is needed to show any changes

        // DOCS FOR ITEMS USED
        // http://zimjs.com/docs.html?item=frame
      }); // end of ready
    },
  },
};
</script>

<style></style>
