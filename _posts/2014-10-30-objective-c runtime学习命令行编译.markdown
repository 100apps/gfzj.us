---
layout: post
title: "objective-c runtime学习:命令行编译"
date: 2014-10-30 09:33:06
category: tech
by: gf
keyword: ObjC,iOS开发
description: 今天学习了一下ObjCRuntime，以前都是在Xcode里面写代码，都是工具自动搞定了，今天体验了一下命令行。顺便复习一下gcc的知识。
permalink: /tech/204.html
---
今天学习了一下ObjC Runtime，以前都是在Xcode里面写代码，都是工具自动搞定了，今天体验了一下命令行：

    #import <Foundation/Foundation.h>
    
    @interface MyObject : NSObject
    {
     NSString *aString;
    }
    
    @property(retain) NSString *aString;
    
    @end
    
    @implementation MyObject
    
    -(id)init
    {
     if (self = [super init]) {
      [self setAString:nil];
     }
     return self;
    }
    
    @synthesize aString;
    
    @end
    
    
    
    int main (int argc, const char * argv[]) {
        NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
    
     id obj1 = [NSMutableArray alloc];
     id obj2 = [[NSMutableArray alloc] init];
    
     id obj3 = [NSArray alloc];
     id obj4 = [[NSArray alloc] initWithObjects:@"Hello",nil];
    
     NSLog(@"obj1 class is %@",NSStringFromClass([obj1 class]));
     NSLog(@"obj2 class is %@",NSStringFromClass([obj2 class]));
    
     NSLog(@"obj3 class is %@",NSStringFromClass([obj3 class]));
     NSLog(@"obj4 class is %@",NSStringFromClass([obj4 class]));
    
     id obj5 = [MyObject alloc];
     id obj6 = [[MyObject alloc] init];
    
     NSLog(@"obj5 class is %@",NSStringFromClass([obj5 class]));
     NSLog(@"obj6 class is %@",NSStringFromClass([obj6 class]));
    
     [pool drain];
        return 0;
    }

在命令行中，我们可以直接编译：

    gcc -ObjC -framework Foundation b.m
     ./a.out

或者为了方便查看，可以一步步来：

    //第一步，预处理：我们可以发现，Foundation.h被展开了
     gcc -ObjC b.m -E -o b.i
     //第二部，编译成汇编代码：生成的b.s就是纯正的汇编语言代码
     gcc -ObjC -S b.i
     //第三步，汇编:我们可以查看b.o
     gcc -c b.s
     //第四步，链接：生成a.out，或者通过-o改变输出文件名
     gcc -ObjC -framework Foundation b.o

#  # update 2014-11-25 ##

把objc代码翻译成Cpp

    clang -rewrite-objc block.c
