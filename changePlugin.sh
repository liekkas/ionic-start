#!/usr/bin/env bash
ionic plugin rm autotake_camera
ionic plugin add autotake_camera
ionic platform rm ios
ionic platform add ios
ionic build ios

