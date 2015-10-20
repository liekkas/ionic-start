//
//  ViewController.swift
//  swift-camera-sample
//
//  Created by Shoken Fujisaki on 6/8/14.
//  Copyright (c) 2014 Shoken Fujisaki. All rights reserved.
//

import UIKit
import AVFoundation
import ImageIO
import CoreMotion

class TakeViewController: UIViewController {
    
    var stillImageOutput: AVCaptureStillImageOutput!
    var session: AVCaptureSession!
    var avCaptureConnection:AVCaptureConnection!
    var timer:NSTimer!
    var countDownTimer:NSTimer!
    var takeCount=0
    var _takeMaxCount=6
        var takeMaxCount:Int{
        get{
            return _takeMaxCount
        }
        set{
            _takeMaxCount = newValue
        }
    }
    var _resolutionType:String=AVCaptureSessionPresetPhoto
    var resolutionType:String{
        get{
            return _resolutionType
        }
        set{
            _resolutionType = newValue
        }
    }
    var _imgCompress:Float=1.0
    var imgCompress:Float{
        get{
            return _imgCompress
        }
        set{
            _imgCompress = newValue
        }
    }
    
    var _takeTimeInterval:Float=0.5
    var takeTimeInterval:Float{
        get{
            return _takeTimeInterval
        }
        set{
            _takeTimeInterval = newValue
        }
    }
    
   // var takeButton:UIButton!
    
    var countDownLabel:UILabel!
    var countDownNumber=3
   // var takeButtonCountNumber=3
    //var cachePictures:[String] = []
    var results:[Dictionary<String,String>] = []
    var resultProcess:AutoTakeCameraResultProcess?
   
    var currentAccelX: Double = 0.0
    var currentAccelY: Double = 0.0
    var currentAccelZ: Double = 0.0
    var currentRotX: Double = 0.0
    var currentRotY: Double = 0.0
    var currentRotZ: Double = 0.0
    
    let motionManager = CMMotionManager()
    
    var isRunning = false
    
    var hardwareDesc:String?
    
    func setResultProcess(proc:AutoTakeCameraResultProcess){
        self.resultProcess=proc
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // Start Camera
        self.initCamera()
        
    }
    
    override func viewWillAppear(animated: Bool){
        self.session.startRunning()
        self.avCaptureConnection=self.stillImageOutput.connectionWithMediaType(AVMediaTypeVideo)
    }
    
    override func viewDidDisappear(animated: Bool) {
         self.session.stopRunning()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    
    
    func scheduleAutoTakePictureTimer(){
        let interval:NSTimeInterval = NSTimeInterval(self.takeTimeInterval)
        self.timer = NSTimer.scheduledTimerWithTimeInterval(interval, target:self,selector:Selector("timerTakePictureFunc"), userInfo:nil,repeats:true)
        self.timer.fire()
    }
    
    func timerTakePictureFunc(){
        print("timer take \(takeCount)")
        self.takeCount++
        
        self.stillImageOutput.captureStillImageAsynchronouslyFromConnection(self.avCaptureConnection) { (buffer:CMSampleBuffer!, error: NSError!) -> Void in
            if let exifAttachments = CMGetAttachment(buffer, kCGImagePropertyExifDictionary, nil) {
                
                let imageData = AVCaptureStillImageOutput.jpegStillImageNSDataRepresentation(buffer)
                let img:UIImage! = UIImage(data: imageData)
                
                let container:ExifContainer=ExifContainer()
                
                let dic:NSMutableDictionary = NSMutableDictionary()
                dic.setValue(self.hardwareDesc!+" Front", forKey: kCGImagePropertyTIFFModel as String)
                dic.setValue("Apple", forKey: kCGImagePropertyTIFFMake as String)
                container.setTIFFData(dic)
                container.setExifData(exifAttachments as! NSMutableDictionary)
                
                let data:NSData = img.addExif(container, compressionQuality: self.imgCompress)
                
                
               
                //var dic:NSDictionary = container.exifDictionary
                
                //container.imageMetadata = exifAttachments
                
                var index:String = "0\(self.takeCount)"
                if(self.takeCount > 10){
                    index = String(self.takeCount)
                }
                
                let path:String = NSTemporaryDirectory().stringByAppendingString("take\(index).jpg")
                data.writeToFile(path, atomically: true)
                //UIImageJPEGRepresentation(img,1.0)?.writeToFile(path, atomically: true)
                //self.cachePictures.append(path)
                let result:Dictionary = ["path":path,"ax":String(self.currentAccelX),"ay":String(self.currentAccelY),"az":String(self.currentAccelZ),"rx":String(self.currentRotX),"ry":String(self.currentRotY),"rz":String(self.currentRotZ)]
                
                self.results.append(result)
                
                if self.takeCount>=self.takeMaxCount {
                    self.stopAndSendResult()
                }
                
                // UIImageWriteToSavedPhotosAlbum(data, nil, nil, nil)
            }
        
        }
        
       
    }
    
    func startAutoTake(){
        self.scheduleAutoTakePictureTimer()
        
       
        motionManager.accelerometerUpdateInterval = 0.01
        motionManager.gyroUpdateInterval = 0.01
        let queue:NSOperationQueue = NSOperationQueue.currentQueue()!
        motionManager.startAccelerometerUpdatesToQueue(queue, withHandler: {(accelerometerData: CMAccelerometerData?, error:NSError?) in
            //self.outputAccelerationData(accelerometerData.acceleration)
            if (error != nil)
            {
                print("\(error)")
            }
            if(accelerometerData !=  nil){
                self.currentAccelX = (accelerometerData?.acceleration.x)!
                self.currentAccelY=(accelerometerData?.acceleration.y)!
                self.currentAccelZ=(accelerometerData?.acceleration.z)!
                
            }
        })
        
        motionManager.startGyroUpdatesToQueue(queue, withHandler: {(gyroData: CMGyroData?, error: NSError?)in
            //self.outputRotationData(gyroData.rotationRate)
            if (error != nil)
            {
                print("\(error)")
            }
            if(gyroData !=  nil){
                self.currentRotX = (gyroData?.rotationRate.x)!
                self.currentRotY = (gyroData?.rotationRate.y)!
                self.currentRotZ = (gyroData?.rotationRate.z)!
                
            }
        })
        

    }
    
    func stopAndSendResult(){
        self.isRunning=false
        self.timer.invalidate()
       
        self.takeCount=0
        
        self.resultProcess?.process(self.results)
        self.results = []
        
        motionManager.stopAccelerometerUpdates()
        motionManager.stopGyroUpdates()

    }
    
    func initCamera() -> Bool {
        
        print(hardwareString())
        print(hardwareDescription())
        self.hardwareDesc = hardwareDescription()
        
        // init camera device
        var captureDevice: AVCaptureDevice?
        let devices: NSArray = AVCaptureDevice.devices()
        
        // find back camera
        for device: AnyObject in devices {
            if device.position == AVCaptureDevicePosition.Front {
                captureDevice = device as? AVCaptureDevice
            }
        }

        if captureDevice != nil {
            // Debug
            print(captureDevice!.localizedName)
            print(captureDevice!.modelID)
        } else {
            print("Missing Camera")
            return false
        }
        
        // init device input
       
        var deviceInput:AVCaptureInput?
        
        do{
            try deviceInput = AVCaptureDeviceInput(device:captureDevice)
        }catch let error as NSError{
            print(error)
        }
       // var deviceInput: AVCaptureInput = AVCaptureDeviceInput.deviceInputWithDevice(captureDevice, error: error) as AVCaptureInput
        
        self.stillImageOutput = AVCaptureStillImageOutput()
        // init session
        self.session = AVCaptureSession()
        if(self.session.canSetSessionPreset(self.resolutionType)){
            self.session.sessionPreset = self.resolutionType
            print("preset=\(self.resolutionType)")
        }else{
            self.session.sessionPreset = AVCaptureSessionPresetPhoto
        }
        
        self.session.addInput(deviceInput)
        self.session.addOutput(self.stillImageOutput)
        
        // layer for preview
        let previewLayer: AVCaptureVideoPreviewLayer =  AVCaptureVideoPreviewLayer(session:self.session);       previewLayer.frame = self.view.bounds
        self.view.layer.addSublayer(previewLayer)
       
        //var overlayView:UIView = UIView()
        //overlayView.frame = self.view.bounds
        //self.view.addSubview(overlayView)
        
        
        self.countDownLabel = UILabel(frame:self.view.bounds)
        self.countDownLabel.backgroundColor = UIColor.clearColor()
        self.countDownLabel.textAlignment = NSTextAlignment.Center
        self.countDownLabel.font = UIFont.systemFontOfSize(72);
        self.countDownLabel.textColor = UIColor.whiteColor()
        self.countDownLabel.text = String(self.countDownNumber)
        
        
        
//        self.takeButton = UIButton(type:UIButtonType.System)
//        
//        takeButton.frame = CGRectMake((self.view.bounds.width-100)/2, self.view.bounds.height-100, 100, 50)
//        takeButton.backgroundColor = UIColor.groupTableViewBackgroundColor()
//        takeButton.setTitle("开始", forState: UIControlState.Normal)
//        takeButton.addTarget(self, action: "buttonAction:", forControlEvents: UIControlEvents.TouchUpInside)
//        
//        self.view.addSubview(takeButton)
        
        self.countDownBegin()
        
        return true
    }
    
    func countDownBegin()
    {
        if self.isRunning==false {
            self.isRunning = true
        }
        self.countDownNumber=3
        self.countDownLabel.text = String(self.countDownNumber)
        
        self.view.addSubview(self.countDownLabel)
        
        self.countDownTimer=NSTimer.scheduledTimerWithTimeInterval(1, target:self,selector:Selector("countDownTimerFunc"), userInfo:nil,repeats:true)
        
        self.countDownTimer.fire()
    }
    func countDownTimerFunc () {
        if self.countDownNumber<=0 {
            self.countDownLabel.removeFromSuperview()
            self.countDownTimer.invalidate()
            
            self.startAutoTake()
            
        }
        
        self.countDownLabel.text = String(self.countDownNumber)
        self.countDownNumber--
    }

}

