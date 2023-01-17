<?php
header("Access-Control-Allow-Origin: *");
header("Content-type : application/json");
move_uploaded_file($_FILES["file"]["tmp_name"], "C:\Users\kratos\Desktop\KraCode\\" . $_FILES["file"]["name"]);
echo json_encode([
    "message" => "message"
]);