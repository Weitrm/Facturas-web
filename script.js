document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const description = document.getElementById('description').value;
    const includeIva = document.getElementById('includeIva').checked;
    
    const services = document.querySelectorAll('.service input[type="checkbox"]:checked');
    let total = 0;
    let serviceDetails = '';
    let iva = 0;

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
        iva = total * 0.22;
        total += iva;
        serviceDetails += `<p>IVA: $${iva.toFixed(2)}</p>`;
    }

    const invoiceData = {
        invoiceNumber,
        customerName,
        phoneNumber,
        invoiceDate,
        description,
        serviceDetails,
        total,
        iva
    };

    // Guardar la factura en el LocalStorage
    let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoiceData);
    localStorage.setItem('invoices', JSON.stringify(invoices));

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
                <p class="total-p"><strong>Total:</strong> $${total.toFixed(2)}</p>
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
});
