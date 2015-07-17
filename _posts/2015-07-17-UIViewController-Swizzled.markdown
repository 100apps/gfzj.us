---
layout: post
title: "UIViewController-Swizzled源码分析"
date: 2015-07-17 18:37:17
categories: series 读源代码学习iOS开发
by: gf
description: 分析UIViewController-Swizzled的源代码，以及这种思路的其他应用
---
[UIViewController-Swizzled](https://github.com/RuiAAPeres/UIViewController-Swizzled)是一个非常简单的类库，大概只有100多行代码，实现的功能也比较简单：显示一个UIViewController的时候，log一下。

看了一下源代码，原理是hook `UIViewController`的`viewDidAppear:`方法：


{%highlight objc%}

+ (void)swizzIt
{
    // We won't do anything if it's already swizzed
    if (isSwizzed)
    {
        return;
    }
    
    swizzInstance([self class],@selector(viewDidAppear:),@selector(swizzviewDidAppear:));
    
    isSwizzed = YES;
}

static void swizzInstance(Class class, SEL originalSelector, SEL swizzledSelector)
{
    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    
    BOOL didAddMethod =
    class_addMethod(class, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
    
    if (didAddMethod)
    {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod),method_getTypeEncoding(originalMethod));
    }
    else
    {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
}

-(void)swizzviewDidAppear:(BOOL)animated
{
    [self printPath];
    
    // Call the original method (viewWillAppear)
    //这里不会产生递归(不好理解)！！！，因为swizzviewDidAppear已经被替换了。
    [self swizzviewDidAppear:animated];
}
{%endhighlight%}

每个UIViewController就想浏览器中的一个页面，这样我们就能监控用户的整个页面跳转流程，做一个统计工具应该比较简单了吧。另外，我们还可以监控更多的方法，比如按钮点击等，配合[MGJTempStore
](https://github.com/mogujie/MGJTempStore)做一个统计工具的前端，应该不是一件困难的事情了。

###TODO:
既然是监控，最好能做到动态下发规则。比如监控[XDTableViewController didSelectRowAtIndexPath:]方法。理论上，配合[JSPatch](https://github.com/bang590/JSPatch)应该是可以的。抽空研究一下，做一款这样的工具。