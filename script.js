var pdfButton = document.getElementById("file"); // Button to upload pdf file
pdfButton.addEventListener("click", function(){ // On click of button
    var fileInput = document.createElement("input"); // Create input element
    fileInput.type = "file"; // Set type to file
    fileInput.accept = ".pdf";// Set accept to pdf
    fileInput.addEventListener("change", function(event) {// On change of file input
		var file = event.target.files[0];// Get file
		var reader = new FileReader();// Create file reader
		reader.readAsArrayBuffer(file);// Read file as array buffer
		reader.onload = async function(event) {// On load of file
			var pdfBytes = new Uint8Array(event.target.result);// Get pdf bytes
			var pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);// Load pdf
			var wordBytes = await pdfDoc.saveAsBase64({ dataUri: true });// Convert pdf to word
			/* Get word data uri */
			var wordDataUri = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + wordBytes.split(",")[1];
			var downloadLink = document.createElement("a");// Create download link
			downloadLink.href = wordDataUri;// Set href to word data uri
            name=fileInput.files[0].name.slice(0,fileInput.files[0].name.indexOf('.pdf'))// Get name of file
			downloadLink.download = name+".docx";// Set download attribute to name of file
			downloadLink.click();// Click download link
		};
	});
    fileInput.click();// Click file input
});