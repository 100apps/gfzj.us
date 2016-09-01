---
layout: post
title: "Scala Future"
date: 2016-08-31 13:48:29 +800
categories: 
by: zj
description: Global ExecutionContext and future example
---


#### 默认Global Execution Context

在未指定context时，执行scala future代码，scala会给出指示：

```
scala> Future(println("Do something slow"))
<console>:14: error: Cannot find an implicit ExecutionContext, either require one yourself or import ExecutionContext.Implicits.global
```

Scala提供了一个global的ExecutionContext，它启动一个ForkJoinPool，其并发度即为JVM的CPU数（执行Runtime.getRuntime.availableProcessors()获得）。Global ExecutionContext保证CPU处于忙碌状态，限制线程之间context切换的开销。

但是，如果有很多阻塞的需求，建议使用自己的线程池。

参考资料：

- [Global ExecutionContext](http://blog.jessitron.com/2014/02/scala-global-executioncontext-makes.html)
- [Tips Using Future](http://tech.gilt.com/2015/01/05/some-quick-tips-for-using-scala-futures)

#### Example

阻塞的并行执行示例：

```
import scala.concurrent.{Await, Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

object FutureTest {
  def main(args: Array[String]): Unit = {
    val list = List(1, 3, 2)
    val futures = list.map {
      value => doIt(value)
    }

    futures.map {
      future =>
        Await.ready(future, 10 seconds)
    }
  }
  
  def doIt(value: Int): Future[Unit] = Future {
      Thread.sleep(2000)
      println(Thread.currentThread()+ "-" + value)
  }
}
```