# Arduino 1010!

Implementation of the popular game "1010!" written JavaScript (fully ECMAScript 2015) and
controlled by Arduino.

## How it works?

It's really simple. Arduino and web server are connected via [web sockets](http://socket.io/).
Any user's interaction with the device is forwarded to Web via a socket.
Web (after receiving the socket) processes a request and make something in the game.

When user can do something in the game, green LED will be blink. If user
cannot do anything, two red LEDs will be blink alternately.

## How can I run it?

**Requirements:**

* [Arduino Leonardo](https://www.arduino.cc/en/Main/ArduinoBoardLeonardo)
* [NodeJS](https://nodejs.org/en/) (*tested on 6.1*)
* [Arduino IDE](https://www.arduino.cc/en/Main/Software) *(needs for load **Arduino StandardFirmata**)*
* Basic knowledge about [Command Line Interface](https://en.wikipedia.org/wiki/Command-line_interface)

Please follow step by step:

### Prepare device

1. Prepare 6 [LEDs](https://www.google.pl/search?q=LED), 9 [resistor](https://www.google.pl/search?q=resistor+330+ohm) (330 Ω), 3 buttons (prefered "[Tactical Switch](https://www.google.pl/search?q=Tactical+Switch)"), [Thumb Joystick](https://www.google.pl/search?q=thumb+joystick)
2. Coming soon!

### Prepare Arduino

1. Coming soon!

### Prepare project

1. Coming soon!

#### Enjoy!
