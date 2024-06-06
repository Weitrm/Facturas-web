document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const includeRut = document.getElementById('includeRut').checked;
    const rut = includeRut ? document.getElementById('rut').value : '';
    const includeIva = document.getElementById('includeIva').checked;
    const description = document.getElementById('description').value;

    const services = document.querySelectorAll('.service input[type="checkbox"]:checked');
    let total = 0;
    let serviceDetails = '';

    services.forEach(service => {
        const detailInput = service.parentElement.querySelector('input[type="text"]');
        const priceInput = service.parentElement.querySelector('input[type="number"]');
        const serviceName = service.value;
        const serviceDetail = detailInput ? detailInput.value : '';

        let servicePrice = 0;
        if (priceInput && priceInput.value) {
            servicePrice = parseFloat(priceInput.value);
        }

        serviceDetails += `<p>${serviceName} ${serviceDetail ? `- ${serviceDetail}` : ''}: $${servicePrice.toFixed(2)}</p>`;
        total += servicePrice;
    });

    if (includeIva) {
        const iva = total * 0.22;
        serviceDetails += `<p>IVA (22%): $${iva.toFixed(2)}</p>`;
        total += iva;
    }

    const invoiceData = {
        invoiceNumber,
        customerName,
        phoneNumber,
        invoiceDate,
        rut,
        includeRut,
        description,
        serviceDetails,
        total
    };

    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoiceData);
    localStorage.setItem('invoices', JSON.stringify(invoices));

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
});
