//
//  AutoTakeSendResult.swift
//  swift-camera-sample
//
//  Created by lyl on 15/8/13.
//  Copyright © 2015年 Shoken Fujisaki. All rights reserved.
//

import Foundation

protocol AutoTakeCameraResultProcess{
    mutating func process(filesInfo:[Dictionary<String,String>])
}