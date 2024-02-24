document.addEventListener("DOMContentLoaded", function() {
    const formName = document.getElementById("search-form-name");
    const resultsDivName = document.getElementById("results-name");

    formName.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchInput = document.getElementById("search-input-name").value;
        fetch(`http://localhost:8080/api/productos/nombre/${searchInput}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data, resultsDivName);
            })
            .catch(error => console.error('Error al buscar producto:', error));
    });

    const formEan = document.getElementById("search-form-ean");
    const resultsDivEan = document.getElementById("results-ean");

    formEan.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchInput = document.getElementById("search-input-ean").value;
        fetch(`http://localhost:8080/api/productos/ean/${searchInput}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data, resultsDivEan);
            })
            .catch(error => console.error('Error al buscar producto:', error));
    });

    const formId = document.getElementById("search-form-id");
    const resultsDivId = document.getElementById("results-id");

    formId.addEventListener("submit", function(event) {
        event.preventDefault();
        const searchInput = document.getElementById("search-input-id").value;
        fetch(`http://localhost:8080/api/productos/${searchInput}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data, resultsDivId);
            })
            .catch(error => console.error('Error al buscar producto:', error));
    });

    function displayResults(data, resultsDiv) {
        if (!data) {
            resultsDiv.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        const table = document.createElement("table");
        const headerRow = table.insertRow(0);
        const headers = ["ID", "Nombre", "Precio", "EAN"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        const row = table.insertRow();
        row.insertCell().textContent = data.id;
        row.insertCell().textContent = data.name;
        row.insertCell().textContent = data.precio;
        row.insertCell().textContent = data.ean;

        resultsDiv.innerHTML = "";
        resultsDiv.appendChild(table);
    }
});
