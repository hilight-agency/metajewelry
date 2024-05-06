<?php
header("Content-type: application/json; charset=utf-8");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if(isset($_POST['phone'])){
  $mail = new PHPMailer(true);
  $mail->SMTPDebug = 0;
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPSecure = "tls";
  $mail->Host = 'ssl://smtp.gmail.com';
  $mail->Port = 465;
  $mail->Username = 'highlightsjewelry@gmail.com';
  $mail->Password = '5;a]v8P)`|';//todo:Hide as env var
  $mail->From = "highlightsjewelry@gmail.com";
  $mail->FromName = "Highlights Jewelry";
  $mail->addAddress("highlightsjewelry@gmail.com", "Highlights Jewelry");
  $phone = htmlspecialchars(stripslashes(trim($_POST['phone'])));
  $email = htmlspecialchars(stripslashes(trim($_POST['email'])));
  $myname = htmlspecialchars(stripslashes(trim($_POST['myname'])));
  if(!preg_match("/^\d{10,11}$/", $phone)){
	  $return = array("status"=>"error","msg"=>"Please provide at least 10 digits of your phone number (Don't forget to add country and city code)");
  }
  if(!preg_match("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i", $email)){
	  $return = array("status"=>"error","msg"=>"Please enter your email address in format yourname@example.com");
  }
  if(!$myname){
	  $return = array("status"=>"error","msg"=>"This field is required");
  }
  if ($return["status"]!="error") {
    $mail->Subject = "Message from highlights.mustbefamily.com";
    $body = "Phone: $phone<br>Email: $email<br>Name: $myname";
    $mail->Body = $body;
    $mail->isHTML(true);
    if($mail->send()){
      $return = array("status"=>"ok","msg"=>"Thank you. We contact you back as soon as possible!");
    }else{
      $return = array("status"=>"error","msg"=>"Oops! Something went wrong. Please refresh page and try again or use Email link");
    }
  }
  $json = json_encode($return);
  echo $json;
}
?>
