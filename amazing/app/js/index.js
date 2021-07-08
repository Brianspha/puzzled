/*=========================================== imports start=========================================== */
import swal from "sweetalert2";
import Timer from "tiny-timer";
import Web3 from "web3";
import $ from "jquery";
import EmbarkJS from "../../../contracts/embarkArtifacts/embarkjs";
import sablier from "../../../contracts/embarkArtifacts/contracts/Sablier";
import utils from "web3-utils";
import bigNumber from "bignumber.js";
import "js-loading-overlay";
import Amazeng from "../../../contracts/embarkArtifacts/contracts/Amazeng";

import FileSaver from "file-saver";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";

/*=========================================== variables start=========================================== */
var appSecret = "123123+++---";
const { publicKey, privateKey } = genKeyPairFromSeed(appSecret);
const client = new SkynetClient("https://siasky.net/");
var userAddress = "";
var recordedBlobs = [];
var difficultyIncrementor = 2;
var level = 15;
var difficulty = 6;
var currentLevel = 0;
var currentTime = 60000 * 2;
var baseTimeAdder = 20000;
var collectedTime = 0;
var tokenToStream = 0;
let stream, recorder;
var canRecord = false;
var mediaRecorder = {};
var revision = 0;
var user = { userID: "", levels: [], address: "" };
var users = { players: [] };
var bonusCollected = false,
  bonusCollected1 = false;
document.getElementById("level").innerHTML =
  "Current Level: " + currentLevel.toString();
document.getElementById("time").innerHTML =
  "Time Left: " + (currentTime / 1000).toFixed(0);
const timer = new Timer();

timer.on("tick", (ms) => {
  currentTime = ms;
  if (ms <= 0) {
    showGameOver(web3.eth.defaultAccount);
  } else {
    document.getElementById("time").innerHTML =
      "Time Left: " + (currentTime / 1000).toFixed(0) + " s";
  }
});
timer.on("done", () => console.log("done!"));
timer.on("statusChanged", (status) => console.log("status:", status));
/*=========================================== functions start=========================================== */
async function getSkyData() {
  var test = await client.db.getJSON(publicKey, appSecret);
  return test;
}
async function initRecorder() {}
function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
async function handleStop(event) {
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
  var data = await blobToVideo(superBuffer);
  //await Promise.resolve(upload(data));
  FileSaver.saveAs(data, "recording" + Date.now() + ".webm");
}
function stopRecording() {
  mediaRecorder.stop();
}

function showLoading() {
  JsLoadingOverlay.show({ spinnerIcon: "ball-pulse-rise" });
}

function hideLoading() {
  JsLoadingOverlay.hide();
}
async function blobToVideo(blob) {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        //callback(evt.target.result);
        resolve("data:video/webm;base64," + btoa(evt.target.result));
      }
    };
    reader.readAsBinaryString(blob);
  });
}
function setUpRecorder() {
  stream = document.getElementById("mazeCanvas");
  stream = stream.captureStream();
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
      console.log("Unable to create MediaRecorder with options Object: ", e1);
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
}
function startRecording() {
  mediaRecorder.start();
  //mediaRecorder.start();
}

window.ethereum.on("accountsChanged", function(accounts) {
  userAddress = accounts[0];
});
window.ethereum.on("networkChanged", function(netId) {
  userAddress = accounts[0];
  window.location.reload();
});
console.log('$("#button"): ', $("#button"));
function error(message) {
  swal
    .fire({
      title: "Error",
      text: message,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: `To Menu`,
    })
    .then((result) => {
      window.location.href = "index.html";
    });
}
function showGameOver(address) {
  swal
    .fire({
      title: "Game Over!!",
      text: "Restart or Cash Out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Restart",
      confirmButtonText: "Cash Out",
    })
    .then((result) => {
      if (result.value) {
        if (collectedTime <= 0 && tokenToStream <= 0) {
          showNoTokensCollectedError();
        } else {
          startTokenStream(address, player.getMoves());
        }
      } else {
        restart();
      }
    });
}
function restart() {
  window.location.href = "index.html";
}
function successWithFooter(message, address) {
  swal
    .fire({
      icon: "success",
      title: "Shmoney",
      text: message,
      footer: `<a href=https://ropsten.etherscan.io/address/${address}>Etherscan</a>`,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Close",
    })
    .then((result) => {
      if (result.value) {
        continueTimer();
      }
    });
}

function errorWithOptions(mesage) {
  swal
    .fire({
      title: "Game Over!!",
      text: mesage,
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continue",
    })
    .then((result) => {
      if (result.value) {
        continueTimer();
      }
    });
}
function startTokenStream(userAddress, moves) {
  timer.pause();
  JsLoadingOverlay.show({
    spinnerIcon: "ball-running-dots",
  });
  var perRound = new bigNumber(100000).multipliedBy(new bigNumber(10).pow(18)); //@dev this is known i.e. decimal places
  var amount = perRound.multipliedBy(tokenToStream);
  var tempStartTime = new bigNumber(
    new Date(new Date().setMinutes(new Date().getMinutes() + 10)).getTime()
  ).toFixed();
  var duration = getDuration(collectedTime);
  if (duration.unit === "days") {
    var endDate = new bigNumber(
      new Date(
        new Date().setDate(new Date().getDate() + duration.value)
      ).getTime()
    ).toFixed();
  }
  if (duration.unit === "hours") {
    var endDate = new bigNumber(
      new Date(
        new Date().setHours(new Date().getHours() + duration.value)
      ).getTime()
    ).toFixed();
  } else {
    var endDate = new bigNumber(
      new Date(
        new Date().setMinutes(new Date().getMinutes() + duration.value + 30) //@dev add 30 minutes for safety
      ).getTime()
    ).toFixed();
  }
  var timeDelta = new bigNumber(tempStartTime - endDate);
  console.log("timeDelta: ", timeDelta);
  amount = calculateDeposit(timeDelta, amount);
  amount = amount.toFixed();
  console.log("user token payout: ", amount);
  console.log("timeDelta: ", timeDelta, " endDate: ", endDate);
  console.log("sablier", sablier);
  Amazeng.methods
    .startStream(amount, tempStartTime, endDate)
    .send({
      gas: 6000000,
      from: userAddress,
    })
    .then(async (receipt, error) => {
      if (receipt) {
        successWithFooter(
          "Token stream has been initiated, and will start in 10 minutes, please check your P token balance on Etherscan click on link in footer",
          userAddress
        );

        var temp = JSON.parse(localStorage.getItem("player"));
        temp.userID = userAddress;
        var found = false;
        temp.levels = temp.levels.map((level) => {
          if (level.level === currentLevel) {
            found = true;
            level.sablierTimeCollected = collectedTime;
            level.tokensCollected = tokenToStream;
          }
          collectedTime = 0;
          tokenToStream = 0;
          return level;
        });
        if (!found) {
          temp.levels.push({
            level: currentLevel,
            time: currentTime,
            steps: moves,
            sablierTimeCollected: collectedTime,
            tokensCollected: tokenToStream,
          });
        }
        var test = await getSkyData();
        found = false;
        if (test) {
          var data = await getSkyData();
          data.data.players = data.data.players.map((player) => {
            if (player.userID === userAddress) {
              found = true;
              temp.levels.map((level) => {
                player.levels.push(level);
              });
            }
            return player;
          });
          if (!found) {
            data.data.players.push({
              userID: userAddress,
              levels: temp.levels,
            });
          }
          await saveData(data.data);
        } else {
          user.levels = temp.levels;
          user.userID = userAddress;
          await saveData({ players: [user] });
        }
        localStorage.setItem("player", JSON.stringify(temp));
        resetLabels(false);
        continueTimer();
      }
      console.log("receipt: ", receipt);
      console.log("error: ", error);
      JsLoadingOverlay.hide();
    })
    .catch((err) => {
      errorWithOptions(
        "Something went wrong please restart game and try again"
      );
      console.log("error starting token stream: ", err);
      JsLoadingOverlay.hide();
    });
}
function saveData(data) {
  client.db.setJSON(privateKey, appSecret, data, revision).then((results) => {
    console.log("results: ", results);
  });
}
function calculateDeposit(delta, deposit) {
  var diff = deposit.minus(deposit.minus(deposit.mod(delta)));
  deposit = new bigNumber(deposit).minus(diff);
  console.log("deposit.toFixed(): ", deposit.toFixed());
  return deposit;
}
function getUserAddress(moves) {
  swal
    .mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    })
    .queue([
      {
        title: "Enter you Ethereum Address",
        text:
          "This is used to stream the time capsules collected during your play through",
      },
    ])
    .then((result) => {
      if (result.value) {
        const address = result.value[0];
        console.log("address: ", address);
        var isAddress = utils.isAddress(address);
        if (!isAddress) {
          showAddressError();
        } else {
          console.log("answers: ", address);
          if (collectedTime > 0) {
            startTokenStream(address, moves);
          } else {
            showNoTokensCollectedError();
          }
        }
      } else {
        continueTimer();
        return false;
      }
    });
}
function getDuration(milli) {
  let minutes = Math.floor(milli / 60000);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);

  return (
    (days && { value: days, unit: "days" }) ||
    (hours && { value: hours, unit: "hours" }) || {
      value: minutes,
      unit: "minutes",
    }
  );
}
function showAddressError() {
  swal
    .fire({
      title: "Invalid Address",
      text: "You entered an invalid ethereum address",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    })
    .then((result) => {
      if (result.isConfirmed) {
        getUserAddress();
      }
    });
}
function showNoTokensCollectedError() {
  swal
    .fire({
      title: "No Collected Time Tokens",
      text: "Seems like you havent collected any time tokens",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    })
    .then((result) => {
      if (result.isConfirmed) {
        continueTimer();
      }
    });
}

function continueTimer() {
  timer.stop();
  timer.start(currentTime);
}
function success(title, message) {
  swal.fire(title, message, "success");
}
function updateTime(time) {
  console.log("updating time with: ", time);
  currentTime += time;
  console.log("new time: ", currentTime);
}
function rand(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function changeBrightness(factor, sprite) {
  var virtCanvas = document.createElement("canvas");
  virtCanvas.width = 500;
  virtCanvas.height = 500;
  var context = virtCanvas.getContext("2d");
  context.drawImage(sprite, 0, 0, 500, 500);

  var imgData = context.getImageData(0, 0, 500, 500);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = imgData.data[i] * factor;
    imgData.data[i + 1] = imgData.data[i + 1] * factor;
    imgData.data[i + 2] = imgData.data[i + 2] * factor;
  }
  context.putImageData(imgData, 0, 0);

  var spriteOutput = new Image();
  spriteOutput.src = virtCanvas.toDataURL();
  virtCanvas.remove();
  return spriteOutput;
}

function levelCompleted(moves) {
  timer.stop();
  swal
    .fire({
      title: "Level Completed",
      text: "You Moved " + moves + " Steps.",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continue",
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        showLoading();
        var temp = JSON.parse(localStorage.getItem("player"));
        temp.userID = userAddress;
        var found = false;
        temp.levels = temp.levels.map((level) => {
          if (level.level === currentLevel) {
            found = true;
            level = {
              level: currentLevel,
              time: currentTime,
              steps: moves,
              sablierTimeCollected: collectedTime,
              tokensCollected: tokenToStream,
            };
          }
          return level;
        });
        if (!found) {
          temp.levels.push({
            level: currentLevel,
            time: currentTime,
            steps: moves,
            sablierTimeCollected: collectedTime,
            tokensCollected: tokenToStream,
          });
        }
        var test = await getSkyData();
        found = false;
        if (test) {
          var data = await getSkyData();
          data.data.players = data.data.players.map((player) => {
            if (player.userID === userAddress) {
              found = true;
              temp.levels.map((level) => {
                player.levels.push(level);
              });
            }
            return player;
          });
          if (!found) {
            data.data.players.push({
              userID: userAddress,
              levels: temp.levels,
            });
          }
          await saveData(data.data);
        } else {
          user.levels = temp.levels;
          user.userID = userAddress;
          await saveData({ players: [user] });
        }
        currentTime += baseTimeAdder;
        localStorage.setItem("player", JSON.stringify(temp));
        difficulty += difficultyIncrementor;
        //  stopRecording();
        makeMaze();
        console.log("currentTime: ", currentTime);
        timer.start(currentTime);
        hideLoading();
      }
    });
}
function Maze(Width, Height) {
  var mazeMap;
  var width = Width;
  var height = Height;
  var startCoord, endCoord, randCoord, randCoord2;
  var dirs = ["n", "s", "e", "w"];
  var modDir = {
    n: {
      y: -1,
      x: 0,
      o: "s",
    },
    s: {
      y: 1,
      x: 0,
      o: "n",
    },
    e: {
      y: 0,
      x: 1,
      o: "w",
    },
    w: {
      y: 0,
      x: -1,
      o: "e",
    },
  };

  this.map = function() {
    return mazeMap;
  };
  this.startCoord = function() {
    console.log("startCoord: ", startCoord);
    return startCoord;
  };
  this.endCoord = function() {
    return endCoord;
  };
  this.randCoord1 = function() {
    return randCoord2;
  };
  this.randCoord = function() {
    return randCoord;
  };
  function genMap() {
    var mazeMap = new Array(height);
    for (var y = 0; y < height; y++) {
      mazeMap[y] = new Array(width);
      for (var x = 0; x < width; ++x) {
        mazeMap[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null,
        };
      }
    }
    return mazeMap;
  }

  function defineMaze() {
    var isComp = false;
    var move = false;
    var cellsVisited = 1;
    var numLoops = 0;
    var maxLoops = 0;
    var pos = {
      x: 0,
      y: 0,
    };
    var numCells = width * height;
    while (!isComp) {
      move = false;
      mazeMap[pos.x][pos.y].visited = true;

      if (numLoops >= maxLoops) {
        shuffle(dirs);
        maxLoops = Math.round(rand(height / 8));
        numLoops = 0;
      }
      numLoops++;
      for (var index = 0; index < dirs.length; index++) {
        var direction = dirs[index];
        var nx = pos.x + modDir[direction].x;
        var ny = pos.y + modDir[direction].y;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          //Check if the tile is already visited
          if (!mazeMap[nx][ny].visited) {
            //Carve through walls from this tile to next
            mazeMap[pos.x][pos.y][direction] = true;
            mazeMap[nx][ny][modDir[direction].o] = true;

            //Set Currentcell as next cells Prior visited
            mazeMap[nx][ny].priorPos = pos;
            //Update Cell position to newly visited location
            pos = {
              x: nx,
              y: ny,
            };
            cellsVisited++;
            //Recursively call this method on the next tile
            move = true;
            break;
          }
        }
      }

      if (!move) {
        //  If it failed to find a direction,
        //  move the current position back to the prior cell and Recall the method.
        pos = mazeMap[pos.x][pos.y].priorPos;
      }
      if (numCells == cellsVisited) {
        isComp = true;
      }
    }
  }

  function defineStartEnd() {
    randCoord = toss();
    randCoord2 = toss();
    switch (rand(4)) {
      case 0:
        startCoord = {
          x: 0,
          y: 0,
        };
        endCoord = {
          x: height - 1,
          y: width - 1,
        };

        break;
      case 1:
        startCoord = {
          x: 0,
          y: width - 1,
        };
        endCoord = {
          x: height - 1,
          y: 0,
        };
        break;
      case 2:
        startCoord = {
          x: height - 1,
          y: 0,
        };
        endCoord = {
          x: 0,
          y: width - 1,
        };
        break;
      case 3:
        startCoord = {
          x: height - 1,
          y: width - 1,
        };
        endCoord = {
          x: 0,
          y: 0,
        };
        break;
    }
  }

  var mazeMap = genMap();
  defineStartEnd();
  defineMaze();

  function toss() {
    var rand = Math.round(Math.random() * 10293891083);
    if (rand % 2 === 0) {
      return {
        x: Math.round(Math.random() * height),
        y: Math.round(Math.random() * width),
      };
    } else {
      return {
        x: -1,
        y: -1,
      };
    }
  }
}

function DrawMaze(Maze, ctx, cellsize, endSprite, timerSprite) {
  var map = Maze.map();
  var cellSize = cellsize;
  var drawEndMethod;
  ctx.lineWidth = cellSize / 40;

  this.redrawMaze = function(size) {
    cellSize = size;
    ctx.lineWidth = cellSize / 50;
    drawMap();
    drawEndMethod();
  };

  function drawCell(xCord, yCord, cell) {
    var x = xCord * cellSize;
    var y = yCord * cellSize;

    if (cell.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y);
      ctx.stroke();
    }
    if (cell.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.w === false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + cellSize);
      ctx.stroke();
    }
  }

  function drawMap() {
    for (var x = 0; x < map.length; x++) {
      for (var y = 0; y < map[x].length; y++) {
        drawCell(x, y, map[x][y]);
      }
    }
  }

  function drawEndFlag() {
    var coord = Maze.endCoord();
    var gridSize = 4;
    var fraction = cellSize / gridSize - 2;
    var colorSwap = true;
    for (let y = 0; y < gridSize; y++) {
      if (gridSize % 2 == 0) {
        colorSwap = !colorSwap;
      }
      for (let x = 0; x < gridSize; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * cellSize + x * fraction + 4.5,
          coord.y * cellSize + y * fraction + 4.5,
          fraction,
          fraction
        );
        if (colorSwap) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        colorSwap = !colorSwap;
      }
    }
  }

  function drawEndSprite() {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    var coord = Maze.endCoord();
    ctx.drawImage(
      endSprite,
      2,
      2,
      endSprite.width,
      endSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function drawTimerSprite() {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    var coord = Maze.randCoord();
    console.log("coord: ", coord);
    ctx.drawImage(
      timerSprite,
      2,
      2,
      timerSprite.width,
      timerSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function drawTimerSprite2() {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    var coord = Maze.randCoord1();
    console.log("coord: ", coord);
    ctx.drawImage(
      timerSprite,
      2,
      2,
      timerSprite.width,
      timerSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }
  function clear() {
    var canvasSize = cellSize * map.length;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  }

  if (endSprite != null) {
    drawEndMethod = drawEndSprite;
  } else {
    drawEndMethod = drawEndFlag;
  }
  clear();
  if (Maze.randCoord().x >= 0) {
    drawTimerSprite();
  }
  if (Maze.randCoord1().x >= 0) {
    drawTimerSprite2();
  }
  drawMap();
  drawEndMethod();
}

function Player(maze, c, _cellsize, onComplete, sprite) {
  var ctx = c.getContext("2d");
  var drawSprite;
  var moves = 0;
  drawSprite = drawSpriteCircle;
  if (sprite != null) {
    drawSprite = drawSpriteImg;
  }
  var player = this;
  var map = maze.map();
  var cellCoords = {
    x: maze.startCoord().x,
    y: maze.startCoord().y,
  };
  var cellSize = _cellsize;
  var halfCellSize = cellSize / 2;
  $("#button").on("click", (e) => {
    timer.pause();
    console.log("in button");
    getUserAddress(moves);
  });
  this.getMoves = function() {
    return moves;
  };
  this.redrawPlayer = function(_cellsize) {
    cellSize = _cellsize;
    drawSpriteImg(cellCoords);
  };

  function drawSpriteCircle(coord) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
    if (
      (coord.x !== -1 &&
        coord.x === maze.randCoord().x &&
        coord.y === maze.randCoord().y) ||
      (coord.x !== -1 &&
        coord.x === maze.randCoord1().x &&
        coord.y === maze.randCoord1().y)
    ) {
      bonusTime();
      console.log("collected collectible");
    }
    console.log("currentCoord: ", coord);
  }
  function getDuration(milli) {
    let minutes = Math.floor(milli / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);

    return (
      (days && { value: days, unit: "days" }) ||
      (hours && { value: hours, unit: "hours" }) || {
        value: minutes,
        unit: "minutes",
      }
    );
  }
  function bonusTime() {
    if (!bonusCollected) {
      bonusCollected = true;
      processCollection();
    }
    if (!bonusCollected1) {
      bonusCollected1 = true;
      processCollection();
    }
    function processCollection() {
      var bonusTimeCollected = Math.round(Math.random() * 604800000);
      var bonusTime = Math.round(Math.random() * 61000);
      console.log("bonusTime: ", bonusTime);
      tokenToStream += Math.round(Math.random() * 100000);
      currentTime += bonusTime;
      collectedTime += bonusTimeCollected;
      var time = getDuration(collectedTime);
      resetLabels(true);
      document.getElementById("tokensCollected").innerHTML =
        " Tokens Collected: " + tokenToStream;
      document.getElementById("timeCollected").innerHTML =
        "  Collected Time: " + time.value + " " + time.unit;
      $("#body")
        .fadeOut(100)
        .fadeIn(100);
    }
    timer.stop();
    timer.start(currentTime);
  }
  function drawSpriteImg(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );

    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
    if (
      (coord.x !== -1 &&
        coord.x === maze.randCoord().x &&
        coord.y === maze.randCoord().y) ||
      (coord.x !== -1 &&
        coord.x === maze.randCoord1().x &&
        coord.y === maze.randCoord1().y)
    ) {
      bonusTime();
      console.log("collected collectible");
    }
    console.log("currentCoord: ", coord);
  }

  function removeSprite(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.clearRect(
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }

  function check(e) {
    var cell = map[cellCoords.x][cellCoords.y];
    moves++;
    switch (e.keyCode) {
      case 65:
      case 37: // west
        if (cell.w == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x - 1,
            y: cellCoords.y,
          };
          drawSprite(cellCoords);
        }
        break;
      case 87:
      case 38: // north
        if (cell.n == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y - 1,
          };
          drawSprite(cellCoords);
        }
        break;
      case 68:
      case 39: // east
        if (cell.e == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x + 1,
            y: cellCoords.y,
          };
          drawSprite(cellCoords);
        }
        break;
      case 83:
      case 40: // south
        if (cell.s == true) {
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y + 1,
          };
          drawSprite(cellCoords);
        }
        break;
    }
  }

  this.bindKeyDown = function() {
    window.addEventListener("keydown", check, false);
    $("#view").on("swipe.up", (e) => {
      console.log("swiped up");
      check({
        keyCode: 38,
      });
    });

    $("#view").on("swipe.down", (e) => {
      check({
        keyCode: 40,
      });
    });

    $("#view").on("swipe.left", (e) => {
      check({
        keyCode: 37,
      });
    });

    $("#view").on("swipe.right", (e) => {
      check({
        keyCode: 39,
      });
    });
  };

  this.unbindKeyDown = function() {
    window.removeEventListener("keydown", check, false);
    $("#view").on("destroy", function(e) {
      e.stopPropagation();
      e.preventDefault();
    });
  };

  drawSprite(maze.startCoord());

  this.bindKeyDown();
}

var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
console.log("ctx onject: ", ctx, mazeCanvas);
ctx.fillStyle = "transparent";
ctx.clearRect(0, 0, mazeCanvas.width, mazeCanvas.height);

var sprite;
var finishSprite;
var timerSprite;
var maze, draw, player;
var cellSize;
var difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function() {
  showLoading();
  let currentWeb3;
  if (window.ethereum) {
    currentWeb3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      EmbarkJS.enableEthereum()
        .then((results) => {
          console.log("metaenabled: ", results);
          userAddress = results[0];
          let viewWidth = $("#view").width();
          let viewHeight = $("#view").height();
          if (viewHeight < viewWidth) {
            ctx.canvas.width = viewHeight - viewHeight / 100;
            ctx.canvas.height = viewHeight - viewHeight / 100;
          } else {
            ctx.canvas.width = viewWidth - viewWidth / 100;
            ctx.canvas.height = viewWidth - viewWidth / 100;
          }
          //Load and edit sprites
          var completeOne = false;
          var completeTwo = false;
          var completeThree = false;
          var isComplete = () => {
            if (completeOne && completeTwo && completeThree) {
              console.log("Runs");
              setTimeout(async function() {
                //setUpRecorder();
                // await initRecorder()
                makeMaze();
                //startRecording();
                hideLoading();
                timer.start(currentTime);
              }, 500);
            }
          };
          sprite = new Image();
          timerSprite = new Image();
          sprite.src = "https://i.ibb.co/0mcvD4J/5c8e54a4893930029d46f81b.png";
          sprite.setAttribute("crossOrigin", " ");
          sprite.onload = function() {
            sprite = changeBrightness(1.2, sprite);
            console.log("playerSprite: ", sprite);
            completeOne = true;
            console.log(completeOne);
            isComplete();
          };
          timerSprite.src =
            "https://i.ibb.co/XZdfxjT/coin-clipart-drawn-17.gif";
          timerSprite.setAttribute("crossOrigin", " ");
          timerSprite.onload = function() {
            timerSprite = changeBrightness(1.2, timerSprite);
            completeThree = true;
            console.log(completeThree);
            isComplete();
          };
          finishSprite = new Image();
          finishSprite.src =
            "https://i.ibb.co/FBdnzhr/tumblr-nce3mk-RXbx1rftvj7o1-400.gif";
          finishSprite.setAttribute("crossOrigin", " ");
          finishSprite.onload = function() {
            finishSprite = changeBrightness(1.1, finishSprite);
            completeTwo = true;
            console.log(completeTwo);
            isComplete();
          };
        })
        .catch((error) => {
          console.log("user rejected metamask request");
          error("Please allow access for the app to work");
        });
      window.web3 = new Web3(web3.currentProvider);
      userAddress = web3.eth.defaultAccount;
      console.log("userAddress: ", userAddress);
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
      console.log("user rejected metamask request");
      error("Please allow access for the app to work");
    }
  } else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    error(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

window.onresize = function() {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (player != null) {
    draw.redrawMaze(cellSize);
    player.redrawPlayer(cellSize);
  }
};

function resetLabels(show) {
  if (show) {
    $("#tokensCollected").removeClass("hidden");
    $("#timeCollected").removeClass("hidden");
    $("#tokensCollected").removeClass("show");
    $("#timeCollected").removeClass("show");
  } else {
    $("#tokensCollected").addClass("hidden");
    $("#timeCollected").addClass("hidden");
  }
}

function makeMaze() {
  currentLevel++;
  document.getElementById("level").innerHTML =
    "Current Level: " + currentLevel.toString();
  //document.getElementById("mazeCanvas").classList.add("border");
  if (player != undefined) {
    player.unbindKeyDown();
    player = null;
  }
  bonusCollected = false;
  cellSize = mazeCanvas.width / difficulty;
  console.log("sprite: ", sprite, " timerSprite: ", timerSprite);
  maze = new Maze(difficulty, difficulty);
  draw = new DrawMaze(maze, ctx, cellSize, finishSprite, timerSprite);
  player = new Player(maze, mazeCanvas, cellSize, levelCompleted, sprite);
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }
}
function showCompatibilityError() {
  swal
    .fire({
      title:
        "Game is not playable on current network selected on metamask please switch to the Goerli Test Network",
      confirmButtonText: `Close`,
    })
    .then((result) => {
      window.location.reload();
    });
}
web3.eth.net.getId((err, netId) => {
  switch (netId.toString()) {
    case "5":
      console.log("This is matic");
      break;
    default:
      console.log("in default");
      showCompatibilityError()
  }
});
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
document.addEventListener(
  "keydown",
  function(e) {
    //document.onkeydown = function(e) {
    // "I" key
    if (e.ctrlKey && e.shiftKey && e.code == 73) {
      disabledEvent(e);
    }
    // "J" key
    if (e.ctrlKey && e.shiftKey && e.code == 74) {
      disabledEvent(e);
    }
    // "S" key + macOS
    if (
      e.code == 83 &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      disabledEvent(e);
    }
    // "U" key
    if (e.ctrlKey && e.code == 85) {
      disabledEvent(e);
    }
    // "F12" key
    if (e.code == 123) {
      disabledEvent(e);
    }
  },
  false
);
function disabledEvent(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true;
  }
  e.preventDefault();
  return false;
}

if (window.performance) {
  console.info("window.performance works fine on this browser");
}
console.info(performance.navigation.type);
if (
  String(window.performance.getEntriesByType("navigation")[0].type) ===
    "back_forward" ||
  String(window.performance.getEntriesByType("navigation")[0].type) === "reload"
) {
  console.info("This page is reloaded");
  window.location.href = "index.html";
} else {
  console.info("This page is not reloaded");
}
