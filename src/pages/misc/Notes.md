---
layout: ../../layouts/BlogPost.astro
title: Notes
uuid: 8fb101c6-75f1-11ed-b774-9e6dd13ceda2
version: 388
created: Wed, 07 Dec 2022 05:39:40 +0000
tags:
- z-class/career
- y-type/resource
- x-status/publish/misc
---

### 该页记录平时遇到的问题和解决方法，仅供个人查阅使用

- **macOS Photos 4302 Error**

    - 按住Option + Command，在打开Photos，点击修复即可

- **git log显示中文**

    - git config --global core.quotepath off

- **maOS修改hostname命令**

    - sudo scutil –set HostName NEW_HOST_NAME

- **Kernel panic not syncing : System is deadlocked on memory**

    - 今天在升级虚拟机的ubuntu 22.04系统时，由于升级了内核，需要重启， 但重启后出现错误“Kernel panic not syncing : System is deadlocked on memory”，无法进入系统 原来的内存是512M，我加到了1G后，便可以顺利进入系统

- **macOS微信隐私修改**

    - 查找log文件 find \~/Library/Containers/com.tencent.xinWeChat -name "\*.xlog"

    - 然后进入上层文件夹log，赋予只读权限

    - sudo chown root:wheel  ./log

    - sudo chmod 400 ./log

- **bat / cmd / ps1 使用中文字符**

    - `chcp 65001`

- **MacOS 开启全速备份命令**

    - 打开终端，执行如下命令开启全速备份：\
sudo sysctl debug.lowpri_throttle_enabled=0\
关闭全速备份：\
sudo sysctl debug.lowpri_throttle_enabled=1

- **OpenVN客户端添加路由配置(流量分流)**

    - 修改ovpn文件，添加以下行：

    - route-nopull  ##不添加任何路由
\##route 192.168.1.0 255.255.255.0 net_gateway   #该网段走本地网络
route 10.0.0.0 255.0.0.0 vpn_gateway    #该网段走vpn网络

- **Linux vps vnc via ssh**

    - ref: [Guides - Deploying Kali Linux through the Linode Marketplace | Linode](https://www.linode.com/docs/products/tools/marketplace/guides/kali-linux#) 

    1.   `ssh -L 61000:localhost:5901 -N -l \[username\] \[remote linux ip\]`

    1. open VNC viewer client: `localhost:61000`

- **ImportError_ Could not import PIL.Image. The use of** `**array_to_img**`

    - 在用keras做练习时，导入图片，遇到了该错误： ImportError: Could not import PIL.Image. The use of array_to_img谷歌了一下，发现是没有安装pillow包，所以，补装上就行 conda install pillow

- **Windows下安装openai-gym**

    - 第一步 下载源文件 git clone https://github.com/openai/gym.git 第二步 进入下载好的gym文件中 cd gym 第三步 利用pip安装 pip install -e

- **Could not open static file**

    - 升级conda update即可

- **No module named 'bs4'**

    - 之前使用：conda install beautifulsoup4\
确认已经安装了正确的beautifulsoup4，对应py3版本\
在Ipython下也能正常import\
但是在jupyter-notebook下无法找到该模块\
解决方法：\
使用以下命令，查询当前的Kernel是否对应正确的路径\
import sys print(sys.path)\
我的环境正好是这个问题，所以重新运行命令，把环境导入到jupyter-notebook即可\
conda activate my_env #改为你的环境名\
conda install -y ipython jupyter ipykernel jupyter_nbextensions_configurator jupyter_contrib_nbextensions\
jupyter contrib nbextension install --user\
jupyter nbextensions_configurator enable --user\
python -m ipykernel install --user --name my_env\
完成

- **修改conda环境默认路径和缓存路径**

    - 找到“.condarc”,一般在用户目录下“C:\\Users\\XXX” 添加以下新配置：\
envs_dirs: ##默认环境路径

    - D:\\data\\xxx\\conda\\envs ##第一个为默认路径

    - C:\\Users\\xxx\\AppData\\Local\\conda\\conda\\envs ##按需求添加，也可只有默认路径\
pkgs_dirs: ##默认缓存路径

    - D:\\data\\xxx\\conda\\pkgs ##第一个为默认路径

    - C:\\Users\\xxx\\AppData\\Local\\conda\\conda\\pkgs

- **如何解除网页的右键限制**

    - ref: [Ask HN: How to disable right-click blocking in the browser | Hacker News (ycombinator.com)](https://news.ycombinator.com/item?id=32285459) 

    - 使用Firefox，输入"about:config"，搜索"dom.event.contextmenu.enabled"，双击设为False，完成

- **C语言学习路线**

    - 推荐书籍:\
C： C Primer Plus, C和指针，C专家编程\
基础四大件：\
数据结构和算法：大话数据结构，剑指offer，刷题。\
计算机网络：TCP/IP详解\
操作系统：深入理解操作系统\
设计模式：大话设计模式\
应用与编程实践：\
Linux：鸟哥的Linux私房菜 或 Linux就该这么学\
编译和调试工具材料：英语好的看GNU官方关于GCC和GDB的官方文档。中文版《debugging with gdb》,跟我一起写makefile\
Linux的环境编程：Unix环境高级编程 ，Linux高性能服务器编程，POSIX多线程程序设计\
《算法》第四版 红色\
《TCP/IP详解》\
《计算机网络 自顶向下》\
《MySQL必知必会》 涵盖 《SQL必知必会》的内容\
《重构 改善既有代码的设计》 需要一些经验，拔高内容

- **Docker普通用户运行权限问题**

    - 错误提示：\
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.40/version": dial unix /var/run/docker.sock: connect: permission denied\
问题：普通用户无权限允许docker,即使添加了用户和组依旧无法解决\
解决方法：\
sudo chmod 666 /var/run/docker.sock

- **Docker基础命令**

    - docker run ubuntu:latest /bin/echo "Hello World!"

    - docker run -i -t ubuntu:latest /bin/bash

        - t: 在新容器内指定一个伪终端或终端。

        - i: 允许你对容器内的标准输入 (STDIN) 进行交互。

    - docker ps\
查看正在运行的容器

    - docker logs \[容器名称或者ID\]\
查看容器的标准输出

    - docker stop 容器ID/名称

    - docker run -d -p 5000:5000 training/webapp python [app.py](http://app.py/) 

        - d: 让容器在后台运行。

        - p: 将容器内部使用的5000端口映射到我们使用的主机的5000端口上。

    - docker port 容器ID

    - docker top

    - docker inspect 容器ID

        - 查看 Docker容器 的底层信息

- **Git 不同repo使用不同key**

    - ref: [github - How to manage one only key per each git repository? - Stack Overflow](https://stackoverflow.com/questions/22768517/how-to-manage-one-only-key-per-each-git-repository) 

    - /.ssh/config\
`Host github1`\
\`  HostName github.com  User git  IdentityFile /.ssh/id_repo1\`

    - `Host github2`\
\`  HostName github.com  User git  IdentityFile \~/.ssh/id_repo2\`

    - nstead of using [git@gihub.com](git@gihub.com):user/repo1, you would use:\
`git@github1:user/repo1`

- **/dev/shm 内存设备,类似ramdisk**

- **centos-7防火墙设置**

    - iptables添加的规则貌似不生效\
需要使用firewall-cmd来创建规则才可以\
查看已经开放的端口：\
firewall-cmd --list-ports\
开启端口\
firewall-cmd --zone=public --add-port=80/tcp --permanent\
命令含义：\
–zone #作用域\
–add-port=80/tcp #添加端口，格式为：端口/通讯协议\
–permanent #永久生效，没有此参数重启后失效\
重启防火墙\
firewall-cmd --reload #重启firewall\
systemctl stop firewalld.service #停止firewall\
systemctl disable firewalld.service #禁止firewall开机启动firewall-cmd --state

- **efibootmgr添加启动项**

    - efibootmgr -c -w -L "BootOptionName" -d /dev/sdb -p 1 -l \\EFI\\Boot\\bootx64.efi\
\#我的启动分区所在的硬盘为/dev/sdb

- **friendlyWRT wifi无法开启**

    - ssh到friendlywrt

    - rm /etc/config/wireless #删除无线配置文件

    - wifi config > /etc/config/wireless #重建无线配置文件

    - vi /etc/config/wireless #删除或注释掉option disabled 1这句，没有就跳过

    - wifi up\
完成

- **Hash Sum mismatch 解决方案**

    - 在VM中的Kali linux，apt update的时候，出现Hash Sum mismatch问题，尝试了网上各种clean，删除list文件等方法，均无效。\
后来看到新的解决方案，该问题出在win10的虚拟机机制上 ，关掉即可，cmd管理员运行以下命令：\
bcdedit /set hypervisorlaunchtype off\
然后计算机重启，就可以了\
解决方案出处：[Reddit](https://www.reddit.com/r/Kalilinux/comments/h8o0xh/aptget_update_always_ends_up_in_hashsum_mismatch/) 

- **Kali linux安装bcm无线网卡**

    - apt-get update apt-get install linux-image-(*uname* − *r*|*sed*′*s*, \[−\] \* − \[−\] \* −,, ′)*linux* − *headers*−(uname -r|sed ‘s,\[^-\]*-\[^-\]*-,,’) broadcom-sta-dkms\
modprobe -r b44 b43 b43legacy ssb brcmsmac bcma modprobe wl reboot\
适配的网卡型号: Broadcom BCM4311, BCM4312, BCM4313, BCM4321, BCM4322, BCM43224, BCM43225, BCM43227, BCM43228, BCM43142, BCM4331, BCM4352, BCM4360 devices (wl)

- **LFS-7.7-学习注意事项**

    - 建议有一定的Linux基础和开发基础后再来学习LFS，比如至少达到RHCE水准，否则没什么收获

    - 宿主系统：centos 6.2 （kernel-2.6.32）

    - 虚拟机：VMware

    - 双硬盘

    - 安装后，启动ssh和关闭图形界面模式

    - 完成一小节就要快照一下

    - 后面编译阶段，一定要确保是lfs用户来编译的

- **Linux下cuda环境搭建，并激活GPU测试**

    - 本教程基于[官方教程](https://keras-cn.readthedocs.io/en/latest/for_beginners/keras_linux/)\
首先安装系统要安装一下包 nvidia nvidia-utils cuda\
然后基于Anaconda： conda install tensorflow-gpu，cudnn\
测试文件：[mnist_cnn.py](https://github.com/keras-team/keras/tree/master/examples/mnist_cnn.py)\
一般一个epoch 15秒以内 cpu的话就会很长

- **Linux搭建keras环境**

    - keras环境要求python>=2.7 <3.6 ##注意官方更新\
建议安装Anaconda，来建立环境，很方便的 本教程基于Anaconda\
创建一个名为keras的新环境 conda create -n keras python=3.6 激活keras环境 conda activate keras 安装相关包 conda install keras numpy pandas\
完成 如果你要在新的keras环境中激活jupyter notebook，可以查看：

- **conda环境激活Jupyter Notebook**

    - 首先进入你要激活的环境，比如：my_env conda activate my_env

    - 安装ipykernel conda install ipykernel

    - 激活 python -m ipykernel install --user --name my_env

    - 打开jupyter notebook 菜单栏kernel下，可以选择刚刚激活的环境

- **Ubuntu 18.04 修改开机启动级别**

    - 切换为图形模式\
sudo systemctl set-default graphical.target\
或者\
sudo systemctl set-default runlevel5.target\
切换为文本命令模式\
sudo systemctl set-default multi-user.target\
或者\
sudo systemctl set-default runlevel3.target\
直接启动图形界面\
systemctl start lightdm

- **Ubuntu 18.10开机出现Started Bpfilter**

    - 开机出现 Started Bpfilter\
这是18.10的bug，可以查看这个 [帖子](https://askubuntu.com/questions/1032639/ubuntu-18-04-stuck-in-boot-after-starting-gnome-display-manager-on-intel-graphic)\
初步判断是因为英伟达显卡驱动问题，\
解决方案有3种：

        - 卸载nvidia的驱动 

        - 可以换个桌面管理软件，比如安装切换到 lightdm 

        - 多次尝试重启即可

- **ubuntu删除无效的应用图标**

    - 一般安装的应用图标在： /usr/share/applications\
其他应用自动生成的图标在： ～/.local/share/applications\
找到你要删除的软件名.desktop文件即可

- **Linux创建swap分区**

    - 1.创建要作为swap分区的文件:增加1GB大小的交换分区，则命令写法如下，其中的count等于想要的块的数量（bs\*count=文件大小）。 dd if=/dev/zero of=/var/swapfile bs=1M count=1024\
2\.格式化为交换分区文件: mkswap /var/swapfile #建立swap的文件系统\
3\.启用交换分区文件: swapon /var/swapfile #启用swap文件\
4\.使系统开机时自启用，在文件/etc/fstab中添加一行： /var/swapfile swap swap defaults 0 0

- **命令行复制文件显示进度**

    - 方法一：scp命令（推荐）

        - scp -r /mnt root@127.0.0.1:/home (拷贝文件夹要加参数 -r，拷贝文件不需要)（显示拷贝速度、剩余时间、已拷贝大小、进度%，不显示总大小，一般速度为10M/s）

    - 方法二：rsync命令

        - rsync -av --progress /mnt /home（显示拷贝速度、剩余时间、已拷贝大小、进度%，不显示总大小，一般速度为300kb/s）

- **Linux 屏幕亮度配置文件**

    - **集成显卡：/sys/class/backlight/intel_backlight/brightness  改数值即可**

- **Linux 挂载img文件**

    - 首先查看空闲的loop\
losetup -f\
然后挂载\
losetup /dev/loop13 something.img\
kpartx -av /dev/loop13

    - mkdir /mnt/img\
mount /dev/mapper/loop13p1 /mnt/img\
注意：所有操作均在sudo下

- **Linux 有线网络和无线网络优先级问题**

    - 问题：有线连接内网服务器，无线连接外网，linux无法通过无线上网\
原因：因为有线的优先级更高，所以，系统默认走有线\
解决：

    - 利用 ip route命令修改默认路由：\
ip route default 0.0.0.0 dev wlan0\
ip route 10.0.0.0 dev eth0

    - 利用network管理器修改：\
打开网络管理器，修改有线端口的设置，选择ipv4选项卡，路由设置里，把“仅将此连接用于其网络上的资源”打勾即可\
注意：修改后，如果以后要通过有线上网，需要再改回来。避免麻烦，可以用网络管理器，创建一个新的连接

- **树莓派 鼠标延迟问题**

    - sd卡根目录，编辑cmdline.txt文件，添加：\
usbhid.mousepoll=0\
不要另起一行添加，直接空格添加到末尾即可\
重启解决。

- **pacman无法正常安装**

    - pacman在安装软件的时候，提示其他软件占用，无法安装 如果确定其他软件已经关闭了，还是无法解决的话 则只需删除以下文件即可 /var/lib/pacman/db.lck

- **VirtualBox无法打开虚拟机 rc=-1908**

    - 无法打开虚拟机，提示： virtualbox Kernel driver not installed (rc=-1908)\
解决方法很简单，只要启动vboxdrv即可 sudo modprobe vboxdrv

- **Virtualbox移机使用小记**

    - 因为目前我所有的虚拟机都放在固态的移动硬盘里，方便公司和家里都能用\
在公司都配置好后，用家里的电脑却打不开vbox文件，提示“different image”错误信息\
解决方案： 要先导入vdi硬盘文件，管理--》虚拟介质管理 在虚拟介质管理中，添加你要导入的所有的硬盘文件，如果有快照，也要把快照文件导入\
然后再打开vbox，就可以了

- **VMware-vmdk转vhd到Hyper-v**

    - 原文链接：[https://blogs.msdn.microsoft.com/timomta/2015/06/11/how-to-convert-a-vmware-vmdk-to-hyper-v-vhd/](https://blogs.msdn.microsoft.com/timomta/2015/06/11/how-to-convert-a-vmware-vmdk-to-hyper-v-vhd/)\
第一步，下载安装微软官方的[转换软件](http://www.microsoft.com/en-us/download/details.aspx?id=42497)\
第二步，管理员打开PowerShell，导入模块 Import-Module 'C:\\Program Files\\Microsoft Virtual Machine Converter\\MvmcCmdlet.psd1'\
第三步，使用命令开始转换，注意更改路径 ConvertTo-MvmcVirtualHardDisk -SourceLiteralPath d:\\scratch\\vmx\\VM-disk1.vmdk -VhdType DynamicHardDisk -VhdFormat vhdx -destination c:\\vm-disk1\
完成

- **手动安装python包**

    - 可以先从清华pip源下，下载对应的tar.gz包\
第一种方法：使用python\
1\.解压\
2\.python [setup.py](http://setup.py) build\
3\.python [setup.py](http://setup.py) install

    - 第二种方法:\
pip install name.tar.gz

- **Python venv 环境创建**

    - Create a project directory

    - Change into the project directory

    - Run

        - python3 -m venv <name_of_virtualenv>

        - source env/bin/activate

    - virtualenv -p /usr/bin/python2.7 env2.7

- **Windows LTSC版本安装应用商店**

    - 打开网址 https://store.rg-adguard.net/

    - 以 PackageFamilyName 方式搜索 Microsoft.WindowsStore_8wekyb3d8bbwe

    - 根据系统选择对应的包，每一种都要下载，x64和x86版本都要下载，appx格式的在下载目录按住 shift 键，然后鼠标右键，打开 Powershell执行安装命令

    - 安装该路径下所有包Add-AppxPackage

    - 此时点击开始菜单应该就能看到应用商店了