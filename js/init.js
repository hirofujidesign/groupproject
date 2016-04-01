(function($) {
    $(function() {

        $('.button-collapse').sideNav();
        $('.parallax').parallax();

    }); // end of document ready
})(jQuery); // end of jQuery name space

// $(document).ready(function () {
//     $(window).on('load scroll', function () {
//         var scrolled = $("#video").scrollTop();
//         $('#video').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
//     });

// var myApp = angular.module('myApp', []);
// myApp.controller('mainCtrl', function ($scope, $http){

//   $http.get('http://api.randomuser.me/?results=24').success(function(data) {
//     $scope.users = data.results;
//   }).error(function(data, status) {
//     alert('get data error!');
//   });

//   $scope.removeUser = function(user){
//      $scope.users.splice($scope.users.indexOf(user),1);
//   };

//   $scope.modalDetails = function(user){
//      $scope.user = user;
//      $('#modalDetails').openModal();
//   };

// });

var ref = new Firebase("https://jlipschitzfire.firebaseio.com/");
var displayUserName = "";
var displayUserUrl = "";


function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        testAPI();
    } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '{1755674047996992}',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

function createCard() {
    //on firebase something like ref.on('next')
    var db = {
        "card": [{
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle"
        }, {
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle",
        }, {
            "user": "username",
            "image-url": "http://materializecss.com/images/sample-1.jpg",
            "card_title": "Card Title",
            "card_subtitle": "Card Subtitle",
        }]
    };

    $.each(db.card, function(key, data) {
        console.log(data);
        $('.insertCards').append('<div class="content col s10" >' + '<div class="card"><div class="card-image"><img src="' + data['image-url'] + '"></div>' + '<div class="card-content" id="userProfile">' + '<span class="card-title grey-text text-darken-4">' + data.card_title + '</span>' + '<p class="card-subtitle grey-text text-darken-2">' + data.card_subtitle + '</p>' + '<button>">View More</button>' + '</div></div></div>');
    });

}

function clearForm() {
    $("#email").val("")
    $("#describeItem")[0].value;
    $("#pictureUrl").val("");
    // picUrl clear
}

function grabFormInput() {
    //get user form input
    var getFormInput = {
        userName: displayUserName,
        userPicture: displayUserUrl,
        category: $("#selectCategory option:selected").text(),
        email: $("#email").val(),
        itemDescr: $("#describeItem")[0].value,
        picUrl: $("#pictureUrl").val(),

    }
        console.log(getFormInput.username)
        console.log(getFormInput.userPicture)
        console.log(getFormInput.category)
        console.log(getFormInput.email)
        console.log(getFormInput.itemDescr)
        console.log(getFormInput.picUrl)
        ref.push(getFormInput)
        thankYou.showModal();
        clearForm();
        console.log("push worked inside grabFormInput")
        giveModal.hideModal();
    
};

ref.on("child_added", function(childSnapshot, prevChildKey) {
    //run DisplayPosts

});

var thankYou = {
    showModal: function() {
        $('#thanksModal').openModal();
    },
    hideModal: function() {
        $('#thanksModal').closeModal();
    }
};
var giveModal = {
    showModal: function() {
        $('#giveModal').openModal();
    },
    hideModal: function() {
        $('#giveModal').closeModal();
    }
};
$(document).ready(function() {

    $('#textarea1').val('New Text');
    $('#textarea1').trigger('autoresize');
    $('select').material_select();
    /*upload image js handler
    $('.dropify').dropify({
        messages: {
            'default': '',
            'replace': 'Drag and drop or click to replace',
            'remove': 'Remove',
            'error': 'Ooops, something wrong appended.'
        }
    });
    */
    //modal popup js handler
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
    });

    //modal event listeners
    $('#giveButton').on('click', function() {
        giveModal.showModal();
    });
    $('#giveButtonClose').on('click', function() {
        grabFormInput();
        thankYou.showModal();
        return false;
    });
});


$(document).on('click', "#login", function() {
    ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            // the access token will allow us to make Open Graph API calls
            console.log(authData.facebook.accessToken);
        }
    }, {
        scope: "email,user_likes" // the permissions requested
    });
})

function signinCallback(resp) {
    gapi.client.load('plus', 'v1', function() {
        gapi.client.plus.people.get({
            userId: 'me'
        }).execute(getProfileInfo);
    });
}

function getProfileInfo(person) {
    // var url = "http://profiles.google.com/s2/photos/profile/" + userid + "?sz=" + size";
    console.log(person.displayName);
    console.log(person.image.url);
    displayUserName = person.displayName;
    console.log(displayUserName)
    displayUserUrl = person.image.url;

}
