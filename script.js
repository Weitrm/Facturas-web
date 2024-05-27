document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const invoiceNumber = document.getElementById('invoiceNumber').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const invoiceDate = document.getElementById('invoiceDate').value;
    const description = document.getElementById('description').value;
    
    const services = document.querySelectorAll('.service input[type="checkbox"]:checked');
    let total = 0;
    let serviceDetails = '';

    services.forEach(service => {
        const detailInput = service.parentElement.querySelector('input[type="text"]');
        const priceInput = service.parentElement.querySelector('input[type="number"]');
        const serviceName = service.value;
        const serviceDetail = detailInput ? detailInput.value : '';
        const servicePrice = priceInput ? parseFloat(priceInput.value) : 0;

        serviceDetails += `<p>${serviceName} ${serviceDetail ? `- ${serviceDetail}` : ''}: $${servicePrice.toFixed(2)}</p>`;
        total += servicePrice;
    });

    const invoiceData = {
        invoiceNumber,
        customerName,
        phoneNumber,
        invoiceDate,
        description,
        serviceDetails,
        total
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
});

