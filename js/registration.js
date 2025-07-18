const imageInput = document.getElementById("imagem-input"); // Renamed imagemInput to imageInput
const imagePreviewImg = document.getElementById("imagem-preview-img"); // Renamed imagemPreviewImg to imagePreviewImg
const imageLabel = document.querySelector(".imagem-label"); // Renamed imagemLabel to imageLabel

// Event fires when a file is selected
imageInput.addEventListener("change", function () {
    // Gets the file selected by the user, 0 indicates the first image
    const file = this.files[0];
    // Checks if a file was selected
    if (file) {
        const reader = new FileReader();

        // Function to display the image and hide the label
        reader.onload = function (e) {
            imagePreviewImg.src = e.target.result;
            imagePreviewImg.style.display = "block";
            imageLabel.classList.add("hidden");
        };
        reader.readAsDataURL(file);
        // Hides the image and clears src, removes hidden class from the label
    } else {
        imagePreviewImg.src = "";
        imagePreviewImg.style.display = "none";
        imageLabel.classList.remove("hidden");
    }
});


const addRegistration = document.getElementById("adicionar-cadastro"); // Renamed adcionarCadastro to addRegistration
const myForm = document.getElementById("meuFormulario"); // Renamed meuFormulario to myForm
const myForm2 = document.getElementById("meuFormulario2"); // Renamed meuFormulario2 to myForm2

addRegistration.addEventListener("click", function (event) {
    // Check if form fields are valid
    if (!myForm.checkValidity() || !myForm2.checkValidity()) {
        event.preventDefault();
        alert("Please fill in all fields correctly in both forms."); // Translated alert message
        return;
    }
    // Animal form fields
    const patient = document.getElementById("paciente").value; // Renamed paciente to patient
    const species = document.getElementById("especie").value; // Renamed especie to species
    const gender = document.querySelector('input[name="sexo"]:checked')?.value || "Not informed"; // Translated default value
    const vaccine = document.querySelector('input[name="vacina"]:checked')?.value || "Not informed"; // Translated default value
    const breed = document.getElementById("raca").value; // Renamed raca to breed
    const age = document.getElementById("idade").value; // Renamed idade to age
    const microchip = document.getElementById("microchip").value;
    const size = document.getElementById("porte").value; // Renamed porte to size
    const coat = document.getElementById("pelagem").value; // Renamed pelagem to coat
    const birthDate = document.getElementById("data").value; // Renamed data to birthDate
    const predisposition = document.querySelector('input[name="predisposicao"]:checked')?.value || "Not informed"; // Translated default value
    const disease = document.getElementById("doenca").value; // Renamed doenca to disease
    const care = document.querySelector('input[name="cuidados"]:checked')?.value || "Not informed"; // Renamed cuidados to care, translated default value
    const careDescription = document.getElementById("cuidado").value; // Renamed cuidadoDesc to careDescription

    // Guardian form fields
    const guardianName = document.getElementById("tutor").value; // Renamed tutor to guardianName
    const email = document.getElementById("email").value;
    const phone = document.getElementById("telefone").value; // Renamed telefone to phone
    const address = document.getElementById("endereco").value; // Renamed endereco to address


    // Object with animal data
    const animal = {
        paciente: patient, // Keeping original key names for consistency with data structure
        especie: species,
        sexo: gender,
        vacina: vaccine,
        raca: breed,
        idade: age,
        microchip,
        porte: size,
        pelagem: coat,
        dataNasc: birthDate,
        predisposicao: predisposition,
        doenca: disease,
        cuidados: care,
        cuidadoDesc: careDescription,
        imagem: imagePreviewImg.src,
        dataCadastro: new Date().toLocaleDateString() // Keeping original key name
    };
    // Object with guardian data
    const guardian = {
        tutor: guardianName, // Keeping original key name
        email,
        telefone: phone, // Keeping original key name
        endereco: address // Keeping original key name
    };
    // Combining objects into one
    const registration = { // Renamed cadastro to registration
        animal,
        guardiao: guardian // Keeping original key name
    }


    // Retrieves the list from localStorage and adds the new registration
    let registrationsList = JSON.parse(localStorage.getItem("cadastros")) || []; // Renamed listaCadastros to registrationsList
    registrationsList.push(registration);
    localStorage.setItem("cadastros", JSON.stringify(registrationsList));


    // Redirects to the "cliente.html" page
    window.location.href = "/views/patients.html"; // Updated path and filename

    // Creates the div for the new animal
    const animalDiv = document.createElement("div");
    animalDiv.classList.add("cliente-card");
    animalDiv.innerHTML = `
        <h3>${registration.animal.paciente}</h3>
        <p><strong>Species:</strong> ${registration.animal.especie}</p> <p><strong>Gender:</strong> ${registration.animal.sexo}</p> <p><strong>Vaccine:</strong> ${registration.animal.vacina}</p> <p><strong>Breed:</strong> ${registration.animal.raca}</p> <p><strong>Age:</strong> ${registration.animal.idade} years</p> <p><strong>Microchip:</strong> ${registration.animal.microchip}</p> <p><strong>Size:</strong> ${registration.animal.porte}</p> <p><strong>Coat:</strong> ${registration.animal.pelagem}</p> <p><strong>Date of Birth:</strong> ${registration.animal.dataNasc}</p> <p><strong>Disease Predisposition:</strong> ${registration.animal.predisposicao} ${registration.animal.predisposicao === "sim" ? ` - ${registration.animal.doenca}` : ""}</p> <p><strong>Special Care:</strong> ${registration.animal.cuidados} ${registration.animal.cuidados === "sim" ? ` - ${registration.animal.cuidadoDesc}` : ""}</p> <h3>${registration.guardiao.tutor}</h3>
        <p><strong>Email:</strong> ${registration.guardiao.email}</p> <p><strong>Phone:</strong> ${registration.guardiao.telefone}</p> <p><strong>Address:</strong> ${registration.guardiao.endereco}</p> `;

    // Adds the new animal's div to the list on the "cliente.html" page
    // This part of the code will likely not execute as the page redirects.
    // The "client.js" script on "patients.html" will handle rendering the list.
    // document.getElementById("lista-cliente").appendChild(animalDiv);
});


// Behavior to make the textarea appear or disappear
function configureConditionalField(field) { // Renamed configurarCampoCondicional to configureConditionalField, campo to field
    const radioYes = field.querySelector('[value="sim"]'); // Renamed radioSim to radioYes
    const textarea = field.querySelector('.textarea-condicional');

    function updateTextareaVisibility() { // Renamed atualizarVisibilidadeTextarea to updateTextareaVisibility
        if (radioYes.checked) {
            textarea.style.display = 'block';
        } else {
            textarea.style.display = 'none';
        }
    }

    radioYes.addEventListener('change', updateTextareaVisibility);
    field.querySelector('[value="nao"]').addEventListener('change', updateTextareaVisibility);
    field.querySelector('[value="desconhecido"]').addEventListener('change', updateTextareaVisibility);

    updateTextareaVisibility(); // Initializes visibility
}


// Applies the configuration to the fields
configureConditionalField(document.querySelector('.campo.predisposicao'));
configureConditionalField(document.querySelector('.campo.cuidados'));


document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input");
    const selects = document.querySelectorAll(".select");

    inputs.forEach(input => {
        input.addEventListener("change", function () {
            validateInput(input); // Renamed validarInput to validateInput
        });
    });

    selects.forEach(select => {
        select.addEventListener("change", function () {
            validateSelect(select); // Renamed validarSelect to validateSelect
        });
    });

    // Using regex for most fields for validation, regex I don't know how to use :)
    function validateInput(input) { // Renamed validarInput to validateInput
        if (input.id === "paciente") { // Patient
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "microchip") {
            /^\d{15}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "data") { // Date of birth
            validateDate(input); // Renamed validarData to validateDate
        } else if (input.id === "idade") { // Age
            validateAge(input); // Renamed validarIdade to validateAge
        } else if (input.id === "raca") { // Breed
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "pelagem") { // Coat
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "tutor") { // Guardian name
            /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "email") {
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "telefone") { // Phone
            /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        } else if (input.id === "endereco") { // Address
            /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{5,}$/.test(input.value.trim()) ? input.classList.add("correct") : input.classList.add("error");
        }
    }

    function validateDate(input) { // Renamed validarData to validateDate
        const selectedDate = new Date(input.value); // Renamed dataSelecionada to selectedDate
        const currentDate = new Date(); // Renamed dataAtual to currentDate

        if (isNaN(selectedDate.getTime())) {
            input.classList.add("error");
            input.classList.remove("correct");
            return;
        }

        const year = selectedDate.getFullYear(); // Renamed ano to year

        if (year < 1900 || year > currentDate.getFullYear() || selectedDate > currentDate) {
            input.classList.add("error");
            input.classList.remove("correct");
        } else {
            input.classList.add("correct");
            input.classList.remove("error");
        }
    }

    function validateSelect(select) { // Renamed validarSelect to validateSelect
        if (select.value) {
            select.classList.add("selected");
        } else {
            select.classList.remove("selected");
        }
    }


    function validateAge(input) { // Renamed validarIdade to validateAge
        const value = input.value.trim(); // Renamed valor to value
        const age = parseInt(value, 10); // Renamed idade to age

        if (!isNaN(age) && age >= 0 && age <= 100) {
            input.classList.add("correct");
            input.classList.remove("error");
        } else {
            input.classList.add("error");
            input.classList.remove("correct");
        }
    }
});