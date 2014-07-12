#!/bin/bash

stty opost -ocrnl onlcr -echo 9600 < /dev/ttyUSB0
echo "<ID01>" > /dev/ttyUSB0
sleep 0;
echo "<ID01><PA>$1" > /dev/ttyUSB0