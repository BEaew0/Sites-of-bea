<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['cart'] = json_decode($_POST['cart'], true);
    header('Location: checkout.php');
    exit();
}

$cart = isset($_SESSION['cart']) ? $_SESSION['cart'] : [];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Finalizar Compra</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <h1>Cesta de Compras</h1>
    <ul>
        <?php foreach ($cart as $item): ?>
            <li><?php echo htmlspecialchars($item['name']); ?> - R$ <?php echo htmlspecialchars($item['price']); ?> x <?php echo htmlspecialchars($item['quantity']); ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
