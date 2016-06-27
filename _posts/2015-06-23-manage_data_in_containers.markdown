---
layout: post
title: "Docker:管理containers的数据"
date: 2015-06-23 11:04:09
categories: 
by: zj
description: manage data in containers
---

对于Docker来说，containers是通过如下两种方式管理数据：

1. Data volumes
2. Data volume containers

# ## Data volumes

一个数据卷是指container中的一个特殊目录，具有以下特点：

1. 初始化：在创建container时进行初始化。若container所属image在数据卷的挂载点有数据，那么这些数据则是在初始化时拷贝到数据卷。
2. Container之间可以共享数据卷，数据卷也可被重用。
3. 数据卷中的数据修改是立现的，即一旦被修改，数据卷挂载到的containers都实时可见。
4. 在更新image时，不会更新数据卷中的数据变化。
5. 即使删除container，其数据卷也不会被删除。

# ### Add a data volume

在执行命令docker create或者docker run时加入参数-v即可为一个container添加一个数据卷，可以多次使用-v以添加多个数据卷。简单示例如下：

	docker run -d -P --name web -v /webapp training/webapp python app.py

上述命令会在container的/webapp创建挂载点。

如果想要知道/webapp在主机上对应的目录，可执行：

	docker inspect web

结果如下：

	...
	"Volumes": {
	  "/webapp": "/var/lib/docker/vfs/dir/b0518f7a863879aa391da6e1d0c8455db1b0d7d6f716f49463952ebd558bbe1b"
	},
	"VolumesRW": {
	 "/webapp": true
	}
	...

"Volumes"是/webapp的主机目录。"VolumesRW"表示该数据卷可被读写。

我们发现/webapp的主机目录具有一个随机产生的名字，并不友好，所以，在创建container时，可指定将主机上的某目录作为数据卷挂载到container的指定目录下，只需要在使用-v参数时指定一下：

	docker run -d -P --name web -v /src/webapp:/opt/webapp training/webapp python app.py	

如上，将主机的/src/webapp挂载到container的/opt/webapp，如果/src/webapp不存在，会被创建。该数据卷默认可被读写，若需要限制其为可读，执行如下：

	docker run -d -P --name web -v /src/webapp:/opt/webapp:ro training/webapp python app.py

当然，也可以挂载一个单独的文件：

	docker run --rm -it -v ~/.bash_history:/.bash_history ubuntu /bin/bash

如上，在container中使用的命令都会记录下来，当离开container后，仍旧可以查看历史记录。

# ## Creating and mounting a data volume container

如果需要在containers之间共享持久化数据，或者使用非持久化containers的持久化数据，可以考虑创建数据卷container，并将其中数据挂载到其他containers。

创建数据卷containers如下：

	docker create -v /data --name dbdata training/postgres /bin/true

Container dbdata并不执行任何应用。

可以使用参数--volumes-from将/data挂载到别的containers中：

	docker run -d --volumes-from dbdata --name db1 training/postgres
	docker run -d --volumes-from dbdata --name db2 training/postgres

db1和db2共享数据。

数据卷挂载具有传递性，可通过db1或者db2将/data挂载到另一个container：

	docker run -d --name db3 --volumes-from db1 training/postgres

如果此时删除dbdata、db1、db2，数据卷是不会被删除的，一定要在删除数据卷挂载的最后一个container时将其删除，如：

	docker rm -v db3


