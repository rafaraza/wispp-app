angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  // Callback do Firebase para o login
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // ...
    }
    // Isto salva os dados do usuário na variavel
    // de manipulacao.
    $scope.teta = result;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  var provider = new firebase.auth.FacebookAuthProvider();
  //
  //    LOGOUT  :(
  // 
  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      console.log("Logout OK!");
      $scope.teta = null;
      // The signed-in user info.
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.error("Erro no Logout:", error.message);
      // ...
    });
  }
  //
  //    LOGIN :)
  // 
  $scope.login = function() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("Login OK!");
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      $scope.teta = result;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.error("Erro no Logout:", error.message);
      // ...
    });

  //   Auth.$authWithOAuthRedirect("facebook").then(function(result) {
  // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     console.log(result);
  //     // ...
  //   }).catch(function(error) {
  //     console.log(error);
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
    // Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
    //   // User successfully logged in
    //   console.log("sim");
    // }).catch(function(error) {
    //   if (error.code === "TRANSPORT_UNAVAILABLE") {
    //     Auth.$authWithOAuthPopup("facebook").then(function(authData) {
    //       console.log("nao");
    //       // User successfully logged in. We can log to the console
    //       // since we’re using a popup here
    //       console.log(authData);
    //     });
    //   } else {
    //     console.log("nao 2");
    //     // Another error occurred
    //     console.log(error);
    //   }
    // });
  };
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
