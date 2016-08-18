---
layout: post
title: "通过http发送邮件"
date: 2016-08-18 10:34:29 +800
categories: 
by: gf
description: 一种简单的发邮件的API
---

smtp和pop3协议是一种非常简单的应用层协议，我们以前做过[FakeSMTP](https://github.com/100apps/emailtools/blob/master/FakeSMTP.java)，实现一个简单的smtp server，用来接收别人的邮件，spam注册的时候非常实用。现在我们在ci上面打算发邮件，所以需要一个smtp的client，这里我们用[PHPMailer
](https://github.com/PHPMailer/PHPMailer)，当然也可以用node，类似[IWantYou](https://github.com/100apps/IWantYou)这样发。

进入`PHPMailer/examples/`目录，`vi index.php`

```php
<?php
header("Content-Type: text/plain; charset=utf-8");
/**
 * This example shows making an SMTP connection with authentication.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Asia/Shanghai');

require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->CharSet="UTF-8";
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'echo';
//Set the hostname of the mail server
$mail->Host = "smtp.qiye.163.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "git@houpix.com";
//Password to use for SMTP authentication
$mail->Password = "a";
//Set who the message is to be sent from
$mail->setFrom('git@houpix.com', 'Houpix Git');
if(!empty($_REQUEST["to"])){
	if(is_array($_REQUEST["to"])){
		foreach($_REQUEST["to"] as $to)
			$mail->addAddress(strpos($to,"@")?$to:$to."@houpix.com");
	}else{
		$mail->addAddress(strpos($_REQUEST["to"],"@")?$_REQUEST["to"]:$_REQUEST["to"]."@houpix.com");
	}
}
if(!empty($_REQUEST["subject"]))
	$mail->Subject = $_REQUEST["subject"];
if(!empty($_REQUEST["body"]))
	$mail->Body = $_REQUEST["body"];
if(!empty($_REQUEST["html"])){
	$mail->msgHTML( $_REQUEST["html"]);
}

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}

```

然后启动服务：

```bash
php -S 0.0.0.0:8000 index.php
```

调用：

```
curl -v http://git.yuyue.work:8000/ -d "to[]=guangfx.com" -d "subject=你好世界" -d "html=<h1><a href='http://sdf.com'>go</a></h1>"
```

这样，webhook也可以变成发邮件了。还算方便。不过要注意这个`微服务`的高可用。