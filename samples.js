
const submitButton = document.getElementById('submitButton');

const statusDiv = document.getElementById('status');

wav = new wavefile.WaveFile();

function submit() {

  	var file = document.getElementById('wavFile').files[0];
	processWav(file)

 
}
function error(text) {
  statusDiv.style.color = "red";
  statusDiv.innerText = text;
}
function displayResult(text) {
  if(text.indexOf("Success!") != -1) {	
  	statusDiv.style.color = "green";
  	
  } else {
    statusDiv.style.color = "red";
  }
  statusDiv.innerText = text;
}
function processWav(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
    
     console.log(reader.result);
     wav.fromDataURI(reader.result);
     wav.toSampleRate(8000, {method: "linear", LPF: true});
     samples = wav.getSamples()
     console.log(wav.samples);
		 if(samples.length > 480000) {
			 error("Please limit samples to 1 minute in length or less. (if it's for something really cool ask thurm about it)");
		 }
     if(samples.length == 2) {
       samples = samples[0].map(e => { return (e / 32767.0).toFixed(5) });
     } else {
       samples = samples.map(e => { return (e / 32767.0).toFixed(5) });
     }
     console.log(samples);
     var author = document.getElementById("authorText").value;
     if(author == "") { author = "Unknown" }
     var description = document.getElementById("descText").value;
     if(description == "") { description = "No description given. " }
     jQuery.ajaxSetup({async:false});
		 jQuery.ajax({

        type: "POST",
        url: "upload_sample.php",
        data: {
          sampleName: document.getElementById("sampleName").value,
          sampleData: samples.join(","),
          sampleAuthor: author,
          sampleDescription: description
    	},
    //dataType: "html"

  }).done(function( result ) {
       console.log(result)
  	displayResult(result)
  });
    
   };
   reader.onerror = function (exc) {
       error(exc)
   };
}