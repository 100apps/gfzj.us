<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>返回结果</title>
</head>

<body>
<?php
echo "SERVER['HTTP_REFERER']:".(empty($_SERVER['HTTP_REFERER'])?"":$_SERVER['HTTP_REFERER'])."<br>";
?>
<script type="text/javascript">
document.write("document.referrer:");
document.write(document.referrer);
document.write("<br>");
</script>
<a href="javascript:history.back()">history.back()</a>
</body>
</html>

