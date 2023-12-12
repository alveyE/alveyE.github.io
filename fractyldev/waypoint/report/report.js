// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBr5n-Ex_B6KYh7GpfRjoTp48bm-7ulAvg",
  authDomain: "waypoint-62326.firebaseapp.com",
  databaseURL: "https://waypoint-62326.firebaseio.com/",
  projectId: "waypoint-62326",
  storageBucket: "waypoint-62326.appspot.com",
  messagingSenderId: "50441512367",
  appId: "1:50441512367:web:b806ca7b7c94ebf2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Functions for Refresh
var refreshReports = function() {
	removeCards();
	var ReportsRef = firebase.database().ref('/reported/');
	return ReportsRef.once('value').then(function(snapshot) {
	  snapshot.forEach(function(note) {
	  	// UNCOMMENT THIS CODE BEFORE REPORT GOES LIVE
	  	// var locRef = firebase.database().ref('/locations/' + note.key);
	  	// locRef.once('value').then(function(notes) {
	  	// 	if(notes.val() !== null) {
	  			var NoteRef = firebase.database().ref('/notes/' + note.key);
			  	NoteRef.once('value').then(function(snapshot) {
			  		if(snapshot.val() !== null) {
			  			var widgetName = ["text", "drawing", "image", "link"];
			  			var widgetPos = [0, 0, 0,0];
			  			var noteContent = '';
			  			var contentOrder = snapshot.val().widgets;
			  			contentOrder.forEach(function(widget) {
			  				switch(widget) {
			  					case widgetName[0]:
			  						var textContent = snapshot.val().text[widgetPos[0]];
			  						noteContent = noteContent + '<div class = "note-content primary"><p class = "text-small">' + textContent + '</p></div>';
			  						widgetPos[0] ++;
			  						break;
			  					case widgetName[1]:
			  						var drawingURL = snapshot.val().drawings[widgetPos[1]];
			  						noteContent = noteContent + '<div class = "note-content image primary"><a href = "' + drawingURL + '" target = "_blank"><img style = "width: 100%; height: auto;" src = "' + drawingURL +'"></div>';
			  						widgetPos[1] ++;
			  						break;
			  					case widgetName[2]:
			  						var imageURL = snapshot.val().images[widgetPos[2]].url;
			  						noteContent = noteContent + '<div class = "note-content image primary"><a href = "' + imageURL + '" target = "_blank"><img style = "width: 100%; height: auto;" src = "' + imageURL +'"></a></div>';
			  						widgetPos[2] ++;
			  						break;
			  					case widgetName[3]:
			  						var linkContent = snapshot.val().links[widgetPos[3]];
			  						noteContent = noteContent + '<div class = "note-content primary"><a class = "text-small" href = "' + linkContent + '">' + linkContent + '</p></div>';
			  						widgetPos[3] ++;
			  						break;
			  					default:
			  						break;
			  				}
			  			});
			  			var t = snapshot.val().timeStamp;
			  			var time = new Date(t.substring(0, 4), t.substring(4, 6), t.substring(6, 8), t.substring(8, 10), t.substring(10,12), t.substring(12,14), 0).toLocaleDateString('en-US', { dateStyle: 'long', timeStyle:'short' });
			  			$('.cardContainer').append('<div class = "card third m-full left" id = ' + snapshot.key + '"><div class = "header"><h5>' + snapshot.val().title + '</h5><p class = "text-small">Posted By ' + snapshot.val().creator + '<br><em style = "font-size: 12px">' + time + '</em></p></div><div class = "content">' + noteContent + '<div class = "note-options columns"><a data-note = "' + snapshot.key + '" class = "button small column accent dismiss">Dismiss</a><a data-note = "' + snapshot.key + '" class = "delete button small column text-bold" style = "background-color: red; color: white;">Delete</a></div></div></div>');
			  		}
			  	});
	  	// 	}
	  	// });
	  });
	});
};
var removeCards = function() {
	$('.cardContainer').empty();
}

//Authentication and Login
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser) {
		var id = firebaseUser.uid;
		var userRef = firebase.database().ref('/users/' + id);
		userRef.once('value').then(function(snapshot) {
			if(snapshot.val() != null) {
				if(snapshot.val().admin) {
					return;
				} else {
					firebase.auth().signOut();
				}
			}
		})
	} else {
		window.location.href = "login.html";
	}
});

//Actual Code
$(document).ready(refreshReports());
$(document).on('click', '.dismiss', function(){ 
  var note = $(this).attr("data-note");
  console.log(note);
  console.log("Dismiss Clicked");
  var noteRef = firebase.database().ref('/reported/'+ note);
  noteRef.remove();
  refreshReports();
}); 
$(document).on('click', '.delete', function(){ 
  var note = $(this).attr("data-note");
  console.log(note);
  console.log("Delete Clicked");
  var noteRef = firebase.database().ref('/reported/'+ note);
  noteRef.remove();
  var locRef = firebase.database().ref('/locations/' + note);
  locRef.remove();
  var noteContent = firebase.database().ref('/notes/' + note);
  var newNoteContent = firebase.database().ref('/removed/' + note);
  noteContent.once('value').then(function(snapshot) {
  	noteContent.remove();
  	newNoteContent.set(snapshot.val());
  });
  refreshReports();
}); 
function logOut() {
	firebase.auth().signOut();
}