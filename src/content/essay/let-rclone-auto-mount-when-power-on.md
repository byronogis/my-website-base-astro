---
update: 2023-04-29 17:23
title: 让 rclone 开机自动挂载
description: 让 rclone 开机自动挂载
date: 2023-04-29 17:15
tags:
  - rclone
  - linux
  - systemd
---

## 目录

## systemd 服务

### 创建/编辑服务文件

```bash
sudo vim /etc/systemd/system/rclone.service
```

### 编辑内容

```bash
[Unit]
Description=Rclone mount
Requires=network-online.target
After=network-online.target

[Service]
Type=simple
User=<username>
ExecStartPre=/bin/mkdir -p <local_dir>
ExecStart=/usr/bin/rclone mount --vfs-cache-mode full <remote>:<path> <local_dir>
ExecStop=/usr/bin/fusermount -u <local_dir>
ExecStopPost=/bin/rmdir <local_dir>
Restart=on-abort

[Install]
WantedBy=default.target
```

替换 `<username>`, `<remote>`, `<path>`, `<local_dir>`.

示例:

```bash
[Unit]
Description=Rclone mount
Requires=network-online.target
After=network-online.target

[Service]
Type=simple
User=liamrad
ExecStartPre=/bin/mkdir -p /home/liamrad/Desktop/obsidian_nutstore
ExecStart=/usr/bin/rclone mount --vfs-cache-mode full nutstore:/obsidian /home/liamrad/Desktop/obsidian_nutstore
ExecStop=/usr/bin/fusermount -u /home/liamrad/Desktop/obsidian_nutstore
ExecStopPost=/bin/rmdir /home/liamrad/Desktop/obsidian_nutstore
Restart=on-abort

[Install]
WantedBy=default.target
```

### 启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable rclone.service
sudo systemctl start rclone.service
```

