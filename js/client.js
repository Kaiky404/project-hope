document.addEventListener("DOMContentLoaded", function () {
    const clientList = document.getElementById("lista-cliente"); // Renamed listaCliente to clientList
    const registrations = JSON.parse(localStorage.getItem("cadastros")) || []; // Renamed listaCadastros to registrations

    registrations.forEach((registration, index) => { // Renamed cadastro to registration
        const div = document.createElement("div");
        div.classList.add("cliente-card"); // Keeping "cliente-card" as it might be a CSS class
        div.dataset.index = index; // Adds the animal index as a data attribute
        div.innerHTML = `
            <img src="${registration.animal.imagem}" alt="Animal image"> <h3 class="animal-nome">${registration.animal.paciente}</h3>
            <h5 class="tutor-nome">${registration.guardiao.tutor}<h5>
            <p><strong class="data-cadastro">Registration Date:</strong> ${registration.animal.dataCadastro}</p> <button class="remover-animal">Remove</button> `;
        clientList.appendChild(div);

        // Adds the click event to display animal details
        div.addEventListener("click", function () {
            displayAnimalDetails(registration, index); // Renamed exibirDetalhesAnimal to displayAnimalDetails
        });

        // Adds the click event to remove the animal
        div.querySelector(".remover-animal").addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents the card click event from firing
            removeAnimal(index); // Renamed removerAnimal to removeAnimal
        });
    });
});

function removeAnimal(index) { // Renamed removerAnimal to removeAnimal
    try {
        let registrations = JSON.parse(localStorage.getItem("cadastros")) || []; // Renamed listaCadastros to registrations
        registrations.splice(index, 1);
        localStorage.setItem("cadastros", JSON.stringify(registrations));

        const animalCard = document.querySelectorAll(".cliente-card")[index];
        if (animalCard) { // Added a check to ensure the card exists before trying to remove it
            animalCard.parentElement.removeChild(animalCard);
        }
        // Reload the animal list here to update indices, if necessary
        // For a more robust solution, you might want to re-render the entire list or update data-index attributes.
    } catch (error) {
        console.error("Error removing animal:", error); // Translated error message
        alert("An error occurred while removing the animal."); // Translated alert message
    }
}

function displayAnimalDetails(registration, index) { // Renamed exibirDetalhesAnimal to displayAnimalDetails, cadastro to registration
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>

            <h2 class="title-modal">Animal</h2> <div class="row">
                <p><strong class="label-modal">Patient:</strong><input type="text" id="modal-name" value="${registration.animal.paciente}" /></p> <p><strong class="label-modal">Species:</strong> <input type="text" id="modal-species" value="${registration.animal.especie}" /></p> <p><strong class="label-modal">Gender:</strong> <input type="text" id="modal-gender" value="${registration.animal.sexo}" /></p> <p><strong class="label-modal">Vaccine:</strong> <input type="text" id="modal-vac" value="${registration.animal.vacina}" /></p> <p><strong class="label-modal">Breed:</strong> <input type="text" id="modal-breed" value="${registration.animal.raca}" /></p> </div>
            <div class="row">
                <p><strong class="label-modal">Age:</strong> <input type="number" id="modal-age" value="${registration.animal.idade}" /></p> <p><strong class="label-modal">Microchip:</strong> <input type="text" id="modal-microchip" value="${registration.animal.microchip}" /></p> <p><strong class="label-modal">Size:</strong> <input type="text" id="modal-size" value="${registration.animal.porte}" /></p> <p><strong class="label-modal">Coat:</strong> <input type="text" id="modal-fur" value="${registration.animal.pelagem}" /></p> <p><strong class="label-modal">Date of Birth:</strong> <input type="date" id="modal-birthDate" value="${registration.animal.dataNasc}" /></p> </div>
            <div class="row">
                <p class="descDiv"><strong class="label-modal">Disease Predisposition:</strong> 
                    <select id="modal-diseasePredisposition">
                        <option value="yes" ${registration.animal.predisposicao === "sim" ? "selected" : ""}>Yes</option> <option value="no" ${registration.animal.predisposicao === "não" ? "selected" : ""}>No</option> </select>
                    <p><strong class="label-modal">Disease Description:</strong> <textarea id="modal-diseaseDescription">${registration.animal.doenca}</textarea></p> </p>

                <p class="descDiv"><strong class="label-modal">Special Care:</strong> 
                    <select id="modal-specialCare">
                        <option value="yes" ${registration.animal.cuidados === "sim" ? "selected" : ""}>Yes</option> <option value="no" ${registration.animal.cuidados === "não" ? "selected" : ""}>No</option> </select>
                    <p><strong class="label-modal">Care Description:</strong> <textarea id="modal-careDescription">${registration.animal.cuidadoDesc}</textarea></p> </p>
            </div>

            <h2 class="title-modal">Guardian</h2> <div class="row">
                <p><strong class="label-modal">Name:</strong><input type="text" id="modal-tutor" value="${registration.guardiao.tutor}" /></p> <p><strong class="label-modal">Email:</strong><input type="text" id="modal-email" value="${registration.guardiao.email}" /></p> <p><strong class="label-modal">Phone:</strong><input type="text" id="modal-telefone" value="${registration.guardiao.telefone}" /></p> <p><strong class="label-modal">Address:</strong><input type="text" id="modal-endereco" value="${registration.guardiao.endereco}" /></p> </div>

            <button id="saveChanges">Save Changes</button> </div>
    `;

    const closeButton = modal.querySelector(".close");
    closeButton.addEventListener("click", () => modal.remove());

    document.body.appendChild(modal);

    // function to save changes
    document.getElementById("saveChanges").addEventListener("click", () => {
        // animal
        registration.animal.paciente = document.getElementById("modal-name").value;
        registration.animal.especie = document.getElementById("modal-species").value;
        registration.animal.sexo = document.getElementById("modal-gender").value;
        registration.animal.vacina = document.getElementById("modal-vac").value;
        registration.animal.raca = document.getElementById("modal-breed").value;
        registration.animal.idade = document.getElementById("modal-age").value;
        registration.animal.microchip = document.getElementById("modal-microchip").value;
        registration.animal.porte = document.getElementById("modal-size").value;
        registration.animal.pelagem = document.getElementById("modal-fur").value;
        registration.animal.dataNasc = document.getElementById("modal-birthDate").value;
        registration.animal.predisposicao = document.getElementById("modal-diseasePredisposition").value;
        registration.animal.cuidados = document.getElementById("modal-specialCare").value;
        // guardian
        registration.guardiao.tutor = document.getElementById("modal-tutor").value;
        registration.guardiao.email = document.getElementById("modal-email").value;
        registration.guardiao.telefone = document.getElementById("modal-telefone").value;
        registration.guardiao.endereco = document.getElementById("modal-endereco").value;

        // Now save descriptions as well
        registration.animal.doenca = document.getElementById("modal-diseaseDescription") ? document.getElementById("modal-diseaseDescription").value : registration.animal.doenca;
        registration.animal.cuidadoDesc = document.getElementById("modal-careDescription") ? document.getElementById("modal-careDescription").value : registration.animal.cuidadoDesc;

        const animalList = JSON.parse(localStorage.getItem("cadastros")) || [];
        animalList[index] = registration;
        localStorage.setItem("cadastros", JSON.stringify(animalList));

        document.querySelectorAll(".cliente-card")[index].querySelector(".animal-nome").textContent = registration.animal.paciente;
        alert("Data updated successfully!"); // Translated alert message
        modal.remove();
    });
}