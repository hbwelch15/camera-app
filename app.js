// JavaScript Document

//Set constraints for the video stream
var constraints = { video: {facingMode: "environment" }, 
				  audio: false};

//Define constants
const cameraView = 
	  document.querySelector("#camera--view"),
	  cameraOutput = 
	  document.querySelector("#camera--output"),
	  cameraSensor = 
	  document.querySelector("#camera--sensor"),
	  cameraTrigger = 
	  document.querySelector("#camera--trigger");

//Access the device camera and stream to cameraView
function cameraStart() {
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(function(stream) {
		track = stream.getTracks()
		[0];
		
		cameraView.srcObject = stream;
	})
	.catch(function(error) {
		console.error("Oops. Something is broken.", error);
	});
}

cameraTrigger.onclick = function()
{
	cameraSensor.width = 
		cameraView.videoWidth;
	
	cameraSensor.height = 
		cameraView.videoHeight;
	
	cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
		cameraOutput.src = 
			cameraSensor.toDataURL("image/webp");
	
	cameraOutput.classList.add("taken");
	
	var dataURL = cameraOutput;
		$.ajax({ 
		type: "POST", 
		url: "script.php", 
		data: {  
			imgBase64: dataURL 
		} 
	}).done(function(o) { 
		console.log('saved');  
	}); 
	
};

window.addEventListener("load", cameraStart, false);