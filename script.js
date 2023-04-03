var pdfButton = document.getElementById("file");
pdfButton.addEventListener("click", function(){
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.addEventListener("change", function(event) {
		var file = event.target.files[0];
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = async function(event) {
			var pdfBytes = new Uint8Array(event.target.result);
			var pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
			var wordBytes = await pdfDoc.saveAsBase64({ dataUri: true });
			var wordDataUri = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + wordBytes.split(",")[1];
			var downloadLink = document.createElement("a");
			downloadLink.href = wordDataUri;
            name=fileInput.files[0].name.slice(0,fileInput.files[0].name.indexOf('.pdf'))
			downloadLink.download = name+".docx";
			downloadLink.click();
		};
	});
        fileInput.click();
});