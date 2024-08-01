<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    // Kontrollera om rätt metod används
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Only POST is allowed.');
    }

    // Log the start of the script
    error_log("PHP script started");

    // Get the raw POST data
    $json = file_get_contents('php://input');

    // Log the raw POST data
    error_log("Raw POST data: " . $json);

    // Decode the JSON data
    $data = json_decode($json, true);

    // Log the decoded data
    error_log("Decoded data: " . print_r($data, true));

    // Check for JSON errors
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON data');
    }
    
    // Check if required fields are present
    if (!isset($data['title'], $data['description'], $data['user'], $data['truefalse'])) {
        throw new Exception('Missing required fields');
    }

    // Extract variables
    $title = $data['title'];
    $description = $data['description'];
    $user = $data['user'];
    $truefalse = $data['truefalse'];

    // Prepare SQL query
    $sql = "INSERT INTO testar (title, description, user, truefalse) VALUES (:title, :description, :user, :truefalse)";

    // Prepare statement
    $stmt = $pdo->prepare($sql);

    // Bind parameters
    $stmt->bindParam(':title', $title, PDO::PARAM_STR);
    $stmt->bindParam(':description', $description, PDO::PARAM_STR);
    $stmt->bindParam(':user', $user, PDO::PARAM_STR);
    $stmt->bindParam(':truefalse', $truefalse, PDO::PARAM_BOOL);

    // Execute the statement
    if ($stmt->execute()) {
        $response = [
            "status" => "success",
            "message" => "Data inserted successfully"
        ];
    } else {
        throw new Exception('Failed to insert data');
    }

    // Send JSON response
    echo json_encode($response);

} catch (Exception $e) {
    // Log the error message
    error_log("Error: " . $e->getMessage());

    // Send error response
    $response = ["status" => "error", "message" => $e->getMessage()];
    echo json_encode($response);
}
?>