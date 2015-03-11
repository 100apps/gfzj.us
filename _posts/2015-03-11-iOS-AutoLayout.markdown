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

再看一个例子

![demo2](/images/autolayout-demo-2.gif)

上面的例子如果用frame是比较麻烦的。因为除了更新自己的height以外，还要更新其他兄弟节点的origin.y。如果用autolayout就很方便：

{%highlight objc%}
self.view.backgroundColor=[UIColor whiteColor];
//注意self.view并没有self.view.translatesAutoresizingMaskIntoConstraints=NO;
    id lastView=nil;
    for (int i=1; i<=10; i++) {
        UIButton *v=[UIButton new];
        [v setTitle:[NSString stringWithFormat:@"[+] button-%d",i] forState:UIControlStateNormal];
        [v setTitle:[NSString stringWithFormat:@"[-] button-%d",i] forState:UIControlStateSelected];
        v.backgroundColor=[UIColor colorWithWhite:i*25.0/255 alpha:1];

        [self.view addSubview:v];
        v.translatesAutoresizingMaskIntoConstraints=NO;
        
        [self.view addConstraint:[NSLayoutConstraint constraintWithItem:v attribute:NSLayoutAttributeTrailing relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeTrailing multiplier:1 constant:-10]];
        [self.view addConstraint:[NSLayoutConstraint constraintWithItem:v attribute:NSLayoutAttributeLeading relatedBy:NSLayoutRelationEqual toItem:self.view attribute:NSLayoutAttributeLeading multiplier:1 constant:10]];
        [self.view addConstraint:[NSLayoutConstraint constraintWithItem:v attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:(lastView?:self.topLayoutGuide) attribute:NSLayoutAttributeBottom multiplier:1 constant:0]];
        NSLayoutConstraint *height=[NSLayoutConstraint constraintWithItem:v attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:0 constant:43];
        height.identifier=@"myheight";//通过设置identifier，来找到这个NSLayoutConstraint
        [v addConstraint:height];
        lastView=v;
        //"UIControl+Blocks.h" 或者addTarget
        [v addEventHandler:^(id sender) {
            UIButton *btn=sender;
            NSLog(@"%d clicked\n%@",i,btn.constraints);
            for (NSLayoutConstraint *c in btn.constraints) {
                if ([c.identifier isEqualToString:@"myheight"]) {
                    c.constant= (c.constant==100?43:100);
                    btn.selected=c.constant==100;
                }
            }
            [UIView animateWithDuration:.25 animations:^{
                [self.view layoutIfNeeded];
            }];
           
            
        } forControlEvents:UIControlEventTouchUpInside];
    }
{%endhighlight%}