# 初入flutter
## 第一章（macos启动环境）

！！所有文档建议看英文官网，中文翻译过来会有偏差，并且会有滞后性  

flutter官网地址：https://flutter.dev/docs/get-started/install  
flutter中文网地址：https://flutterchina.club/  
dart官网地址：https://dart.dev/  
dart中文网地址： https://dart.cn/


按照官方文档配置开发环境  （各种配置不做赘述）

macOS安装地址：https://flutter.dev/docs/get-started/install/macos

前提，要安装好xcode，及flutter环境，具体看文档

### 运行步骤
进入到工程目录下，执行 ``` open ios/Runner.xcworkspace ```打开xcode默认工作区间  

运行```flutter run```跑项目

### 真机需要注意的问题：  
1、如果想运行到ios真机，需要在runner中登录开发者账号，自动生成签名（如果生成失败请做出调整，否则无法部署到真机）

2、想要运行到真机需要安装flutter插件，``` sudo gem install cocoapods ```

### 真机可能会遇到的问题：  
1、 签名报错
``` javascript
It appears that your application still contains the default signing identifier.
Try replacing 'com.example' with your signing id in Xcode:
  open ios/Runner.xcworkspace
  ```
原因：自动生成签名有问题  
解决：修改com.example以做调整

2、flutter版本低于真机运行版本报错
``` javascript
Error launching app. Try launching from within Xcode via:
    open ios/Runner.xcworkspace

Your Xcode version may be too old for your iOS version.
```
原因：flutter版本过低  
解决：运行``` flutter upgrade ```更新flutter版本，升级xcode版本
备注：如果xcode版本无法升级，请检查macos版本，及时升级更新到big sur， 然后就可以升级xcode

3、手机锁屏导致无法安装到真机
``` javascript
Your device is locked. Unlock your device first before running.
```
原因：手机屏幕锁屏  
解决：使手机屏幕始终保持在唤醒状态

##### 多说一句，flutter的热更新是真tmd快


## 具体跑项目
#### 1、创建app
##### 多种方式，简述命令行创建和VsCode创建
命令号行创建： 
``` cli
flutter create app
```

vscode创建：
步骤  
- 1、打开vscode新建窗口， 点击view -> Command Palette...
- 2、输入flutter，选择New App Project选项, 输入项目名称回车，然后选择项目存放位置，等待项目创建（如果没有配置flutter路径，请根据相关提示进行配置）
- 3、右下角选择启动的目标设备，按F5会debug启动项目（或者Debug>Start Debugging）
#### 2、引入外部依赖
在pubspec文件中添加应用程序的资源，比如english_words添加进去, 然后执行```flutter pub get```命令来更新依赖包
``` yaml
dependencies:
  flutter:
    sdk: flutter

  english_words: ^3.1.0

  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^1.0.2
```

使用项目依赖
``` dart
import 'package:english_words/english_words.dart';
```
#### 3、添加有状态组件
两个概念，stateless widgets是不可变的所有的值都是最终的， stateful widgets的状态可能在widget生命周期中发生变化，实现一个stateful widget至少需要两个类：  
1、StatefulWidget类  
2、State类，StatefulWidget本身不变，State在widget生命周期中始终存在  
#### 示例代码
``` dart

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // final wordPair = new WordPair.random();  // 删除此行

    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          //child: new Text(wordPair.asPascalCase),
          child: new RandomWords(),
        ),
      ),
    );
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  @override
  Widget build(BuildContext context) {
    final wordPair = new WordPair.random();
    return new Text(wordPair.asPascalCase);
  }
}

```
