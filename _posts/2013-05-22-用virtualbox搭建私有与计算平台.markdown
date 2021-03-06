---
layout: post
title: "用virtualbox搭建私有与计算平台"
date: 2013-05-22 18:59:17
category: tech
by: gf
keyword: virtualBox,vboxmange
description: virtualBox是一个非常好用的虚拟机软件，而且还跨平台，以前用过的都是桌面版，现在有一台ubuntuserver，没有安装图形界面，google了一下，果然可以。效果和ec2或者linodevps差不多。
permalink: /tech/75.html
---
[virtualBox][]是一个非常好用的虚拟机软件，而且还跨平台，以前用过的都是桌面版，现在有一台ubuntu server，没有安装图形界面，google了一下，果然可以。效果和ec2或者linode vps差不多。再加上一个控制面板，估计就差不多了。

ubuntu server 下安装的话，可以下载最新版 [https://www.virtualbox.org/wiki/Linux\_Downloads][https_www.virtualbox.org_wiki_Linux_Downloads]。然后安装就可以了。出现问题及时google。现在各种教程太多了。

然后安装扩展Oracle VM VirtualBox Extension Pack

    vboxmanage install extpack xxx.vbox-extpack

下面开始从ubuntu-13.04-server-amd64.iso镜像创建一个虚拟机

    #创建一个虚拟机
    vboxmanage createvm --name ubuntu1304 --ostype Ubuntu_64 --register
    #编辑一下基本配置
    vboxmanage modifyvm ubuntu1304 --memory 512 --cpus 1 --acpi on --bioslogoimagepath /home/zenith/logo.bmp --boot1 dvd
    #创建一个虚拟硬盘
    vboxmanage createhd --filename /home/zenith/ubuntu1304.vdi --size 20000
    #创建一个storagectl，来挂载硬盘和光盘
    vboxmanage storagectl ubuntu1304 --name "IDE Controller" --add ide --bootable on
    #挂载硬盘
    vboxmanage storageattach ubuntu1304 --storagectl "IDE Controller" --port 0 --device 0 --type hdd --medium /home/zenith/ubuntu1304.vdi
    #挂载光盘
    vboxmanage storageattach ubuntu1304 --storagectl "IDE Controller" --port 0 --device 1 --type dvddrive --medium /home/zenith/ubuntu-13.04-server-amd64.iso
    #开启虚拟机。通过远程桌面连接安装系统
    VBoxHeadless -s ubuntu1 -e TCP/Ports=9001
    #安装完成以后。删除光驱
    vboxmanage storageattach ubuntu1304 --storagectl "IDE Controller" --port 0 --device 1 --type dvddrive --medium none
    #端口映射
    vboxmanage modifyvm ubuntu1304 --natpf1 guestssh,tcp,,2000,,22
    #删除端口映射
    vboxmanage modifyvm ubuntu1304 --natpf1 delete guestssh
    #克隆
    vboxmanage clonevm ubuntu1304 --name ubuntu1 --register

这样就可以了。对于克隆的linux虚拟机，启动的时候，连不上网。需要更改/etc/udev/rules.d/70-persistent-net.rules文件。把eth0那一行删了。然后把eth1改成eth0.重启即可。可能是因为虚拟机clone，mac地址换了，所以ubuntu linux识别出一个新网卡的原因。

vboxmanage命令比较强大。当然，可以直接编辑.vbox文件，但是正如看到的，vbox头部已经说明了：

    ** DO NOT EDIT THIS FILE.
    ** If you make changes to this file while any VirtualBox related application
    ** is running, your changes will be overwritten later, without taking effect.
    ** Use VBoxManage or the VirtualBox Manager GUI to make changes.

一开始觉得vboxmange命令太麻烦了，走一遍就熟悉了。当然，官方文档是最好的参考: [http://www.virtualbox.org/manual/ch08.html][http_www.virtualbox.org_manual_ch08.html]。不知道这个文档是否有中文版，有时间的话，可以抽空翻译一个。

在google code上发现一个用php写的virtualBox GUI的东西: [https://code.google.com/p/phpvirtualbox/][https_code.google.com_p_phpvirtualbox]。还没试用，看着不错。不错既然有ssh控制宿主机了。gui也无所谓了。

现在运行的是安装好一个系统，然后保存着，需要的话，直接vmclone出来一个新的，使用。很方便，跟ec2或者linode vps效果差不多。

#  # FAQ ##

#  ## 安装完系统,如何移除虚拟机光驱? ###

    vboxmanage showvminfo xp1
    找到光驱的位置，比如IDE Controller (0, 1):
    vboxmanage storageattach "windows xp" --storagectl "IDE Controller" --port 1 --device 0 --medium none

#  ## vboxheadless -s 启动以后，用远程桌面链接，感觉鼠标不同步，怎么解决? ###

没有安装扩展包。先去官网下载对应操作系统的扩展包，比如 **VBoxGuestAdditions\_4.2.12.iso**，然后挂载，进入客户机，安装，重启。

#  ## 如何更改客户机BIOS启动logo? ###

vboxmange确实提供了这个设置。搜索bioslogoimagepath。

#  ## 远程桌面连接，黏贴板不同步 ###

vmboxmange设置:

    [--clipboard disabled|hosttoguest|guesttohost|bidirectional]

#  # update2014年04月28日17:36:11 ##

virutalbox可以挂在整个物理硬盘，配合usb转hdd的工具，装系统之类的就会方便很多。注意苹果下面sudo。还有别让mac自动挂载。

    VBoxManage internalcommands createrawvmdk -filename /path/to/file.vmdk
         -rawdisk /dev/sdf

#  ## vboxmanage命令的help ###

    Oracle VM VirtualBox Command Line Management Interface Version 4.2.12
    (C) 2005-2013 Oracle Corporation
    All rights reserved.
    
    Usage:
    
      VBoxManage [<general option>] <command>
     
     
    General Options:
     
      [-v|--version]            print version number and exit
      [-q|--nologo]             suppress the logo
      [--settingspw <pw>]       provide the settings password
      [--settingspwfile <file>] provide a file containing the settings password
     
     
    Commands:
     
      list [--long|-l]          vms|runningvms|ostypes|hostdvds|hostfloppies|
                                bridgedifs|hostonlyifs|dhcpservers|hostinfo|
                                hostcpuids|hddbackends|hdds|dvds|floppies|
                                usbhost|usbfilters|systemproperties|extpacks|
                                groups
    
      showvminfo                <uuid>|<name> [--details]
                                [--machinereadable]
      showvminfo                <uuid>|<name> --log <idx>
    
      registervm                <filename>
    
      unregistervm              <uuid>|<name> [--delete]
    
      createvm                  --name <name>
                                [--groups <group>, ...]
                                [--ostype <ostype>]
                                [--register]
                                [--basefolder <path>]
                                [--uuid <uuid>]
    
      modifyvm                  <uuid|name>
                                [--name <name>]
                                [--groups <group>, ...]
                                [--ostype <ostype>]
                                [--memory <memorysize in MB>]
                                [--pagefusion on|off]
                                [--vram <vramsize in MB>]
                                [--acpi on|off]
                                [--pciattach 03:04.0]
                                [--pciattach 03:04.0@02:01.0]
                                [--pcidetach 03:04.0]
                                [--ioapic on|off]
                                [--pae on|off]
                                [--hpet on|off]
                                [--hwvirtex on|off]
                                [--hwvirtexexcl on|off]
                                [--nestedpaging on|off]
                                [--largepages on|off]
                                [--vtxvpid on|off]
                                [--synthcpu on|off]
                                [--cpuidset <leaf> <eax> <ebx> <ecx> <edx>]
                                [--cpuidremove <leaf>]
                                [--cpuidremoveall]
                                [--hardwareuuid <uuid>]
                                [--cpus <number>]
                                [--cpuhotplug on|off]
                                [--plugcpu <id>]
                                [--unplugcpu <id>]
                                [--cpuexecutioncap <1-100>]
                                [--rtcuseutc on|off]
                                [--monitorcount <number>]
                                [--accelerate3d on|off]
                                [--accelerate2dvideo on|off]
                                [--firmware bios|efi|efi32|efi64]
                                [--chipset ich9|piix3]
                                [--bioslogofadein on|off]
                                [--bioslogofadeout on|off]
                                [--bioslogodisplaytime <msec>]
                                [--bioslogoimagepath <imagepath>]
                                [--biosbootmenu disabled|menuonly|messageandmenu]
                                [--biossystemtimeoffset <msec>]
                                [--biospxedebug on|off]
                                [--boot<1-4> none|floppy|dvd|disk|net>]
                                [--nic<1-N> none|null|nat|bridged|intnet|hostonly|
                                            generic]
                                [--nictype<1-N> Am79C970A|Am79C973|
                                                82540EM|82543GC|82545EM|
                                                virtio]
                                [--cableconnected<1-N> on|off]
                                [--nictrace<1-N> on|off]
                                [--nictracefile<1-N> <filename>]
                                [--nicproperty<1-N> name=[value]]
                                [--nicspeed<1-N> <kbps>]
                                [--nicbootprio<1-N> <priority>]
                                [--nicpromisc<1-N> deny|allow-vms|allow-all]
                                [--nicbandwidthgroup<1-N> none|<name>]
                                [--bridgeadapter<1-N> none|<devicename>]
                                [--hostonlyadapter<1-N> none|<devicename>]
                                [--intnet<1-N> <network name>]
                                [--natnet<1-N> <network>|default]
                                [--nicgenericdrv<1-N> <driver>
                                [--natsettings<1-N> [<mtu>],[<socksnd>],
                                                    [<sockrcv>],[<tcpsnd>],
                                                    [<tcprcv>]]
                                [--natpf<1-N> [<rulename>],tcp|udp,[<hostip>],
                                              <hostport>,[<guestip>],<guestport>]
                                [--natpf<1-N> delete <rulename>]
                                [--nattftpprefix<1-N> <prefix>]
                                [--nattftpfile<1-N> <file>]
                                [--nattftpserver<1-N> <ip>]
                                [--natbindip<1-N> <ip>
                                [--natdnspassdomain<1-N> on|off]
                                [--natdnsproxy<1-N> on|off]
                                [--natdnshostresolver<1-N> on|off]
                                [--nataliasmode<1-N> default|[log],[proxyonly],
                                                             [sameports]]
                                [--macaddress<1-N> auto|<mac>]
                                [--mouse ps2|usb|usbtablet
                                [--keyboard ps2|usb
                                [--uart<1-N> off|<I/O base> <IRQ>]
                                [--uartmode<1-N> disconnected|
                                                 server <pipe>|
                                                 client <pipe>|
                                                 file <file>|
                                                 <devicename>]
                                [--lpt<1-N> off|<I/O base> <IRQ>]
                                [--lptmode<1-N> <devicename>]
                                [--guestmemoryballoon <balloonsize in MB>]
                                [--audio none|null|oss|alsa|pulse]
                                [--audiocontroller ac97|hda|sb16]
                                [--clipboard disabled|hosttoguest|guesttohost|
                                             bidirectional]
                                [--draganddrop disabled|hosttoguest
                                [--vrde on|off]
                                [--vrdeextpack default|<name>
                                [--vrdeproperty <name=[value]>]
                                [--vrdeport <hostport>]
                                [--vrdeaddress <hostip>]
                                [--vrdeauthtype null|external|guest]
                                [--vrdeauthlibrary default|<name>
                                [--vrdemulticon on|off]
                                [--vrdereusecon on|off]
                                [--vrdevideochannel on|off]
                                [--vrdevideochannelquality <percent>]
                                [--usb on|off]
                                [--usbehci on|off]
                                [--snapshotfolder default|<path>]
                                [--teleporter on|off]
                                [--teleporterport <port>]
                                [--teleporteraddress <address|empty>
                                [--teleporterpassword <password>]
                                [--teleporterpasswordfile  <file>|stdin]
                                [--tracing-enabled on|off]
                                [--tracing-config <config-string>]
                                [--tracing-allow-vm-access on|off]
                                [--usbwebcam on|off]
                                [--usbcardreader on|off]
                                [--autostart-enabled on|off]
                                [--autostart-delay <seconds>]
    
      clonevm                   <uuid>|<name>
                                [--snapshot <uuid>|<name>]
                                [--mode machine|machineandchildren|all]
                                [--options link|keepallmacs|keepnatmacs|
                                           keepdisknames]
                                [--name <name>]
                                [--groups <group>, ...]
                                [--basefolder <basefolder>]
                                [--uuid <uuid>]
                                [--register]
    
      import                    <ovf/ova>
                                [--dry-run|-n]
                                [--options keepallmacs|keepnatmacs]
                                [more options]
                                (run with -n to have options displayed
                                 for a particular OVF)
    
      export                    <machines> --output|-o <name>.<ovf/ova>
                                [--legacy09|--ovf09|--ovf10|--ovf20]
                                [--manifest]
                                [--vsys <number of virtual system>]
                                        [--product <product name>]
                                        [--producturl <product url>]
                                        [--vendor <vendor name>]
                                        [--vendorurl <vendor url>]
                                        [--version <version info>]
                                        [--eula <license text>]
                                        [--eulafile <filename>]
    
      startvm                   <uuid>|<name>...
                                [--type gui|sdl|headless]
    
      controlvm                 <uuid>|<name>
                                pause|resume|reset|poweroff|savestate|
                                acpipowerbutton|acpisleepbutton|
                                keyboardputscancode <hex> [<hex> ...]|
                                setlinkstate<1-N> on|off |
                                nic<1-N> null|nat|bridged|intnet|hostonly|generic
                                         [<devicename>] |
                                nictrace<1-N> on|off |
                                nictracefile<1-N> <filename> |
                                nicproperty<1-N> name=[value] |
                                nicpromisc<1-N> deny|allow-vms|allow-all |
                                natpf<1-N> [<rulename>],tcp|udp,[<hostip>],
                                            <hostport>,[<guestip>],<guestport> |
                                natpf<1-N> delete <rulename> |
                                guestmemoryballoon <balloonsize in MB> |
                                usbattach <uuid>|<address> |
                                usbdetach <uuid>|<address> |
                                clipboard disabled|hosttoguest|guesttohost|
                                          bidirectional |
                                draganddrop disabled|hosttoguest |
                                vrde on|off |
                                vrdeport <port> |
                                vrdeproperty <name=[value]> |
                                vrdevideochannelquality <percent> |
                                setvideomodehint <xres> <yres> <bpp>
                                                [[<display>] [<enabled:yes|no> |
                                                  [<xorigin> <yorigin>]]] |
                                screenshotpng <file> [display] |
                                setcredentials <username>
                                               --passwordfile <file> | <password>
                                               <domain>
                                               [--allowlocallogon <yes|no>] |
                                teleport --host <name> --port <port>
                                         [--maxdowntime <msec>]
                                         [--passwordfile <file> |
                                          --password <password>] |
                                plugcpu <id> |
                                unplugcpu <id> |
                                cpuexecutioncap <1-100>
    
      discardstate              <uuid>|<name>
    
      adoptstate                <uuid>|<name> <state_file>
    
      snapshot                  <uuid>|<name>
                                take <name> [--description <desc>] [--pause] |
                                delete <uuid>|<name> |
                                restore <uuid>|<name> |
                                restorecurrent |
                                edit <uuid>|<name>|--current
                                     [--name <name>]
                                     [--description <desc>] |
                                list [--details|--machinereadable]
                                showvminfo <uuid>|<name>
    
      closemedium               disk|dvd|floppy <uuid>|<filename>
                                [--delete]
    
      storageattach             <uuid|vmname>
                                --storagectl <name>
                                [--port <number>]
                                [--device <number>]
                                [--type dvddrive|hdd|fdd]
                                [--medium none|emptydrive|additions|
                                          <uuid>|<filename>|host:<drive>|iscsi]
                                [--mtype normal|writethrough|immutable|shareable|
                                         readonly|multiattach]
                                [--comment <text>]
                                [--setuuid <uuid>]
                                [--setparentuuid <uuid>]
                                [--passthrough on|off]
                                [--tempeject on|off]
                                [--nonrotational on|off]
                                [--discard on|off]
                                [--bandwidthgroup <name>]
                                [--forceunmount]
                                [--server <name>|<ip>]
                                [--target <target>]
                                [--tport <port>]
                                [--lun <lun>]
                                [--encodedlun <lun>]
                                [--username <username>]
                                [--password <password>]
                                [--initiator <initiator>]
                                [--intnet]
    
      storagectl                <uuid|vmname>
                                --name <name>
                                [--add ide|sata|scsi|floppy|sas]
                                [--controller LSILogic|LSILogicSAS|BusLogic|
                                              IntelAHCI|PIIX3|PIIX4|ICH6|I82078]
                                [--sataportcount <1-30>]
                                [--hostiocache on|off]
                                [--bootable on|off]
                                [--remove]
    
      bandwidthctl              <uuid|vmname>
                                add <name> --type disk|network
                                    --limit <megabytes per second>[k|m|g|K|M|G] |
                                set <name>
                                    --limit <megabytes per second>[k|m|g|K|M|G] |
                                remove <name> |
                                list [--machinereadable]
                                (limit units: k=kilobit, m=megabit, g=gigabit,
                                              K=kilobyte, M=megabyte, G=gigabyte)
    
      showhdinfo                <uuid>|<filename>
    
      createhd                  --filename <filename>
                                [--size <megabytes>|--sizebyte <bytes>]
                                [--diffparent <uuid>|<filename>
                                [--format VDI|VMDK|VHD] (default: VDI)
                                [--variant Standard,Fixed,Split2G,Stream,ESX]
    
      modifyhd                  <uuid>|<filename>
                                [--type normal|writethrough|immutable|shareable|
                                        readonly|multiattach]
                                [--autoreset on|off]
                                [--compact]
                                [--resize <megabytes>|--resizebyte <bytes>]
    
      clonehd                   <uuid>|<filename> <uuid>|<outputfile>
                                [--format VDI|VMDK|VHD|RAW|<other>]
                                [--variant Standard,Fixed,Split2G,Stream,ESX]
                                [--existing]
    
      convertfromraw            <filename> <outputfile>
                                [--format VDI|VMDK|VHD]
                                [--variant Standard,Fixed,Split2G,Stream,ESX]
                                [--uuid <uuid>]
      convertfromraw            stdin <outputfile> <bytes>
                                [--format VDI|VMDK|VHD]
                                [--variant Standard,Fixed,Split2G,Stream,ESX]
                                [--uuid <uuid>]
    
      getextradata              global|<uuid>|<name>
                                <key>|enumerate
    
      setextradata              global|<uuid>|<name>
                                <key>
                                [<value>] (no value deletes key)
    
      setproperty               machinefolder default|<folder> |
                                vrdeauthlibrary default|<library> |
                                websrvauthlibrary default|null|<library> |
                                vrdeextpack null|<library> |
                                autostartdbpath null|<folder> |
                                loghistorycount <value>
    
      usbfilter                 add <index,0-N>
                                --target <uuid>|<name>|global
                                --name <string>
                                --action ignore|hold (global filters only)
                                [--active yes|no] (yes)
                                [--vendorid <XXXX>] (null)
                                [--productid <XXXX>] (null)
                                [--revision <IIFF>] (null)
                                [--manufacturer <string>] (null)
                                [--product <string>] (null)
                                [--remote yes|no] (null, VM filters only)
                                [--serialnumber <string>] (null)
                                [--maskedinterfaces <XXXXXXXX>]
    
      usbfilter                 modify <index,0-N>
                                --target <uuid>|<name>|global
                                [--name <string>]
                                [--action ignore|hold] (global filters only)
                                [--active yes|no]
                                [--vendorid <XXXX>|""]
                                [--productid <XXXX>|""]
                                [--revision <IIFF>|""]
                                [--manufacturer <string>|""]
                                [--product <string>|""]
                                [--remote yes|no] (null, VM filters only)
                                [--serialnumber <string>|""]
                                [--maskedinterfaces <XXXXXXXX>]
    
      usbfilter                 remove <index,0-N>
                                --target <uuid>|<name>|global
    
      sharedfolder              add <vmname>|<uuid>
                                --name <name> --hostpath <hostpath>
                                [--transient] [--readonly] [--automount]
    
      sharedfolder              remove <vmname>|<uuid>
                                --name <name> [--transient]
    
      guestproperty             get <vmname>|<uuid>
                                <property> [--verbose]
    
      guestproperty             set <vmname>|<uuid>
                                <property> [<value> [--flags <flags>]]
    
      guestproperty             enumerate <vmname>|<uuid>
                                [--patterns <patterns>]
    
      guestproperty             wait <vmname>|<uuid> <patterns>
                                [--timeout <msec>] [--fail-on-timeout]
    
      guestcontrol              <vmname>|<uuid>
                                exec[ute]
                                --image <path to program> --username <name>
                                [--passwordfile <file> | --password <password>]
                                [--domain <domain>] [--verbose] [--timeout <msec>]
                                [--environment "<NAME>=<VALUE> [<NAME>=<VALUE>]"]
                                [--wait-exit] [--wait-stdout] [--wait-stderr]
                                [--dos2unix] [--unix2dos]
                                [-- [<argument1>] ... [<argumentN>]]
    
                                copyfrom
                                <guest source> <host dest> --username <name>
                                [--passwordfile <file> | --password <password>]
                                [--domain <domain>] [--verbose]
                                [--dryrun] [--follow] [--recursive]
    
                                copyto|cp
                                <host source> <guest dest> --username <name>
                                [--passwordfile <file> | --password <password>]
                                [--domain <domain>] [--verbose]
                                [--dryrun] [--follow] [--recursive]
    
                                createdir[ectory]|mkdir|md
                                <guest directory>... --username <name>
                                [--passwordfile <file> | --password <password>]
                                [--domain <domain>] [--verbose]
                                [--parents] [--mode <mode>]
    
                                stat
                                <file>... --username <name>
                                [--passwordfile <file> | --password <password>]
                                [--domain <domain>] [--verbose]
    
                                updateadditions
                                [--source <guest additions .ISO>] [--verbose]
                                [--wait-start]
    
      debugvm                   <uuid>|<name>
                                dumpguestcore --filename <name> |
                                info <item> [args] |
                                injectnmi |
                                log [--release|--debug] <settings> ...|
                                logdest [--release|--debug] <settings> ...|
                                logflags [--release|--debug] <settings> ...|
                                osdetect |
                                osinfo |
                                getregisters [--cpu <id>] <reg>|all ... |
                                setregisters [--cpu <id>] <reg>=<value> ... |
                                show [--human-readable|--sh-export|--sh-eval|
                                      --cmd-set] 
                                    <logdbg-settings|logrel-settings>
                                    [[opt] what ...] |
                                statistics [--reset] [--pattern <pattern>]
                                [--descriptions]
    
      metrics                   list [*|host|<vmname> [<metric_list>]]
                                                     (comma-separated)
    
      metrics                   setup
                                [--period <seconds>] (default: 1)
                                [--samples <count>] (default: 1)
                                [--list]
                                [*|host|<vmname> [<metric_list>]]
    
      metrics                   query [*|host|<vmname> [<metric_list>]]
    
      metrics                   enable
                                [--list]
                                [*|host|<vmname> [<metric_list>]]
    
      metrics                   disable
                                [--list]
                                [*|host|<vmname> [<metric_list>]]
    
      metrics                   collect
                                [--period <seconds>] (default: 1)
                                [--samples <count>] (default: 1)
                                [--list]
                                [--detach]
                                [*|host|<vmname> [<metric_list>]]
    
      hostonlyif                ipconfig <name>
                                [--dhcp |
                                --ip<ipv4> [--netmask<ipv4> (def: 255.255.255.0)] |
                                --ipv6<ipv6> [--netmasklengthv6<length> (def: 64)]]
                                create |
                                remove <name>
    
      dhcpserver                add|modify --netname <network_name> |
                                           --ifname <hostonly_if_name>
                                [--ip <ip_address>
                                --netmask <network_mask>
                                --lowerip <lower_ip>
                                --upperip <upper_ip>]
                                [--enable | --disable]
    
      dhcpserver                remove --netname <network_name> |
                                       --ifname <hostonly_if_name>
    
      extpack                   install [--replace] <tarball> |
                                uninstall [--force] <name> |
                                cleanup


[virtualBox]: https://www.virtualbox.org/
[https_www.virtualbox.org_wiki_Linux_Downloads]: https://www.virtualbox.org/wiki/Linux_Downloads
[http_www.virtualbox.org_manual_ch08.html]: http://www.virtualbox.org/manual/ch08.html
[https_code.google.com_p_phpvirtualbox]: https://code.google.com/p/phpvirtualbox/
