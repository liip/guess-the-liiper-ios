#import "SnapshotHelper.js"

var target = UIATarget.localTarget();
var app = target.frontMostApp();
var window = app.mainWindow();

target.setDeviceOrientation(UIA_DEVICE_ORIENTATION_PORTRAIT);

target.delay(3);
captureLocalizedScreenshot("0-LandingScreen");

target.frontMostApp().mainWindow().images()["bg"].elements()[" Sign in with Google"].tapWithOptions({tapOffset:{x:0.34, y:0.64}});
target.frontMostApp().mainWindow().scrollViews()[0].webViews()[0].textFields()[0].tap();
target.frontMostApp().statusBar().tapWithOptions({tapOffset:{x:0.41, y:0.75}});

captureLocalizedScreenshot("1-LoginScreen");
