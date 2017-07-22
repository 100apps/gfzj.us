零散的东西，不用写文章，随便记记

# Photoshop 插件

master~$ defaults find  com.adobe.CSXS
Found 1 keys in domain 'com.adobe.CSXS.7': {
    LogLevel = 1;
}
Found 1 keys in domain 'com.adobe.CSXS.6': {
    LogLevel = 1;
}

http://nullice.com/archives/1665
http://nullice.com/archives/1822

# macOS 连接VPN
<https://github.com/openconnect/openconnect-gui/releases>
<https://gist.github.com/moklett/3170636>
```
brew install openconnect
install [TunTap](http://tuntaposx.sourceforge.net/)
wget http://git.infradead.org/users/dwmw2/vpnc-scripts.git/blob_plain/HEAD:/vpnc-script
sudo cp vpnc-script /etc/vpnc/vpnc-script
sudo openconnect -u xxxx --script=/etc/vpnc/vpnc-script --no-dtls vpn.alibaba-inc.com
```


# android 无源码 debug

adb -s ZX1G22CGRH shell am start -D -S -W com.superlib/com.fanzhou.ui.MainActivity;adb -s ZX1G22CGRH forward tcp:5005 jdwp:`adb -s ZX1G22CGRH shell ps | grep com.superlib|awk '{print $2}'`
