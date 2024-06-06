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
            <td>${invoice.phoneNumber}</td>
            <td>${invoice.invoiceDate}</td>
            <td>$${total.toFixed(2)}</td>
            <td>
                <button onclick="viewInvoice(${index})">Ver</button>
                <button onclick="deleteInvoice(${index})">Eliminar</button>
            </td>
        `;
        invoiceTableBody.appendChild(row);
    });
});

function viewInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const invoice = invoices[index];
    
    let serviceDetails = invoice.serviceDetails || '';
    let total = 0;
    if (invoice.total) {
        total = invoice.total;
    }
    let iva = 0;
    if (invoice.iva) {
        iva = invoice.iva;
    }

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
                    <p><strong>Número de Factura:</strong> ${invoice.invoiceNumber}</p>
                    <p><strong>Cliente:</strong> ${invoice.customerName}</p>
                    <p><strong>Teléfono:</strong> ${invoice.phoneNumber}</p>
                    <p><strong>Fecha de Factura:</strong> ${invoice.invoiceDate}</p>
                </div>
                <div class="service-details">
                    ${serviceDetails}
                </div>
                ${iva > 0 ? `<p class="total-p"><strong>IVA:</strong> $${iva.toFixed(2)}</p>` : ''}
                <p class="total-p"><strong>Total:</strong> $${total.toFixed(2)}</p>
                <div class="description">
                    <p><strong>Detalles:</strong></p>
                    <p>${invoice.description}</p>
                </div>
            </body>
        </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(newWindowContent);
    newWindow.document.close();
}

function deleteInvoice(index) {
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.splice(index, 1);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    location.reload();
}
