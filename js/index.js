var app = angular.module('TicTacToe', [])

app.controller('MainController', ['$scope', '$timeout', function($scope, $timeout) {

  swal("Let's play tic-tac-toe!");

  $scope.spaces = {
    sp1: "",
    sp2: "",
    sp3: "",
    sp4: "",
    sp5: "",
    sp6: "",
    sp7: "",
    sp8: "",
    sp9: ""
  };

  $scope.user = "X";
  $scope.comp = "O";

  $scope.gameOver = false;
  $scope.isDraw = false;

  // Player selects their square
  $scope.markChoice = function(space) {
    if ($scope.spaces[space] === "") {
      $scope.spaces[space] = $scope.user;
      $scope.gameOver = $scope.checkForWin(space);
      $scope.isDraw = $scope.checkForDraw();

      if ($scope.gameOver == true) {
        $timeout(function() {
          swal({
            title: "Hooray! You've won the game!",
            text: "Resetting the board...",
            type: "success",
          });

          $scope.resetBoard();

        }, 200);
      } else if ($scope.isDraw == true) {
         $timeout(function() {
          swal({
            title: "The game ended in a draw!",
            text: "Resetting the board...",
            type: "warning",
          });

          $scope.resetBoard();

        }, 200);
      } else {
        $timeout(function() {
          $scope.compSelect();
        }, 200);
      }
    } else {
      swal("Please select an empty place.");
    }
  }

  // Computer slects their square
  $scope.compSelect = function() {
    var flag = true;
    var num;

    do {
      num = Math.floor((Math.random() * 9) + 1);

      if ($scope.spaces["sp" + num] === "") {
        $scope.spaces["sp" + num] = $scope.comp;
        flag = false;
      }

    } while (flag);

    //$timeout(function(){ $scope.checkForWin("sp"+num, "Computer"); }, 100);	
    $scope.gameOver = $scope.checkForWin("sp" + num);

    if ($scope.gameOver == true) {
      $timeout(function() {
          swal({
            title: "Oh no! The computer won this time!",
            text: "Resetting the board...",
            type: "error",
          });

          $scope.resetBoard();

        }, 200);
    }
  }

  // Once a square is selected, see if the user has completed a row
  $scope.checkForWin = function(space) {
    var isWin = false;

    switch (space) {
      case "sp1":
        if (($scope.spaces["sp1"] === $scope.spaces["sp2"] && $scope.spaces["sp1"] === $scope.spaces["sp3"]) || ($scope.spaces["sp1"] === $scope.spaces["sp4"] && $scope.spaces["sp1"] === $scope.spaces["sp7"]) || ($scope.spaces["sp1"] === $scope.spaces["sp5"] && $scope.spaces["sp1"] === $scope.spaces["sp9"])) {
          //alert(user + " Wins!");
          //$scope.gameOver = true;
          isWin = true;
        }
        break;
      case "sp2":
        if (($scope.spaces["sp1"] === $scope.spaces["sp2"] && $scope.spaces["sp1"] === $scope.spaces["sp3"]) || ($scope.spaces["sp2"] === $scope.spaces["sp5"] && $scope.spaces["sp2"] === $scope.spaces["sp8"])) {
          isWin = true;
        }
        break;
      case "sp3":
        if (($scope.spaces["sp1"] === $scope.spaces["sp2"] && $scope.spaces["sp1"] === $scope.spaces["sp3"]) || ($scope.spaces["sp3"] === $scope.spaces["sp6"] && $scope.spaces["sp3"] === $scope.spaces["sp9"]) || ($scope.spaces["sp3"] === $scope.spaces["sp5"] && $scope.spaces["sp3"] === $scope.spaces["sp7"])) {
          isWin = true;
        }
        break;
      case "sp4":
        if (($scope.spaces["sp4"] === $scope.spaces["sp5"] && $scope.spaces["sp4"] === $scope.spaces["sp6"]) || ($scope.spaces["sp1"] === $scope.spaces["sp4"] && $scope.spaces["sp1"] === $scope.spaces["sp7"])) {
          isWin = true;
        }
        break;
      case "sp5":
        if (($scope.spaces["sp4"] === $scope.spaces["sp5"] && $scope.spaces["sp4"] === $scope.spaces["sp6"]) || ($scope.spaces["sp2"] === $scope.spaces["sp5"] && $scope.spaces["sp2"] === $scope.spaces["sp8"])) {
          isWin = true;
        }
        break;
      case "sp6":
        if (($scope.spaces["sp4"] === $scope.spaces["sp5"] && $scope.spaces["sp4"] === $scope.spaces["sp6"]) || ($scope.spaces["sp3"] === $scope.spaces["sp6"] && $scope.spaces["sp3"] === $scope.spaces["sp9"])) {
          isWin = true;
        }
        break;
      case "sp7":
        if (($scope.spaces["sp7"] === $scope.spaces["sp8"] && $scope.spaces["sp7"] === $scope.spaces["sp9"]) || ($scope.spaces["sp1"] === $scope.spaces["sp4"] && $scope.spaces["sp1"] === $scope.spaces["sp7"]) || ($scope.spaces["sp3"] === $scope.spaces["sp5"] && $scope.spaces["sp3"] === $scope.spaces["sp7"])) {
          isWin = true;
        }
        break;
      case "sp8":
        if (($scope.spaces["sp7"] === $scope.spaces["sp8"] && $scope.spaces["sp7"] === $scope.spaces["sp9"]) || ($scope.spaces["sp2"] === $scope.spaces["sp5"] && $scope.spaces["sp2"] === $scope.spaces["sp8"])) {
          isWin = true;
        }
        break;
      default:
        if (($scope.spaces["sp7"] === $scope.spaces["sp8"] && $scope.spaces["sp7"] === $scope.spaces["sp9"]) || ($scope.spaces["sp3"] === $scope.spaces["sp6"] && $scope.spaces["sp3"] === $scope.spaces["sp9"]) || ($scope.spaces["sp1"] === $scope.spaces["sp5"] && $scope.spaces["sp1"] === $scope.spaces["sp9"])) {
          isWin = true;
        }
    }

    return isWin;

  };

  $scope.checkForDraw = function() {
    if ($scope.spaces.sp1 != "" && $scope.spaces.sp2 != "" && $scope.spaces.sp3 != "" && $scope.spaces.sp4 != "" && $scope.spaces.sp5 != "" && $scope.spaces.sp6 != "" && $scope.spaces.sp7 != "" && $scope.spaces.sp8 != "" && $scope.spaces.sp9 != "")
      return true;
  }

  $scope.resetBoard = function() {

    $timeout(function() {
      $scope.spaces.sp1 = "";
      $scope.spaces.sp2 = "";
      $scope.spaces.sp3 = "";
      $scope.spaces.sp4 = "";
      $scope.spaces.sp5 = "";
      $scope.spaces.sp6 = "";
      $scope.spaces.sp7 = "";
      $scope.spaces.sp8 = "";
      $scope.spaces.sp9 = "";
      $scope.gameOver = false;
    }, 2000);
  }

}]);