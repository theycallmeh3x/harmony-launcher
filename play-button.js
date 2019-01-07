// Check for the various File API support.
console.log("play button JS loaded.")
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    console.log("All File APIs are supported.")
  } else {
    alert('The File APIs are not fully supported in this browser.');
    console.log("One or more File APIs not supported.")
  }