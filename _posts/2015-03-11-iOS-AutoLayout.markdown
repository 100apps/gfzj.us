---
layout: post
title: "iOS AutoLayout使用心得"
date: 2015-03-11 09:27:08
category: tech
img: /images/autolayout-demo.gif
by: gf
description: AutoLayout确实非常方便，比起刀耕火种的手写frame要强大很多。体会一下下面的经典例子，就知道了。
---

AutoLayout确实非常方便，比起刀耕火种的手写frame要强大很多。体会一下下面的经典例子，就知道了。

![autolayout demo](/images/autolayout-demo.gif)

上面的例子可以用下面的代码实现：

{%highlight objc%}
[super viewDidLoad];
    self.view.backgroundColor=[UIColor whiteColor];
    
    UIView *a = [[UIView alloc] init];
    a.backgroundColor = [UIColor redColor];
    a.layer.cornerRadius=4;
    [a setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self.view addSubview:a];
    
    UIView *b = [[UIView alloc] init];
    b.backgroundColor = [UIColor greenColor];
    b.layer.cornerRadius=4;
    [b setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self.view addSubview:b];
    
    UIView *c = [[UIView alloc] init];
    c.backgroundColor = [UIColor blueColor];
    c.layer.cornerRadius=4;
    [c setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self.view addSubview:c];
    
    NSDictionary *views=NSDictionaryOfVariableBindings(a,b,c);
    NSDictionary *metrics=@{@"padding":@10};
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-padding-[a(==b)]-padding-[b]-padding-|" options:NSLayoutFormatAlignAllTop metrics:metrics views:views]];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-padding-[a(==b)]-padding-[c(==b)]-padding-|" options:0 metrics:metrics views:views]];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-padding-[c]-padding-|" options:0 metrics:metrics views:views]];
    
{%endhighlight%}

