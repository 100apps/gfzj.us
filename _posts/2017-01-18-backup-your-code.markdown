---
layout: post
title: "代码自动备份的工具"
date: 2017-01-18 14:48:02
categories: 
by: gf
description: 代码自动备份的工具，从此可以安心写代码。
---

前两天不小心`git reset --hard`了自己的工作目录，新建的几个文件没有add，更没有commit，丢失了一上午的工作成果，痛心不已。我们一般都是在自己的分支上面工作，开发过程中自己的分支很难做到实时备份，如果下班之前没有push，电脑丢了，硬盘坏了都是一种风险。所以写了一个小脚本，放到crontab里面，设置成每10分钟备份一次。

频繁的commit会使项目的.git目录变大，push到远程的话会影响大家pull和clone的速度。为了不影响公共项目，我在自己的gitlab里面新建了一个private的项目，用来保存所有的需要备份的项目。

比如我需要定时备份`/ramdisk/hello`这个项目的以"gf-"开头的分支。

```bash
#添加一个remote
git remote add backup git@gitlab.alibaba-inc.com:guangfeng.lgf/code-back-up.git
#crontab -e 添加一个定式任务
1 */10   *  *   *   * /usr/local/bin/push.sh /ramdisk/hello
```
push.sh文件：

```bash
branch=$2
if [ "x$branch" = "x" ];then
    branch="^gf-"
fi
echo "try to backup branch:$branch for $1"
if [ -d $1 ];then
    cd $1
    basename=`basename $PWD`
    ref=$(git symbolic-ref HEAD 2> /dev/null)
    if [ x$ref != "x" ];then
        if echo "${ref#refs/heads/}" | grep -E "$branch" ;then
            echo "pushing $1"
            git add .
            git commit -m "code auto backup `date`"
            git push backup "${ref#refs/heads/}:${basename}_${ref#refs/heads/}"
            echo "back up $1 to ${basename}_${ref#refs/heads/} successfully"
        else
            echo "not on branch $branch"
        fi
    else 
        echo "$1 is not a git repositry"
    fi
else
    echo "$1 is not a directory"
fi
```

注意这里有两个问题：
1. 定时备份的分支，最好不要push到origin了。要不然可能会对工作在同一个项目的同学造成困扰（sourcetree之类的工具看起来有很多提交）。
2. merge到develop的时候注意增加 [--squash 参数](http://stackoverflow.com/questions/2427238/in-git-what-is-the-difference-between-merge-squash-and-rebase)。要不然会对同一个项目的同学造成更大的困扰。(develop分支增加N多无意义的commit)。

费了这么多周折，用了一个很笨的方法，只是想定(实)时备份一下劳动成果。不知道大家有没有更高端的方法？求指导。

