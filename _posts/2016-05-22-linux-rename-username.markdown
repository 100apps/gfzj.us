---
layout: post
title: "Linux重命名用户名"
by: zj
description: linux rename username
---

执行如下命令：

（如果是要修改当前用户的用户名，在修改之前要切换到其他用户，且这个“其他用户”是root用户或者是sudoer，再执行如下）

```bash
exec sudo -i
killall -u oldname
id oldname       
usermod -l newname oldname                              将用户名从oldname改为newname：如usermod -l jessy jess
groupmod -n newname oldname                          修改用户所属的用户组：如groupmod -n jessy jess
usermod -d /home/newname -m newname        修改用户的home目录：如usermod -d /home/jessy -m jessy
id newname
```

注意：如果之前有自己安装的东西放在了home目录下，且设置了PATH变量，此时也要改为新的home目录名。

