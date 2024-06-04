document.addEventListener('DOMContentLoaded', function() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoiceTableBody = document.getElementById('invoiceTableBody');

    invoices.forEach((invoice, index) => {
        console.log('invoice:', invoice); // Depuración

        let total = 0;
        if (invoice.total) {
            total = invoice.total;
        }

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.customerName}</td>
            <td>${invoice.invoiceDate}</td>
            <td>$${total.toFixed(2)}</td>
            <td>
                <button onclick="viewInvoice(${index})">Ver</button>
                <button onclick="sendInvoice(${index})">Enviar</button>
                <button onclick="deleteInvoice(${index})">Eliminar</button>
            </td>
        `;

        invoiceTableBody.appendChild(row);
    });
});

function viewInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem('invoices'));
    const invoice = invoices[index];

    console.log('invoice:', invoice); // Depuración

    const { invoiceNumber, customerName, phoneNumber, invoiceDate, description, serviceDetails, total } = invoice;

    const newWindowContent = `
    <html>
    <head>
        <title>Factura</title>
        <link rel="stylesheet" type="text/css" href="styles_invoice.css">
    </head>
    <body>
        <div class="header">
            <div class="company-info">
                <img src="./img/jslogo.png" alt="Logo de la Empresa">
                <div>
                    <p><strong>Empresa:</strong> JS Aires Pando</p>
                    <p><strong>Número:</strong> 093 365 696</p>
                    <p><strong>Web:</strong> Aireacondicionadopando.com</p>
                </div>
            </div>
        </div>
        <h1>Factura</h1>
        <div class="invoice-details">
            <p><strong>Número de Factura:</strong> ${invoiceNumber}</p>
            <p><strong>Cliente:</strong> ${customerName}</p>
            <p><strong>Teléfono:</strong> ${phoneNumber}</p>
            <p><strong>Fecha de Factura:</strong> ${invoiceDate}</p>
        </div>
        <div class="service-details">
             ${serviceDetails}
        </div>
        <p><strong>Total:</strong> $${total ? total.toFixed(2) : '0.00'}</p>
        <div class="description">
            <p><strong>Detalles:</strong></p>
            <p>${description}</p>
        </div>
    </body>
</html>
`;

    const newWindow = window.open();
    newWindow.document.write(newWindowContent);
    newWindow.document.close();
}

function sendInvoice(index) {
    // Aquí puedes implementar la lógica para enviar la factura por correo electrónico o cualquier otro medio.
    alert('Función para enviar la factura aún no implementada.');
}

function deleteInvoice(index) {
    let invoices = JSON.parse(localStorage.getItem('invoices'));
    invoices.splice(index, 1);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    location.reload();
}
