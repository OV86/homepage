<?php
// the message
$msg = "From: " + $_POST["name"] + "\n" + 
       "Email: " + $_POST["email"] + "\n" + 
       "Message: " + $_POST["message"];

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'From: Trifunovic Stefan <trifunovics@devstack.ee>' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// send email
mail("trifunovic.stefan@yahoo.com","DEVSTACK Request",$msg, $headers);
?>