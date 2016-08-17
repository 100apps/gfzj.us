---
layout: post
title: "机器学习算法预测结果是否随threshold的递减而绝对递减"
by: zj
description: lmachine learning metrics threshold
---

#### 机器学习算法预测结果是否随threshold的递减而递减

对于机器学习算法的预测结果，给定不同的threshold，计算出的metrics（如Precision）值是不同的。一般来说随着threshold的减小，Precision值是减小的。但是如果因为模型本身的局限性导致预测的概率值有问题，可能Precision就不是递减的了，但是整体上来说，还是减小的趋势。

举例如下，给出一些数值对，第一个参数是算法预测的概率值，第二个参数是实际的label：

（0.4，0）

（0.6，1）

（0.7，1）

（0.52，1）

（0.56，0）

上述是（score，real_label）

**设置阈值为` 0.55`，混淆矩阵如下：**


|  | True | False |
|---|---|---|
| True| 2| 1 |
| False| 1| 1 |  

precision = 2 / (2+1)

**设置阈值为` 0.51`，混淆矩阵如下：**

|  | True | False |
|---|---|---|
| True| 3| 0 |
| False| 1| 1 |  

precision = 3 / (3+1)

Precision增加。

