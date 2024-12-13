document.addEventListener('DOMContentLoaded', function() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoiceTableBody = document.getElementById('invoiceTableBody');

    invoices.forEach((invoice, index) => {
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
                <button style="margin: 2px;" onclick="viewInvoice(${index})">Ver</button>
                <button style="margin: 2px;" onclick="sendInvoice(${index})">Enviar</button>
                <button style="margin: 2px;" onclick="deleteInvoice(${index})">Eliminar</button>
                <button style="margin: 2px 2px 10px 2px;" onclick="modifyInvoice(${index})">Modificar</button>
            </td>
        `;

        invoiceTableBody.appendChild(row);
    });
});

function viewInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem('invoices'));
    const invoice = invoices[index];

    const { invoiceNumber, customerName, phoneNumber, invoiceDate, rut, includeRut, description, serviceDetails, total, installments, installmentsPaid } = invoice;

    const newWindowContent = `
    <html>
    <head>
        <title>Factura</title>
        <link rel="stylesheet" type="text/css" href="styles_invoice.css">
        <style>
            @media print {
                body {
                    width: 210mm;
                    margin: 0;
                    padding: 10mm;
                    box-sizing: border-box;
                }
                .header, .invoice-details, .service-details, .description, .footer {
                    page-break-inside: avoid;
                }
                .total-p {
                    text-align: end;
                }
            }
        </style>
    </head>
    <body>
    <div class="div-body">
        <div class="header">
            <div class="company-info">
                <img src="./img/jslogo.png" alt="Logo de la Empresa">
                <div>
                    <div class="electricista">
                        <p><strong>Técnico electricista</strong></p>
                        <img id="electricista" src="img/electricista.png" alt="logo electricista">
                    </div>
                    <p><strong>Empresa:</strong> JS Aires Pando</p>
                    <p><strong>Número:</strong> 093 365 696</p>
                    <p><strong>Web:</strong> Aireacondicionadopando.com</p>
                </div>
            </div>
            ${includeRut ? `<div class="rut"><p><strong>RUT:</strong> ${rut}</p></div>` : ''}
        </div>
        <h1>Factura</h1>
        <div class="invoice-details">
            <p><strong>Número de Factura:</strong> ${invoiceNumber}</p>
            <p><strong>Cliente:</strong> ${customerName}</p>
            <p><strong>Teléfono:</strong> ${phoneNumber}</p>
            <p><strong>Fecha de Factura:</strong> ${invoiceDate}</p>
            <p><strong>Cuotas:</strong> ${installmentsPaid}/${installments}</p>
        </div>
        <div class="service-details">
             ${serviceDetails}
        </div>
        <p class="total-p"><strong>Total:</strong> $${total.toFixed(2)}</p>
        <div class="description">
            <p><strong>Detalles:</strong></p>
            <p>${description}</p>
        </div>
        <button onclick="window.print()">Imprimir Factura</button>
        </div>
    </body>
</html>
`;

    const newWindow = window.open();
    newWindow.document.write(newWindowContent);
    newWindow.document.close();
}

function sendInvoice(index) {
    alert('Función para enviar la factura aún no implementada.');
}

function deleteInvoice(index) {
    let invoices = JSON.parse(localStorage.getItem('invoices'));
    invoices.splice(index, 1);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    location.reload(); // Recarga la página para actualizar la tabla de facturas
}


function modifyInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem('invoices'));
    const invoice = invoices[index];

    const { invoiceNumber, customerName, phoneNumber, invoiceDate, rut, includeRut, description, serviceDetails, total, installmentsPaid } = invoice;

    const formContent = `
        <form id="modifyInvoiceForm" onsubmit="updateInvoice(${index}); return false;">
            <label for="modifiedInstallmentsPaid">Cuotas Pagadas:</label>
            <input type="number" id="modifiedInstallmentsPaid" name="modifiedInstallmentsPaid" value="${installmentsPaid}" min="0" max="${invoice.installments}" step="1" required>
            <button type="submit">Guardar Cambios</button>
        </form>
    `;

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = formContent;
    document.body.appendChild(modal);
}

function updateInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem('invoices'));
    const invoice = invoices[index];

    const modifiedInstallmentsPaid = parseInt(document.getElementById('modifiedInstallmentsPaid').value);

    invoice.installmentsPaid = modifiedInstallmentsPaid;

    localStorage.setItem('invoices', JSON.stringify(invoices));

    document.body.removeChild(document.querySelector('.modal'));
    location.reload(); // Recarga la página para reflejar los cambios en la tabla de facturas
}


