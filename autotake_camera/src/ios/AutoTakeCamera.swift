//
//  AutoTakeCamera.swift
//  swift-camera-sample
//
//  Created by lyl on 15/8/13.
//  Copyright © 2015年 Shoken Fujisaki. All rights reserved.
//

import Foundation

@objc(AutoTakeCamera) class AutoTakeCamera : CDVPlugin,AutoTakeCameraResultProcess {
    
   /**
    0: interval
    1: maxCount
    */
    var takeViewController:TakeViewController!
    
    var callbackId:String!
    
    
    func autoTakePictures(command: CDVInvokedUrlCommand) {
        self.callbackId = command.callbackId
        var firstFlag=false
        if self.takeViewController == nil {
            self.takeViewController = TakeViewController()
            firstFlag = true
        }


        
        let options:AnyObject = command.argumentAtIndex(0) as AnyObject!
        let maxCount:Int = options["maxCount"] as AnyObject! as! Int
        let timeInterval:Float = options["timeInterval"] as AnyObject! as! Float
        let imgCompress:Float=options["imgCompress"] as AnyObject! as! Float
        let resolutionType=options["resolutionType"] as AnyObject! as! String
        self.takeViewController.takeMaxCount=maxCount
        self.takeViewController.takeTimeInterval=timeInterval
        self.takeViewController.resolutionType=resolutionType
        
        self.viewController?.addChildViewController(self.takeViewController)
        self.takeViewController.view.frame = (self.viewController?.view.bounds)!
        self.viewController?.view.addSubview(self.takeViewController.view)
        self.takeViewController.setResultProcess(self)
        if firstFlag == false {
            self.takeViewController.countDownBegin()
        }
        
        
        // let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: message);
        // commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId);
    }
    
    func process(filesInfo:[Dictionary<String,String>]){
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsArray: filesInfo);
        commandDelegate!.sendPluginResult(pluginResult, callbackId:self.callbackId);
        self.takeViewController.view.removeFromSuperview()
        self.takeViewController.removeFromParentViewController()
        
    }
    
    
    
    
}