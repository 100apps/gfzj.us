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

#旋转后自动布局

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

#自动计算兄弟元素位置

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

#Autolayout和UIScrollView

根据[官方文档](https://developer.apple.com/library/ios/technotes/tn2154/_index.html)，UIScrollView使用AutoLayout有两种方法。考虑下面的例子：

![demo-3](/images/autolayout-demo-3.gif)

##方法1,纯autolayout，注意边界。

{%highlight objc%}
    self.view.backgroundColor=[UIColor whiteColor];
    UIScrollView *sv=[UIScrollView new];
    sv.translatesAutoresizingMaskIntoConstraints=NO;
    [self.view addSubview:sv];
    
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[sv]|" options:0 metrics: 0 views:NSDictionaryOfVariableBindings(sv)]];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|[sv]|" options:0 metrics: 0 views:NSDictionaryOfVariableBindings(sv)]];
    UIView *lastView=nil;
    int length=100;
    for (int i=0; i<length; i++) {
        UIButton *btn=[UIButton new];
        btn.backgroundColor=[UIColor colorWithWhite:i*0.01 alpha:1];
        [btn setTitle:[NSString stringWithFormat:@"button-%d",i] forState:UIControlStateNormal];
        btn.translatesAutoresizingMaskIntoConstraints=NO;
        [sv addSubview:btn];
        [sv addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:0 constant:i*4+100]];
        [sv addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:sv attribute:NSLayoutAttributeCenterX multiplier:1 constant:0]];
        if (i==0) {
            [sv addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:sv attribute:NSLayoutAttributeTop multiplier:1 constant:10]];
        }else{
            [sv addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:lastView attribute:NSLayoutAttributeBottom multiplier:1 constant:1]];
        }
        if (i==length-1) {//关键点。非常重要!设置contentsize的height,最大的一个设置width，否则会出错。
            [sv addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:sv attribute:NSLayoutAttributeBottom multiplier:1 constant:-10]];
            [sv addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[btn]|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(btn)]];
        }
        lastView=btn;

{%endhighlight%}


##方法2，使用中间view,利用systemLayoutSizeFittingSize设置contentsize

{%highlight objc%}

    self.automaticallyAdjustsScrollViewInsets=NO;
    self.view.backgroundColor=[UIColor whiteColor];
    UIScrollView *sv=[[UIScrollView alloc]initWithFrame:CGRectMake(0, MARGIN_TOP, SCREEN_WIDTH, CONTENT_HEIGHT)];
    [self.view addSubview:sv];
    
    UIView *view=[UIView new];
    view.translatesAutoresizingMaskIntoConstraints=NO;//都添加到view上面。
    [sv addSubview:view];
    
    UIView *lastView=nil;
    int length=100;
    for (int i=0; i<length; i++) {
        UIButton *btn=[UIButton new];
        btn.backgroundColor=[UIColor colorWithWhite:i*0.01 alpha:1];
        [btn setTitle:[NSString stringWithFormat:@"button-%d",i] forState:UIControlStateNormal];
        btn.translatesAutoresizingMaskIntoConstraints=NO;
        [view addSubview:btn];
        [view addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:0 constant:i*4+100]];
        [view addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:view attribute:NSLayoutAttributeCenterX multiplier:1 constant:0]];
        if (i==0) {
            [view addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:view attribute:NSLayoutAttributeTop multiplier:1 constant:10]];
        }else{
            [view addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeTop relatedBy:NSLayoutRelationEqual toItem:lastView attribute:NSLayoutAttributeBottom multiplier:1 constant:1]];
        }
        if (i==length-1) {//关键点。非常重要!设置contentsize的height,最大的一个设置width，否则会出错。
            [view addConstraint:[NSLayoutConstraint constraintWithItem:btn attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:view attribute:NSLayoutAttributeBottom multiplier:1 constant:-10]];
            [view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[btn]|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(btn)]];
        }
        lastView=btn;
    }
    //关键点。非常重要.设置contentsize以滚动。
    CGSize size=[view systemLayoutSizeFittingSize:UILayoutFittingCompressedSize];
    view.frame=CGRectMake(0, 0, size.width, size.height);
    sv.contentSize=size;
{%endhighlight%}