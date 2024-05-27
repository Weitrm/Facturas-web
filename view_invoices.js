document.addEventListener('DOMContentLoaded', function() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoiceTableBody = document.getElementById('invoiceTableBody');

    invoices.forEach((invoice, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.customerName}</td>
            <td>${invoice.invoiceDate}</td>
            <td>$${invoice.total.toFixed(2)}</td>
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
            <p class="rut">RUT: 110374690018</p>
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
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        <div class="description">
            <p><strong>Detalles:</strong></p>
            <p>${description}</p>
        </div>
        <div class="footer">
            <div class="signature-space">
                <p>Jorge Silva</p>
            </div>
            <div class="future-text-space">
                <p>Autorizado bla bla / aaaaaaaaaaaaaaaaaa</p>
            </div>
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
