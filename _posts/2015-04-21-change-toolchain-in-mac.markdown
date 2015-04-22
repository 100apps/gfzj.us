---
layout: post
title: "mac中切换构建工具链(toolchain)"
date: 2015-04-21 17:05:10
category: tech
by: gf
description: 有的时候我们的mac安装了多个版本的工具链，比如不同版本的xcode，不同版本的jdk。我们想临时指定使用特定版本，但是又不影响整个系统，这时候可以用几个特殊的环境变量控制。
---

今天编译jdk9的时候，根据<http://hg.openjdk.java.net/jdk9/jdk9/raw-file/6c9904922128/README-builds.html>，需要使用*XCode 5.1.1 or newer*，很明显，官方是在XCode 5.1.1下编译的。但是我的电脑用了xcode 6.3，编译器版本都不一样了，很容易fail，所以需要切换XCode 5.1.1 的环境。

以前都用`xcode-select`命令，但是今天这货死活不起作用，switch以后，在print一下，还是原来的路径。无意中man 了一下，发现里面有一段：

	 -s <path>, --switch <path>
	              Sets the active developer directory to the given path, for exam-
	              ple /Applications/Xcode-DP.app. This command must  be  run  with
	              superuser  permissions  (see sudo(8)), and will affect all users
	              on the system. To set the path without superuser permissions  or
	              only  for the current shell session, use the DEVELOPER_DIR envi-
	              ronment variable instead (see ENVIRONMENT).

看来官方想得很周到，可以用`DEVELOPER_DIR`环境变量控制，真是峰回路转！

果断运行:

	export DEVELOPER_DIR=/Developer/Xcode5.1.1.app/Contents/Developer/

然后运行：

	gcc -v

果然gcc版本变了！

但是还有个问题，我的电脑上安装了jdk7和jdk8，编译jdk9需要jdk8，这时候通过：

	export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)

来临时指定用jdk8，再运行`java -version`试试，版本已改。

所以要想在Yosemite下编译jdk9，只需要：

1. 下载XCode 5.1.1(官方地址：<https://developer.apple.com/downloads/index.action> 需要开发者账号)
2. 下载xquartz 2.7.5(下载地址：<http://xquartz.macosforge.org/trac/wiki/Releases>,注意版本)
3. 设置DEVELOPER_DIR和JAVA_HOME
4. config：./configure --enable-debug --with-target-bits=64 --with-freetype=/usr/X11
5. make JOBS=2

Mac下面还有几个特殊的跟构建工具链有关的变量：

	DEVELOPER_DIR=$(xcode-select -print-path)
	export PATH=$(/usr/sbin/sysctl -n user.cs_path):${DEVELOPER_DIR}/bin:${DEVELOPER_DIR}/sbin
	export MACOSX_DEPLOYMENT_TARGET=$(sw_vers -productVersion | cut -d. -f-2)
	export SDKROOT=$(xcodebuild -version -sdk macosx${MACOSX_DEPLOYMENT_TARGET} | sed -n '/^Path: /s///p')
	export CC=$(xcrun -find gcc)
	export CXX=$(xcrun -find g++)
	export CPPFLAGS="-isysroot ${SDKROOT}"
	export LDFLAGS="-Wl,-syslibroot,${SDKROOT}"

当然，我们从Xcode的日志中，也能找到一份颇全的环境变量：

	export ACTION=build
    export ALTERNATE_GROUP=staff
    export ALTERNATE_MODE=u+w,go-w,a+rX
    export ALTERNATE_OWNER=zenith
    export ALWAYS_SEARCH_USER_PATHS=YES
    export ALWAYS_USE_SEPARATE_HEADERMAPS=YES
    export APPLE_INTERNAL_DEVELOPER_DIR=/AppleInternal/Developer
    export APPLE_INTERNAL_DIR=/AppleInternal
    export APPLE_INTERNAL_DOCUMENTATION_DIR=/AppleInternal/Documentation
    export APPLE_INTERNAL_LIBRARY_DIR=/AppleInternal/Library
    export APPLE_INTERNAL_TOOLS=/AppleInternal/Developer/Tools
    export APPLICATION_EXTENSION_API_ONLY=NO
    export APPLY_RULES_IN_COPY_FILES=NO
    export ARCHS=x86_64
    export ARCHS_STANDARD=x86_64
    export ARCHS_STANDARD_32_64_BIT="x86_64 i386"
    export ARCHS_STANDARD_32_BIT=i386
    export ARCHS_STANDARD_64_BIT=x86_64
    export ARCHS_STANDARD_INCLUDING_64_BIT=x86_64
    export AVAILABLE_PLATFORMS="iphonesimulator macosx iphoneos"
    export BUILD_COMPONENTS="headers build"
    export BUILD_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products
    export BUILD_ROOT=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products
    export BUILD_STYLE=
    export BUILD_VARIANTS=normal
    export BUILT_PRODUCTS_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug
    export CACHE_ROOT=/var/folders/95/l3sszf7n5p9820l6hmr9mm080000gn/C/com.apple.DeveloperTools/6.1-6A1052d/Xcode
    export CCHROOT=/var/folders/95/l3sszf7n5p9820l6hmr9mm080000gn/C/com.apple.DeveloperTools/6.1-6A1052d/Xcode
    export CHMOD=/bin/chmod
    export CHOWN=/usr/sbin/chown
    export CLANG_CXX_LIBRARY=libc++
    export CLANG_LINK_OBJC_RUNTIME=NO
    export CLANG_OBJC_RUNTIME=NO
    export CLASS_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/JavaClasses
    export CLEAN_PRECOMPS=YES
    export CLONE_HEADERS=NO
    export CODESIGNING_FOLDER_PATH=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug/libobjc.A.dylib
    export CODE_SIGNING_ALLOWED=YES
    export COLOR_DIAGNOSTICS=NO
    export COMBINE_HIDPI_IMAGES=NO
    export COMMAND_MODE=legacy
    export COMPOSITE_SDK_DIRS=/var/folders/95/l3sszf7n5p9820l6hmr9mm080000gn/C/com.apple.DeveloperTools/6.1-6A1052d/Xcode/CompositeSDKs
    export CONFIGURATION=Debug
    export CONFIGURATION_BUILD_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug
    export CONFIGURATION_TEMP_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug
    export COPYING_PRESERVES_HFS_DATA=NO
    export COPY_PHASE_STRIP=NO
    export COPY_RESOURCES_FROM_STATIC_FRAMEWORKS=YES
    export CP=/bin/cp
    export CREATE_INFOPLIST_SECTION_IN_BINARY=NO
    export CURRENT_ARCH=x86_64
    export CURRENT_VARIANT=normal
    export DEAD_CODE_STRIPPING=NO
    export DEBUGGING_SYMBOLS=YES
    export DEBUG_INFORMATION_FORMAT=dwarf
    export DEFAULT_COMPILER=com.apple.compilers.llvm.clang.1_0
    export DEFAULT_KEXT_INSTALL_PATH=/Library/Extensions
    export DEFINES_MODULE=NO
    export DEPLOYMENT_LOCATION=NO
    export DEPLOYMENT_POSTPROCESSING=NO
    export DERIVED_FILES_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/DerivedSources
    export DERIVED_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/DerivedSources
    export DERIVED_SOURCES_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/DerivedSources
    export DEVELOPER_APPLICATIONS_DIR=/Applications/Xcode.app/Contents/Developer/Applications
    export DEVELOPER_BIN_DIR=/Applications/Xcode.app/Contents/Developer/usr/bin
    export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
    export DEVELOPER_FRAMEWORKS_DIR=/Applications/Xcode.app/Contents/Developer/Library/Frameworks
    export DEVELOPER_FRAMEWORKS_DIR_QUOTED=/Applications/Xcode.app/Contents/Developer/Library/Frameworks
    export DEVELOPER_LIBRARY_DIR=/Applications/Xcode.app/Contents/Developer/Library
    export DEVELOPER_SDK_DIR=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs
    export DEVELOPER_TOOLS_DIR=/Applications/Xcode.app/Contents/Developer/Tools
    export DEVELOPER_USR_DIR=/Applications/Xcode.app/Contents/Developer/usr
    export DEVELOPMENT_LANGUAGE=English
    export DO_HEADER_SCANNING_IN_JAM=NO
    export DSTROOT=/tmp/objc.dst
    export DT_TOOLCHAIN_DIR=/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain
    export DWARF_DSYM_FILE_NAME=libobjc.A.dylib.dSYM
    export DWARF_DSYM_FILE_SHOULD_ACCOMPANY_PRODUCT=NO
    export DWARF_DSYM_FOLDER_PATH=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug
    export DYLIB_COMPATIBILITY_VERSION=1
    export DYLIB_CURRENT_VERSION=228
    export DYLIB_INSTALL_NAME_BASE=/usr/lib
    export EMBEDDED_CONTENT_CONTAINS_SWIFT=NO
    export EMBEDDED_PROFILE_NAME=embedded.provisionprofile
    export ENABLE_HEADER_DEPENDENCIES=YES
    export EXCLUDED_INSTALLSRC_SUBDIRECTORY_PATTERNS=".DS_Store .svn .git .hg CVS"
    export EXCLUDED_RECURSIVE_SEARCH_PATH_SUBDIRECTORIES="*.nib *.lproj *.framework *.gch (*) .DS_Store CVS .svn .git .hg *.xcodeproj *.xcode *.pbproj *.pbxproj"
    export EXECUTABLE_EXTENSION=dylib
    export EXECUTABLE_NAME=libobjc.A.dylib
    export EXECUTABLE_PATH=libobjc.A.dylib
    export EXECUTABLE_PREFIX=lib
    export EXECUTABLE_SUFFIX=.dylib
    export EXPANDED_CODE_SIGN_IDENTITY=
    export EXPANDED_CODE_SIGN_IDENTITY_NAME=
    export EXPANDED_PROVISIONING_PROFILE=
    export FILE_LIST=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/Objects/LinkFileList
    export FIXED_FILES_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/FixedFiles
    export FRAMEWORK_FLAG_PREFIX=-framework
    export FRAMEWORK_SEARCH_PATHS="/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug "
    export FRAMEWORK_VERSION=A
    export FULL_PRODUCT_NAME=libobjc.A.dylib
    export GCC3_VERSION=3.3
    export GCC_CW_ASM_SYNTAX=NO
    export GCC_DYNAMIC_NO_PIC=NO
    export GCC_ENABLE_CPP_EXCEPTIONS=NO
    export GCC_ENABLE_CPP_RTTI=NO
    export GCC_INLINES_ARE_PRIVATE_EXTERN=YES
    export GCC_MODEL_TUNING=G5
    export GCC_OPTIMIZATION_LEVEL=0
    export GCC_PFE_FILE_C_DIALECTS="c objective-c c++ objective-c++"
    export GCC_PREPROCESSOR_DEFINITIONS="OS_OBJECT_USE_OBJC=0 LIBC_NO_LIBCRASHREPORTERCLIENT"
    export GCC_STRICT_ALIASING=YES
    export GCC_SYMBOLS_PRIVATE_EXTERN=YES
    export GCC_THREADSAFE_STATICS=NO
    export GCC_TREAT_WARNINGS_AS_ERRORS=NO
    export GCC_VERSION=com.apple.compilers.llvm.clang.1_0
    export GCC_VERSION_IDENTIFIER=com_apple_compilers_llvm_clang_1_0
    export GCC_WARN_64_TO_32_BIT_CONVERSION=YES
    export GCC_WARN_ABOUT_DEPRECATED_FUNCTIONS=NO
    export GCC_WARN_ABOUT_MISSING_NEWLINE=YES
    export GCC_WARN_ABOUT_RETURN_TYPE=YES
    export GCC_WARN_SHADOW=YES
    export GCC_WARN_UNUSED_VARIABLE=YES
    export GENERATE_MASTER_OBJECT_FILE=NO
    export GENERATE_PKGINFO_FILE=NO
    export GENERATE_PROFILING_CODE=NO
    export GID=20
    export GROUP=staff
    export HEADERMAP_INCLUDES_FLAT_ENTRIES_FOR_TARGET_BEING_BUILT=YES
    export HEADERMAP_INCLUDES_FRAMEWORK_ENTRIES_FOR_ALL_PRODUCT_TYPES=YES
    export HEADERMAP_INCLUDES_NONPUBLIC_NONPRIVATE_HEADERS=YES
    export HEADERMAP_INCLUDES_PROJECT_HEADERS=YES
    export HEADERMAP_USES_FRAMEWORK_PREFIX_ENTRIES=YES
    export HEADERMAP_USES_VFS=NO
    export HEADER_SEARCH_PATHS="/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug/include /tmp/objc.dst/usr/include/** /tmp/objc.dst/usr/local/include/** /Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug/usr/include/** /Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug/usr/local/include/** /Volumes/ramdisk/objc4-532.2/include"
    export ICONV=/usr/bin/iconv
    export INFOPLIST_EXPAND_BUILD_SETTINGS=YES
    export INFOPLIST_OUTPUT_FORMAT=same-as-input
    export INFOPLIST_PREPROCESS=NO
    export INSTALL_DIR=/tmp/objc.dst/usr/lib
    export INSTALL_GROUP=staff
    export INSTALL_MODE_FLAG=u+w,go-w,a+rX
    export INSTALL_OWNER=zenith
    export INSTALL_PATH=/usr/lib
    export INSTALL_ROOT=/tmp/objc.dst
    export JAVAC_DEFAULT_FLAGS="-J-Xms64m -J-XX:NewSize=4M -J-Dfile.encoding=UTF8"
    export JAVA_APP_STUB=/System/Library/Frameworks/JavaVM.framework/Resources/MacOS/JavaApplicationStub
    export JAVA_ARCHIVE_CLASSES=YES
    export JAVA_ARCHIVE_TYPE=JAR
    export JAVA_COMPILER=/usr/bin/javac
    export JAVA_FRAMEWORK_RESOURCES_DIRS=Resources
    export JAVA_JAR_FLAGS=cv
    export JAVA_SOURCE_SUBDIR=.
    export JAVA_USE_DEPENDENCIES=YES
    export JAVA_ZIP_FLAGS=-urg
    export JIKES_DEFAULT_FLAGS="+E +OLDCSO"
    export KEEP_PRIVATE_EXTERNS=NO
    export LD_DEPENDENCY_INFO_FILE=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/Objects-normal/x86_64/objc.A_dependency_info.dat
    export LD_DYLIB_INSTALL_NAME=/usr/lib/libobjc.A.dylib
    export LD_GENERATE_MAP_FILE=NO
    export LD_MAP_FILE_PATH=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/objc.A-LinkMap-normal-x86_64.txt
    export LD_NO_PIE=NO
    export LD_QUOTE_LINKER_ARGUMENTS_FOR_COMPILER_DRIVER=YES
    export LEGACY_DEVELOPER_DIR=/Applications/Xcode.app/Contents/PlugIns/Xcode3Core.ideplugin/Contents/SharedSupport/Developer
    export LEX=lex
    export LIBRARY_FLAG_NOSPACE=YES
    export LIBRARY_FLAG_PREFIX=-l
    export LIBRARY_KEXT_INSTALL_PATH=/Library/Extensions
    export LIBRARY_SEARCH_PATHS="/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug "
    export LINKER_DISPLAYS_MANGLED_NAMES=NO
    export LINK_FILE_LIST_normal_x86_64=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/Objects-normal/x86_64/objc.A.LinkFileList
    export LINK_WITH_STANDARD_LIBRARIES=YES
    export LOCAL_ADMIN_APPS_DIR=/Applications/Utilities
    export LOCAL_APPS_DIR=/Applications
    export LOCAL_DEVELOPER_DIR=/Library/Developer
    export LOCAL_LIBRARY_DIR=/Library
    export MACH_O_TYPE=mh_dylib
    export MACOSX_DEPLOYMENT_TARGET=10.10
    export MAC_OS_X_PRODUCT_BUILD_VERSION=14A379a
    export MAC_OS_X_VERSION_ACTUAL=101000
    export MAC_OS_X_VERSION_MAJOR=101000
    export MAC_OS_X_VERSION_MINOR=1000
    export MODULE_CACHE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/ModuleCache
    export NATIVE_ARCH=i386
    export NATIVE_ARCH_32_BIT=i386
    export NATIVE_ARCH_64_BIT=x86_64
    export NATIVE_ARCH_ACTUAL=x86_64
    export NO_COMMON=YES
    export OBJECT_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/Objects
    export OBJECT_FILE_DIR_normal=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/Objects-normal
    export OBJROOT=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates
    export ONLY_ACTIVE_ARCH=NO
    export OPTIMIZATION_LEVEL=0
    export ORDER_FILE=libobjc.order
    export OS=MACOS
    export OSAC=/usr/bin/osacompile
    export OTHER_CFLAGS="-fdollars-in-identifiers "
    export OTHER_CPLUSPLUSFLAGS="-fdollars-in-identifiers "
    export OTHER_LDFLAGS="-lauto -lc++abi"
    export PACKAGE_TYPE=com.apple.package-type.mach-o-dylib
    export PASCAL_STRINGS=YES
    export PATH="/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin:/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/libexec:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/usr/bin:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/usr/local/bin:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/usr/bin:/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/usr/local/bin:/Applications/Xcode.app/Contents/Developer/usr/bin:/Applications/Xcode.app/Contents/Developer/usr/local/bin:/Applications/Xcode.app/Contents/Developer/Tools:/usr/bin:/bin:/usr/sbin:/sbin"
    export PATH_PREFIXES_EXCLUDED_FROM_HEADER_DEPENDENCIES="/usr/include /usr/local/include /System/Library/Frameworks /System/Library/PrivateFrameworks /Applications/Xcode.app/Contents/Developer/Headers /Applications/Xcode.app/Contents/Developer/SDKs /Applications/Xcode.app/Contents/Developer/Platforms"
    export PFE_FILE_C_DIALECTS="objective-c objective-c++"
    export PKGINFO_FILE_PATH=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/PkgInfo
    export PLATFORM_DEVELOPER_APPLICATIONS_DIR=/Applications/Xcode.app/Contents/Developer/Applications
    export PLATFORM_DEVELOPER_BIN_DIR=/Applications/Xcode.app/Contents/Developer/usr/bin
    export PLATFORM_DEVELOPER_LIBRARY_DIR=/Applications/Xcode.app/Contents/Developer/Library
    export PLATFORM_DEVELOPER_SDK_DIR=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs
    export PLATFORM_DEVELOPER_TOOLS_DIR=/Applications/Xcode.app/Contents/Developer/Tools
    export PLATFORM_DEVELOPER_USR_DIR=/Applications/Xcode.app/Contents/Developer/usr
    export PLATFORM_DIR=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform
    export PLATFORM_NAME=macosx
    export PLATFORM_PREFERRED_ARCH=x86_64
    export PLATFORM_PRODUCT_BUILD_VERSION=6A1052d
    export PLIST_FILE_OUTPUT_FORMAT=same-as-input
    export PRECOMPS_INCLUDE_HEADERS_FROM_BUILT_PRODUCTS_DIR=YES
    export PRECOMP_DESTINATION_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/PrefixHeaders
    export PRESERVE_DEAD_CODE_INITS_AND_TERMS=NO
    export PRIVATE_HEADERS_FOLDER_PATH=/usr/local/include/objc
    export PRODUCT_MODULE_NAME=objc_A
    export PRODUCT_NAME=objc.A
    export PRODUCT_SETTINGS_PATH=
    export PRODUCT_TYPE=com.apple.product-type.library.dynamic
    export PROFILING_CODE=NO
    export PROJECT=objc
    export PROJECT_DERIVED_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/DerivedSources
    export PROJECT_DIR=/Volumes/ramdisk/objc4-532.2
    export PROJECT_FILE_PATH=/Volumes/ramdisk/objc4-532.2/objc.xcodeproj
    export PROJECT_NAME=objc
    export PROJECT_TEMP_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build
    export PROJECT_TEMP_ROOT=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates
    export PUBLIC_HEADERS_FOLDER_PATH=/usr/include/objc
    export RECURSIVE_SEARCH_PATHS_FOLLOW_SYMLINKS=YES
    export REMOVE_CVS_FROM_RESOURCES=YES
    export REMOVE_GIT_FROM_RESOURCES=YES
    export REMOVE_HEADERS_FROM_EMBEDDED_BUNDLES=YES
    export REMOVE_HG_FROM_RESOURCES=YES
    export REMOVE_SVN_FROM_RESOURCES=YES
    export REZ_COLLECTOR_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/ResourceManagerResources
    export REZ_EXECUTABLE=YES
    export REZ_OBJECTS_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build/ResourceManagerResources/Objects
    export REZ_SEARCH_PATHS="/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug "
    export SCAN_ALL_SOURCE_FILES_FOR_INCLUDES=NO
    export SCRIPT_INPUT_FILE_COUNT=0
    export SCRIPT_OUTPUT_FILE_COUNT=0
    export SDKROOT=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk
    export SDK_DIR=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk
    export SDK_NAME=macosx10.10
    export SDK_PRODUCT_BUILD_VERSION=14A382
    export SED=/usr/bin/sed
    export SEPARATE_STRIP=NO
    export SEPARATE_SYMBOL_EDIT=NO
    export SET_DIR_MODE_OWNER_GROUP=YES
    export SET_FILE_MODE_OWNER_GROUP=NO
    export SHALLOW_BUNDLE=NO
    export SHARED_DERIVED_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug/DerivedSources
    export SHARED_PRECOMPS_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/PrecompiledHeaders
    export SKIP_INSTALL=NO
    export SOURCE_ROOT=/Volumes/ramdisk/objc4-532.2
    export SRCROOT=/Volumes/ramdisk/objc4-532.2
    export STANDARD_C_PLUS_PLUS_LIBRARY_TYPE=dynamic
    export STRINGS_FILE_OUTPUT_ENCODING=UTF-16
    export STRIP_INSTALLED_PRODUCT=YES
    export STRIP_STYLE=all
    export SUPPORTED_PLATFORMS=macosx
    export SYMROOT=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products
    export SYSTEM_ADMIN_APPS_DIR=/Applications/Utilities
    export SYSTEM_APPS_DIR=/Applications
    export SYSTEM_CORE_SERVICES_DIR=/System/Library/CoreServices
    export SYSTEM_DEMOS_DIR=/Applications/Extras
    export SYSTEM_DEVELOPER_APPS_DIR=/Applications/Xcode.app/Contents/Developer/Applications
    export SYSTEM_DEVELOPER_BIN_DIR=/Applications/Xcode.app/Contents/Developer/usr/bin
    export SYSTEM_DEVELOPER_DEMOS_DIR="/Applications/Xcode.app/Contents/Developer/Applications/Utilities/Built Examples"
    export SYSTEM_DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
    export SYSTEM_DEVELOPER_DOC_DIR="/Applications/Xcode.app/Contents/Developer/ADC Reference Library"
    export SYSTEM_DEVELOPER_GRAPHICS_TOOLS_DIR="/Applications/Xcode.app/Contents/Developer/Applications/Graphics Tools"
    export SYSTEM_DEVELOPER_JAVA_TOOLS_DIR="/Applications/Xcode.app/Contents/Developer/Applications/Java Tools"
    export SYSTEM_DEVELOPER_PERFORMANCE_TOOLS_DIR="/Applications/Xcode.app/Contents/Developer/Applications/Performance Tools"
    export SYSTEM_DEVELOPER_RELEASENOTES_DIR="/Applications/Xcode.app/Contents/Developer/ADC Reference Library/releasenotes"
    export SYSTEM_DEVELOPER_TOOLS=/Applications/Xcode.app/Contents/Developer/Tools
    export SYSTEM_DEVELOPER_TOOLS_DOC_DIR="/Applications/Xcode.app/Contents/Developer/ADC Reference Library/documentation/DeveloperTools"
    export SYSTEM_DEVELOPER_TOOLS_RELEASENOTES_DIR="/Applications/Xcode.app/Contents/Developer/ADC Reference Library/releasenotes/DeveloperTools"
    export SYSTEM_DEVELOPER_USR_DIR=/Applications/Xcode.app/Contents/Developer/usr
    export SYSTEM_DEVELOPER_UTILITIES_DIR=/Applications/Xcode.app/Contents/Developer/Applications/Utilities
    export SYSTEM_DOCUMENTATION_DIR=/Library/Documentation
    export SYSTEM_KEXT_INSTALL_PATH=/System/Library/Extensions
    export SYSTEM_LIBRARY_DIR=/System/Library
    export TARGETNAME=objc
    export TARGET_BUILD_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Products/Debug
    export TARGET_NAME=objc
    export TARGET_TEMP_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build
    export TEMP_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build
    export TEMP_FILES_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build
    export TEMP_FILE_DIR=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates/objc.build/Debug/objc.build
    export TEMP_ROOT=/Users/zenith/Library/Developer/Xcode/DerivedData/objc-bvslyvohclgsoaekhnplywukxiin/Build/Intermediates
    export TOOLCHAINS=com.apple.dt.toolchain.XcodeDefault
    export TREAT_MISSING_BASELINES_AS_TEST_FAILURES=NO
    export UID=501
    export UNEXPORTED_SYMBOLS_FILE=unexported_symbols
    export UNSTRIPPED_PRODUCT=NO
    export USER=zenith
    export USER_APPS_DIR=/Users/zenith/Applications
    export USER_LIBRARY_DIR=/Users/zenith/Library
    export USE_DYNAMIC_NO_PIC=YES
    export USE_HEADERMAP=YES
    export USE_HEADER_SYMLINKS=NO
    export VALIDATE_PRODUCT=NO
    export VALID_ARCHS=x86_64
    export VERBOSE_PBXCP=NO
    export VERSION_INFO_BUILDER=zenith
    export VERSION_INFO_FILE=objc.A_vers.c
    export VERSION_INFO_STRING="\"@(#)PROGRAM:objc.A  PROJECT:objc-\""
    export WARNING_CFLAGS="-Wall -Wextra -Wstrict-aliasing=2 -Wstrict-overflow=4 -Wno-unused-parameter -Wno-deprecated-objc-isa-usage"
    export XCODE_APP_SUPPORT_DIR=/Applications/Xcode.app/Contents/Developer/Library/Xcode
    export XCODE_PRODUCT_BUILD_VERSION=6A1052d
    export XCODE_VERSION_ACTUAL=0610
    export XCODE_VERSION_MAJOR=0600
    export XCODE_VERSION_MINOR=0610
    export XPCSERVICES_FOLDER_PATH=/XPCServices
    export YACC=yacc
    export arch=x86_64
    export variant=normal