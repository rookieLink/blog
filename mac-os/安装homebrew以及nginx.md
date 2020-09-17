## 安装脚本
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"\
```

## 卸载脚本
```
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

## 通过brew安装nginx
```
brew install nginx
```

### 查看nginx安装信息
```
sudo brew info nginx
```

### 启动nginx
```
nginx
```

### nginx重启
```
nginx -s reload
```
上面的不行试下面这句
```
brew services restart nginx
```

### 停止nginx
```
nginx -s stop
```