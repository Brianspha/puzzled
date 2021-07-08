/*=========================================== imports start=========================================== */
import "js-loading-overlay";
import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
import swal from "sweetalert2";
/*=========================================== variables start=========================================== */
var appSecret ="123123+++---"
const { publicKey, privateKey } = genKeyPairFromSeed(appSecret);
const client = new SkynetClient("https://siasky.net/");
var revision = 0;
var SELECTOR_REPLAY_INTRO_BUTTONS = "#button-replay";
var SELECTOR_BUTTON_NEWGAME = ".button-newgame";
var SELECTOR_BUTTON_GAME_MENU = ".button-game-menu";
var SELECTOR_BUTTON_LEADERBOARD = ".button-leaderboard";
var SELECTOR_BUTTON_CREDITS = ".button-credits";
var SELECTOR_BUTTON_ABOUT = ".button-about";

var timelineIntroScreen;
/*=========================================== functions start=========================================== */
function showLoading() {
  JsLoadingOverlay.show({ spinnerIcon: "ball-pulse-rise" });
}

function hideLoading() {
  JsLoadingOverlay.hide();
}
function warning(title, message) {
  swal.fire(title, message, "warning");
}
function buildTimelines() {
  timelineIntroScreen = new TimelineMax({
    paused: false,
  });

  timelineIntroScreen.staggerFrom(
    ".screen-intro .button",
    2,
    {
      css: {
        scale: 0,
      },
      autoAlpha: 0,
      ease: Elastic.easeOut,
    },
    0.1
  );
}

function playIntroButtons() {
  timelineIntroScreen.restart();
}

function reverseIntroButtons() {
  timelineIntroScreen.reverse();
}

function fadeToScreen(targetScreenClassName) {
  var _nameScreen;

  if (!targetScreenClassName) {
    _nameScreen = "screen-intro";
  }

  _nameScreen = targetScreenClassName;

  var $elementTarget = $("." + _nameScreen);
  var $elementActiveScreen = $(".active-screen");

  console.log("$elementTarget: ", $elementTarget);
  console.log("targetScreenClassName: ", targetScreenClassName);
  console.log("$elementActiveScreen: ", $elementActiveScreen);

  return TweenMax.to($elementActiveScreen, 0.4, {
    autoAlpha: 0,
    y: "+=10",
    onComplete: function() {
      console.log("onComplete: ", $elementTarget);

      $elementActiveScreen.removeClass("active-screen");

      TweenMax.to($elementTarget, 0.4, {
        y: "-=10",
        autoAlpha: 1,
        className: "+=active-screen",
      });
    },
  });
}

// Initialize
$(document).ready(buildTimelines);

// Bindings
$(document).on("click", SELECTOR_REPLAY_INTRO_BUTTONS, function(event) {
  event.preventDefault();

  if (!$(".screen-intro").hasClass("active-screen")) {
    return;
  }

  playIntroButtons();
});

$(document).on("click", SELECTOR_BUTTON_NEWGAME, function(event) {
  event.preventDefault();
  reverseIntroButtons();
  window.location.href = "game.html";

  timelineIntroScreen.eventCallback("onReverseComplete", function() {
    fadeToScreen("screen-game");
  });
});
$(document).on("click", SELECTOR_BUTTON_LEADERBOARD, function(event) {
  event.preventDefault();
  reverseIntroButtons();

  timelineIntroScreen.eventCallback("onReverseComplete", function() {
    fadeToScreen("screen-leaderboard");
  });
});
$(document).on("click", SELECTOR_BUTTON_ABOUT, function(event) {
  event.preventDefault();
  reverseIntroButtons();

  timelineIntroScreen.eventCallback("onReverseComplete", function() {
    fadeToScreen("screen-about");
  });
});
$(document).on("click", SELECTOR_BUTTON_CREDITS, function(event) {
  event.preventDefault();
  reverseIntroButtons();

  timelineIntroScreen.eventCallback("onReverseComplete", function() {
    fadeToScreen("screen-credits");
  });
});
$(document).on("click", SELECTOR_BUTTON_GAME_MENU, function(event) {
  event.preventDefault();
  console.log("going back to mainmenu");
  var tween = fadeToScreen("screen-intro");
  playIntroButtons();
});
async function init() {
  var playerLimit = 5;
  showLoading();
  var test = await getSkyData();
  var data = { players: [] };
  if (!test) {
    warning("No users have played the game");
  } else {
    data = await getSkyData();
    data = data.data.players.map((player) => {
      const reducer = (accumulator, currentValue) =>
        accumulator + currentValue.tokensCollected;
      console.log(
        "player.levels.reduce(reducer): ",
        player.levels.reduce(reducer)
      );
      player = {
        userID: player.userID,
        tokensCollected: player.levels.reduce(reducer).tokensCollected,
      };
      return player;
    });
    data.sort(function(a, b) {
      return b.tokensCollected - a.tokensCollected;
    });
    revision = data.revision;
    $("#list").empty();
    var count = 0;
    data.map((player) => {
      if (count < playerLimit) {
        $("#list").append(
          ` <li><span class="name">${player.userID}</span><span class="percent">${player.tokensCollected}</span></li>`
        );
        count++;
      }
    });
  }
  hideLoading();
}
$(".button-leaderboard").on("click", async function() {
  init();
});
function saveData(data) {
  client.db.setJSON(privateKey, appSecret, data, revision).then((results) => {
    console.log("results: ", results);
  });
}

async function getSkyData() {
  var test = await client.db.getJSON(publicKey, appSecret);
  return test;
}
function showWarning(message) {
  swal.fire({
    text: message,
    title: "Game Compatibility",
    icon: "warning",
  });
}

showWarning(
  "Please note that the game is only playable if you have test eth only on the Polygon Network see **About** option in Game menu for more information"
);
