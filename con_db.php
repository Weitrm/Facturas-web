<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "factura";

// Crear conexión
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Verificar conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Obtener los datos del formulario
$invoiceNumber = $_POST['invoiceNumber'];
$customerName = $_POST['customerName'];
$phoneNumber = $_POST['phoneNumber'];
$invoiceDate = $_POST['invoiceDate'];
$description = $_POST['description'];
$serviceDetails = $_POST['serviceDetails'];
$total = $_POST['total'];

$sql = "INSERT INTO `facturas`(`numero_factura`, `customer_name`, `phone_number`, `invoice_date`, `description`, `service_details`, `total`) 
        VALUES ('$invoiceNumber', '$customerName', '$phoneNumber', '$invoiceDate', '$description', '$serviceDetails', '$total')";

if (mysqli_query($conn, $sql)) {
    echo "Factura guardada exitosamente";
} else {
    echo "Error al guardar la factura: " . mysqli_error($conn);
}

// Cerrar conexión
mysqli_close($conn);

?>
