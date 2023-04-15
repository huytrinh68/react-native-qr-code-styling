import React, {useEffect, useRef} from 'react';
import {ViewStyle} from 'react-native';
import WebView from 'react-native-webview';

const defaultValues = {
  width: 200,
  height: 200,
  borderRadius: 0,
  image: '',
};

const SOURCE_PATH = './source.html';

type dotTypeValues =
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

type cornerSquareTypeValues = 'dots' | 'square' | 'extra-rounded';

type cornerDotTypeValues = 'dots' | 'square';

type QROptionsMode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';

type ErrorCorrectionLevelType = 'L' | 'M' | 'Q' | 'H';

type QRGeneratorType = 'svg' | 'canvas';

type GradientType = 'linear' | 'radial';

type CrossOriginType = 'anonymous' | 'use-credentials';

type QROptionsTypeNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40;

interface ColorStopsProps {
  offset?: number;
  color?: string;
}
interface GradientProps {
  type?: GradientType;
  rotation?: number;
  colorStops?: Array<ColorStopsProps>;
}

interface DotOptionsProps {
  type?: dotTypeValues;
  color?: string;
  gradient?: GradientProps;
}

interface CornerSquareOptionsProps {
  type?: cornerSquareTypeValues;
  color?: string;
  gradient?: GradientProps;
}

interface CornerDotOptionsProps {
  type?: cornerDotTypeValues;
  color?: string;
  gradient?: GradientProps;
}

interface BackgroundOptionsProps {
  color?: string;
  gradient?: GradientProps;
}

interface ImageOptionsProps {
  hideBackgroundDots?: boolean;
  imageSize?: number;
  margin?: number;
  crossOrigin?: CrossOriginType;
}

interface QROptionsProps {
  typeNumber?: QROptionsTypeNumber;
  mode?: QROptionsMode;
  errorCorrectionLevel?: ErrorCorrectionLevelType;
}

interface QRGeneratorProps {
  value: string;
  type?: QRGeneratorType;
  width: number;
  height: number;
  borderRadius?: number;
  image?: string;
  dotOptions?: DotOptionsProps;
  cornerSquareOptions?: CornerSquareOptionsProps;
  cornerDotOptions?: CornerDotOptionsProps;
  backgroundOptions?: BackgroundOptionsProps;
  imageOptions?: ImageOptionsProps;
  qrOptions?: QROptionsProps;
  getBase64DataImage?: (value: string) => void;
}

const defaultDotOptions: DotOptionsProps = {
  type: 'square',
  color: '#000',
};

const defaultCornerSquareOptions: CornerSquareOptionsProps = {
  type: 'square',
  color: '#000',
};

const defaultCornerDotOptions: CornerDotOptionsProps = {
  type: 'square',
  color: '#000',
};

const defaultBackgroundOptions: BackgroundOptionsProps = {
  color: '#FFF',
};

const defaultImageOptions: ImageOptionsProps = {
  hideBackgroundDots: true,
  imageSize: 0.4,
  margin: 0,
  crossOrigin: 'anonymous',
};

const defaultQROptions: QROptionsProps = {
  typeNumber: 0,
  errorCorrectionLevel: 'Q',
  mode: 'Byte',
};

const defaultType: QRGeneratorType = 'canvas';

const initLibrary = ({
  value,
  width,
  height,
  type,
  image,
  dotOptions,
  cornerSquareOptions,
  cornerDotOptions,
  backgroundOptions,
  imageOptions,
  qrOptions,
}: QRGeneratorProps) => {
  return `
        const rnQRCodeStyling = new QRCodeStyling({
            width: ${width},
            height: ${height},
            type: '${type}',
            data: "${value}",
            image: '${image}',
            dotsOptions: {
                color: '${dotOptions?.color}',
                type: '${dotOptions?.type}',
                gradient:${JSON.stringify(dotOptions?.gradient)}
            },
            cornersSquareOptions: {
                type:'${cornerSquareOptions?.type}',
                color:'${cornerSquareOptions?.color}',
                gradient:${JSON.stringify(cornerSquareOptions?.gradient)}
            },
            cornersDotOptions: {
                type:'${cornerDotOptions?.type}',
                color:'${cornerDotOptions?.color}',
                gradient:${JSON.stringify(cornerDotOptions?.gradient)}
            },
            backgroundOptions: {
                color: '${backgroundOptions?.color}',
                gradient: ${JSON.stringify(backgroundOptions?.gradient)}
            },
            imageOptions: {
                crossOrigin: '${imageOptions?.crossOrigin}',
                margin: ${imageOptions?.margin},
                imageSize: ${imageOptions?.imageSize},
                hideBackgroundDots: ${imageOptions?.hideBackgroundDots},
            },
            qrOptions: {
              typeNumber: ${qrOptions?.typeNumber},
              mode: '${qrOptions?.mode}',
              errorCorrectionLevel: '${qrOptions?.errorCorrectionLevel}',
            }
        });
        rnQRCodeStyling.append(document.getElementById("canvas"));
        var elm = document.getElementById("canvas").firstChild
        if('${type}' === 'canvas') {
          var base64CanvasData = elm.toDataURL();
          ReactNativeWebView.postMessage(JSON.stringify({base64:base64CanvasData}));
        } else {
          var svgString = new XMLSerializer().serializeToString(elm);
          var decoded = unescape(encodeURIComponent(svgString));
          var base64 = btoa(decoded);
          var base64Data = 'data:image/svg+xml;base64,'+base64
          ReactNativeWebView.postMessage(JSON.stringify({base64:base64Data}));
        }
    `;
};

const QRGenerator = ({
  value,
  type = defaultType,
  width = defaultValues.width,
  height = defaultValues.height,
  image = defaultValues.image,
  borderRadius = defaultValues.borderRadius,
  dotOptions = defaultDotOptions,
  cornerSquareOptions = defaultCornerSquareOptions,
  cornerDotOptions = defaultCornerDotOptions,
  backgroundOptions = defaultBackgroundOptions,
  imageOptions = defaultImageOptions,
  qrOptions = defaultQROptions,
  getBase64DataImage,
}: QRGeneratorProps) => {
  const webViewRef: any = useRef(null);

  const src = initLibrary({
    value,
    type,
    width,
    height,
    image,
    dotOptions,
    cornerSquareOptions,
    cornerDotOptions,
    backgroundOptions,
    imageOptions,
    qrOptions,
  });

  const loadContent = () => {
    webViewRef?.current?.injectJavaScript(src);
  };

  useEffect(() => {
    webViewRef?.current?.reload();
  });

  const webViewStyle: ViewStyle = {
    width: width,
    height: height,
    borderRadius: borderRadius,
  };

  const handleMessage = (event: any) => {
    const {data} = event?.nativeEvent;
    try {
      const jsonData = JSON.parse(data);
      getBase64DataImage?.(jsonData?.base64);
    } catch (err) {
      console.log('Something wrong when parse data');
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={require(SOURCE_PATH)}
      onLoad={loadContent}
      style={webViewStyle}
      scrollEnabled={false}
      onMessage={handleMessage}
    />
  );
};

export default QRGenerator;
