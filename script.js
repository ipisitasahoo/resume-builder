function addNewTSField() {
    // Create a new textarea element with appropriate attributes
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "tsField", "mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    // Get references to the parent container and the 'Add' button
    let tsOb = document.getElementById("ts");
    let tsbuttonOb = document.getElementById("tsbutton");

    // Insert the new textarea field before the 'Add' button
    tsOb.insertBefore(newNode, tsbuttonOb); // Correct position to insert
}

function addNewPField() {
    // Create a new textarea element with appropriate attributes
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "pField", "mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    // Get references to the parent container and the 'Add' button
    let pOb = document.getElementById("p");
    let pbuttonOb = document.getElementById("pbutton");

    // Insert the new textarea field before the 'Add' button
    pOb.insertBefore(newNode, pbuttonOb); // Correct position to insert
}

function addNewWEField() {
    // Create a new textarea element with appropriate attributes
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "weField", "mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    // Get references to the parent container and the 'Add' button
    let weOb = document.getElementById("we");
    let webuttonOb = document.getElementById("webutton");

    // Insert the new textarea field before the 'Add' button
    weOb.insertBefore(newNode, webuttonOb); // Correct position to insert
}

function addNewAQField() {
    // Create a new textarea element with appropriate attributes
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control", "aqField", "mt-2");
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    // Get references to the parent container and the 'Add' button
    let aqOb = document.getElementById("aq");
    let aqbuttonOb = document.getElementById("aqbutton");

    // Insert the new textarea field before the 'Add' button
    aqOb.insertBefore(newNode, aqbuttonOb); // Correct position to insert
}

function generateCV() {
    //image upload
    const photoInput = document.getElementById("photoField");
    const userPhotoElement = document.getElementById("userPhoto");

    function generateAndDownloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const cvElement = document.getElementById("cv-template");

        // Wait until image is fully loaded before capturing content
        html2canvas(cvElement).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");

            const imgWidth = 210; // A4 paper width in mm
            const pageHeight = 297; // A4 paper height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            if (imgHeight > pageHeight) {
                let position = imgHeight;
                while (position > 0) {
                    doc.addPage();
                    position -= pageHeight;
                    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                }
            }

            doc.save("Resume.pdf");
        }).catch((error) => {
            console.error("Error generating PDF:", error);
        });
    }

    if (photoInput.files.length > 0) {
        const file = photoInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const imageDataUrl = e.target.result;
            userPhotoElement.src = imageDataUrl; // Set the image source
            generateAndDownloadPDF(); // Trigger PDF generation with the image
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        generateAndDownloadPDF(); // No photo uploaded, just generate the PDF
    }


    // Populate the CV template with the form data
    const nameField = document.getElementById("nameField").value;
    document.getElementById("nameT").innerHTML = nameField;

    document.getElementById("pnoT").innerHTML = document.getElementById("contactField").value;
    document.getElementById("addT").innerHTML = document.getElementById("addressField").value;

    document.getElementById("linkedT").innerHTML = document.getElementById("linkedinField").value;
    document.getElementById("fbT").innerHTML = document.getElementById("fbField").value;
    document.getElementById("igT").innerHTML = document.getElementById("igField").value;

    const tsFields = document.getElementsByClassName("tsField");
    const pFields = document.getElementsByClassName("pField");
    const weFields = document.getElementsByClassName("weField");
    const aqFields = document.getElementsByClassName("aqField");

    document.getElementById("tsT").innerHTML = Array.from(tsFields)
        .map(ts => `<li>${ts.value}</li>`)
        .join("");

    document.getElementById("pT").innerHTML = Array.from(pFields)
        .map(p => `<li>${p.value}</li>`)
        .join("");

    document.getElementById("weT").innerHTML = Array.from(weFields)
        .map(we => `<li>${we.value}</li>`)
        .join("");

    document.getElementById("aqT").innerHTML = Array.from(aqFields)
        .map(aq => `<li>${aq.value}</li>`)
        .join("");

    // Switch to the CV template view
    document.getElementById("cv-form").style.display = "none";
    document.getElementById("cv-template").style.display = "block";

    // Hide the form and show the CV template
    document.getElementById("cv-form").style.display = "none";
    document.getElementById("cv-template").style.display = "block";
}
