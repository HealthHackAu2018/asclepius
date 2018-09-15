#!/bin/bash

./gradlew ${1:-installDevDebug} --stacktrace && adb shell am start -n com.healthhack.asclepiusmonitoring/host.exp.exponent.MainActivity
