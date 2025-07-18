document.addEventListener("DOMContentLoaded", function () {
    const clientList = document.getElementById("lista-cliente"); // Renamed listaCliente to clientList
    const registrations = JSON.parse(localStorage.getItem("cadastros")) || []; // Renamed listaCadastros to registrations

    registrations.forEach((registration, index) => { // Renamed cadastro to registration
        const div = document.createElement("div");
        div.classList.add("cliente-card"); // Keeping "cliente-card" as it might be a CSS class
        div.dataset.index = index;

        div.innerHTML = `
            <h3 class="title-modal-main">Consultation of ${registration.animal.paciente}</h3> <div class="naoModificavel">
                <h2 class="title-modal">Basic Animal Information</h2> <div class="row">
                    <p id="modal-name"><strong class="label-modal">Patient:</strong>${registration.animal.paciente}</p> <p id="modal-species"><strong class="label-modal">Species:</strong>${registration.animal.especie}</p> <p id="modal-breed"><strong class="label-modal">Breed:</strong>${registration.animal.raca}</p> <p id="modal-gender"><strong class="label-modal">Gender:</strong>${registration.animal.sexo}</p> <p id="modal-vac"><strong class="label-modal">Vaccine:</strong>${registration.animal.vacina}</p> </div>
                <h2 class="title-modal">Basic Guardian Information</h2> <div class="row">
                    <p id="modal-tutor"><strong class="label-modal">Name:</strong>${registration.guardiao.tutor}</p> <p id="modal-endereco"><strong class="label-modal">Address:</strong>${registration.guardiao.endereco}</p> <p id="modal-telefone"><strong class="label-modal">Phone:</strong>${registration.guardiao.telefone}</p> </div>
            </div>
            <h2 class="title-modal">About the Consultation</h2> <div class="row">
                <p><strong class="label-modal">Date:</strong><input type="date" id="modal-data" value="${JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`))?.data || ''}" /></p> <p><strong class="label-modal">Time:</strong><input type="time" id="modal-horario" value="${JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`))?.horario || ''}" /></p> <p><strong class="label-modal">Consultation Type:</strong><input type="textarea" id="modal-tipoConsulta" value="${JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`))?.tipoConsulta || ''}" /></p> </div>
            <h2 class="title-modal">Professional</h2> <div class="row">
                <p><strong class="label-modal">Professional Name:</strong><input type="text" id="modal-nomeProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`))?.nomeProfissional || ''}" /></p> <p><strong class="label-modal">Professional Registration (crmv):</strong><input type="text" id="modal-raProfissional" value="${JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`))?.raProfissional || ''}" /></p> </div>

            <div class="buttons">
                <button class="saveProntuario" data-index="${index}">Save Consultation</button> <button class="imprimir-pdf" data-index="${index}">Print Consultation PDF</button> </div>
        `;

        clientList.appendChild(div);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("saveProntuario")) {
            const index = event.target.dataset.index;
            saveMedicalRecord(index); // Renamed salvarProntuario to saveMedicalRecord
        }
        if (event.target.classList.contains("imprimir-pdf")) {
            const index = event.target.dataset.index;
            printPdf(index); // Renamed imprimirPdf to printPdf
        }
    });

    function saveMedicalRecord(index) { // Renamed salvarProntuario to saveMedicalRecord
        const registration = registrations[index]; // Renamed cadastro to registration
        const medicalRecord = { // Renamed prontuario to medicalRecord
            data: document.getElementById("modal-data").value,
            horario: document.getElementById("modal-horario").value,
            tipoConsulta: document.getElementById("modal-tipoConsulta").value,
            nomeProfissional: document.getElementById("modal-nomeProfissional").value,
            raProfissional: document.getElementById("modal-raProfissional").value
        };
        localStorage.setItem(`prontuario-${registration.animal.paciente}`, JSON.stringify(medicalRecord));
        alert("Consultation saved successfully!"); // Added translated alert
    }

    function printPdf(index) { // Renamed imprimirPdf to printPdf
        const registration = registrations[index]; // Renamed cadastro to registration
        const medicalRecord = JSON.parse(localStorage.getItem(`prontuario-${registration.animal.paciente}`)) || {}; // Renamed prontuario to medicalRecord
        const dataForPdf = { // Renamed dadosParaPdf to dataForPdf
            animal: registration.animal,
            guardiao: registration.guardiao,
            prontuario: medicalRecord // Keeping 'prontuario' key for consistency with the medicalRecord object
        };

        // Using jsPDF to generate the PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let y = 20;

        doc.text(`Consultation of ${dataForPdf.animal.paciente}`, 20, y); // Translated text
        y += 10;

        doc.text("Basic Animal Information", 20, y); // Translated text
        y += 10;
        doc.text(`Patient: ${dataForPdf.animal.paciente}`, 20, y); // Translated text
        y += 10;
        doc.text(`Species: ${dataForPdf.animal.especie}`, 20, y); // Translated text
        y += 10;
        doc.text(`Breed: ${dataForPdf.animal.raca}`, 20, y); // Translated text
        y += 10;
        doc.text(`Gender: ${dataForPdf.animal.sexo}`, 20, y); // Translated text
        y += 10;
        doc.text(`Size: ${dataForPdf.animal.porte}`, 20, y); // Translated text
        y += 20;

        doc.text("Basic Guardian Information", 20, y); // Translated text
        y += 10;
        doc.text(`Name: ${dataForPdf.guardiao.tutor}`, 20, y); // Translated text
        y += 10;
        doc.text(`Address: ${dataForPdf.guardiao.endereco}`, 20, y); // Translated text
        y += 10;
        doc.text(`Phone: ${dataForPdf.guardiao.telefone}`, 20, y); // Translated text
        y += 20;

        doc.text("About the Consultation", 20, y); // Translated text
        y += 10;
        doc.text(`Date: ${dataForPdf.prontuario.data}`, 20, y); // Translated text
        y += 10;
        doc.text(`Time: ${dataForPdf.prontuario.horario}`, 20, y); // Translated text
        y += 10;
        doc.text(`Consultation Type: ${dataForPdf.prontuario.tipoConsulta}`, 20, y); // Translated text
        y += 20;

        doc.text("Professional", 20, y); // Translated text
        y += 10;
        doc.text(`Professional Name: ${dataForPdf.prontuario.nomeProfissional}`, 20, y); // Translated text
        y += 10;
        doc.text(`Professional Registration (crmv): ${dataForPdf.prontuario.raProfissional}`, 20, y); // Translated text

        doc.save(`medical-record-${dataForPdf.animal.paciente}.pdf`); // Translated filename
        alert("PDF generated successfully!"); // Added translated alert
    }
});