# React Native QR Code Styling
[![Version](https://img.shields.io/npm/v/react-native-qr-code-styling.svg)](https://www.npmjs.com/package/react-native-qr-code-styling)

React Native library for generating QR codes with a logo and styling based on [qr-code-styling]("https://github.com/kozakdenys/qr-code-styling")

If you have issues / suggestions / notes / questions, please open an issue or contact me. Let's create a cool library together.

### Examples
<p float="left">
  <img style="display:inline-block" src="https://github.com/huytrinh68/react-native-qr-code-styling/blob/main/assets/react-native-qr-code-styling-1.png" width="240" />
</p>

### Installation

```
npm install react-native-qr-code-styling
```

### Usage

```HTML
import QRGenerator from 'react-native-qr-code-styling'

const viewDataBase64 = (e: string) => {};
<QRGenerator
  width={300}
  height={300}
  type={'svg'}
  value="https://github.com/huytrinh68/react-native-qr-code-styling"
  dotOptions={{
    type: 'classy-rounded',
    color: 'green',
    gradient: {
      type: 'linear',
      rotation: 100,
      colorStops: [
        {offset: 0, color: '#845EC2'},
        {offset: 0.8, color: '#0081CF'},
        {offset: 1, color: '#008F7A'},
      ],
    },
  }}
  cornerDotOptions={{
    type: 'dots',
    gradient: {
      type: 'linear',
      rotation: 100,
      colorStops: [
        {offset: 0, color: '#845EC2'},
        {offset: 0.8, color: '#0081CF'},
        {offset: 1, color: '#008F7A'},
      ],
    },
  }}
  cornerSquareOptions={{
    type: 'extra-rounded',
    gradient: {
      type: 'linear',
      rotation: 100,
      colorStops: [
        {offset: 0, color: '#845EC2'},
        {offset: 0.8, color: '#0081CF'},
        {offset: 1, color: '#008F7A'},
      ],
    },
  }}
  backgroundOptions={{
    color: 'transparent',
  }}
  getBase64DataImage={viewDataBase64}
  image={
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png'
  }
  imageOptions={{hideBackgroundDots: false, imageSize: 0.5, margin: 0}}
/>
```
---

### API Documentation
This document follows the original documentation created by Denys Kozak. Please refer to [the original version]("https://github.com/kozakdenys/qr-code-styling#readme") for further details.
Props structure

Property               |Type                     |Default Value|Description
-----------------------|-------------------------|-------------|-----------------------------------------------------
width                  |number                   |`300`        |Size of canvas
height                 |number                   |`300`        |Size of canvas
type                   |string (`'canvas' 'svg'`)|`canvas`     |The type of the element that will be rendered
data                   |string                   |             |The date will be encoded to the QR code
image                  |string                   |             |The image will be copied to the center of the QR code
qrOptions              |object                   |             |Options will be passed to `qrcode-generator` lib
imageOptions           |object                   |             |Specific image options, details see below
dotOptions            |object                   |             |Dots styling options
cornersSquareOptions   |object                   |             |Square in the corners styling options
cornerDotOptions |object                   |             |Dots in the corners styling options
backgroundOptions      |object                   |             |QR background styling options

`qrOptions` structure

Property            |Type                                              |Default Value
--------------------|--------------------------------------------------|-------------
typeNumber          |number (`0 - 40`)                                 |`0`
mode                |string (`'Numeric' 'Alphanumeric' 'Byte' 'Kanji'`)|
errorCorrectionLevel|string (`'L' 'M' 'Q' 'H'`)                        |`'Q'`

`imageOptions` structure

Property          |Type                                   |Default Value|Description
------------------|---------------------------------------|-------------|------------------------------------------------------------------------------
hideBackgroundDots|boolean                                |`true`       |Hide all dots covered by the image
imageSize         |number                                 |`0.4`        |Coefficient of the image size. Not recommended to use ove 0.5. Lower is better
margin            |number                                 |`0`          |Margin of the image in px
crossOrigin       |string(`'anonymous' 'use-credentials'`)|             |Set "anonymous" if you want to download QR code from other origins.

`dotsOptions` structure

Property|Type                                                                          |Default Value|Description
--------|------------------------------------------------------------------------------|-------------|-------------------
color   |string                                                                        |`'#000'`     |Color of QR dots
gradient|object                                                                        |             |Gradient of QR dots
type    |string (`'rounded' 'dots' 'classy' 'classy-rounded' 'square' 'extra-rounded'`)|`'square'`   |Style of QR dots

`backgroundOptions` structure

Property|Type  |Default Value
--------|------|-------------
color   |string|`'#fff'`
gradient|object|

`cornersSquareOptions` structure

Property|Type                                     |Default Value|Description
--------|-----------------------------------------|-------------|-----------------
color   |string                                   |             |Color of Corners Square
gradient|object                                   |             |Gradient of Corners Square
type    |string (`'dot' 'square' 'extra-rounded'`)|             |Style of Corners Square

`cornersDotOptions` structure

Property|Type                     |Default Value|Description
--------|-------------------------|-------------|-----------------
color   |string                   |             |Color of Corners Dot
gradient|object                   |             |Gradient of Corners Dot
type    |string (`'dot' 'square'`)|             |Style of Corners Dot

Gradient structure

`dotOptions.gradient`

`backgroundOptions.gradient`

`cornersSquareOptions.gradient`

`cornersDotOptions.gradient`

Property  |Type                        |Default Value|Description
----------|----------------------------|-------------|---------------------------------------------------------
type      |string (`'linear' 'radial'`)|"linear"     |Type of gradient spread
rotation  |number                      |0            |Rotation of gradient in radians (Math.PI === 180 degrees)
colorStops|array of objects            |             |Gradient colors. Example `[{ offset: 0, color: 'blue' }, {  offset: 1, color: 'red' }]`

Gradient colorStops structure

`dotOptions.gradient.colorStops[]`

`backgroundOptions.gradient.colorStops[]`

`cornersSquareOptions.gradient.colorStops[]`

`cornersDotOptions.gradient.colorStops[]`

Property|Type            |Default Value|Description
--------|----------------|-------------|-----------------------------------
offset  |number (`0 - 1`)|             |Position of color in gradient range
color   |string          |             |Color of stop in gradient range

#### QRGenerator methods
`QRGenerator.getBase64DataImage() => string

Param    |Type                                |Default Value|Description
---------|------------------------------------|-------------|------------
base64|string|     | Data of QR Code as base64

### License

[MIT License](https://raw.githubusercontent.com/huytrinh68/react-native-qr-code-styling/master/LICENSE). Copyright (c) 2023 Huy Trinh
