import React from "react";
import "./styles.css";
import {
  DeepZoomArea,
  TiledImage,
  Overlay,
  DragSelector,
  WindowSelector,
  SimpleImage
} from "./DeepZoomArea";
import { useInterval } from "./useInterval";

export default function App() {
  const [state, setState] = React.useState({});
  const isOn = image => !state[image.href];
  const toggle = href =>
    setState(state => ({ ...state, [href]: !state[href] }));
  const images = [
    {
      index: 0,
      href:
        "https://gallica.bnf.fr/iiif/ark:/12148/btv1b520004567/f405/info.json"
    },
    {
      index: 2,
      href:
        "https://digi.ub.uni-heidelberg.de/iiif/2/cpg311%3A160v.jpg/info.json"
    },
    {
      index: 1,
      href: "https://ids.lib.harvard.edu/ids/iiif/47174896/info.json"
    },
    {
      index: 3,
      href:
        "https://media.nga.gov/iiif/public/objects/1/0/6/3/8/2/106382-primary-0-nativeres.ptif/info.json"
    }
  ];

  const log = tag => data => console.log(tag, data);

  const [intervalToggle, setIntervalToggle] = React.useState(300);
  useInterval(() => {
    // setIntervalToggle(toggle => !toggle);
  }, 3000);
  return (
    <div className="App">
      {images.map(image => (
        <div key={image.href}>
          <button onClick={() => toggle(image.href)}>
            {isOn(image) ? "turn off" : "turn on"}
          </button>{" "}
          {image.href}
        </div>
      ))}
      <DeepZoomArea style={{ width: 500, height: 500 }}>
        {images.map((image, index) =>
          isOn(image) ? <TiledImage key={image.href} {...image} /> : null
        )}
      </DeepZoomArea>
      <p>Click on this one and look in the console:</p>
      <DeepZoomArea style={{ width: 500, height: 500 }} onClick={log("thing")}>
        <SimpleImage
          href={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 1000 1000" height="1000px" width="1000px">
  <circle cx="500" cy="500" r="400" stroke="red" stroke-width="30" fill="none" />
          </svg>`}
          x={-0.4}
          y={0.37}
          width={1}
        />
        <TiledImage
          href="https://media.nga.gov/iiif/public/objects/1/0/6/3/8/2/106382-primary-0-nativeres.ptif/info.json"
          onClick={log("image click handler")}
        >
          {/* An overlay inside an image is in the the image coordinate system */}
          <Overlay rectangle={{ x: 5300, y: 6600, width: 2000, height: 2000 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,0,0,0.4)",
                border: "1px solid red",
                borderRadius: 5
              }}
            />
          </Overlay>
        </TiledImage>
        {/* An overlay outside of an image is in the viewport coordinate system */}
        <Overlay rectangle={{ x: 0.43, y: 0.37, width: 0.1, height: 0.1 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,255,0,0.4)",
              border: "1px solid green",
              borderRadius: 5
            }}
          />
        </Overlay>
      </DeepZoomArea>

      <p>Use a drag select in the next one and look in the console:</p>
      <DeepZoomArea style={{ width: 500, height: 500 }}>
        <TiledImage href="https://media.nga.gov/iiif/public/objects/1/0/6/3/8/2/106382-primary-0-nativeres.ptif/info.json">
          <DragSelector onChange={log("drag selector inside image")} />
        </TiledImage>
      </DeepZoomArea>

      <p>Slide this window around:</p>
      <DeepZoomArea style={{ width: 500, height: 500 }}>
        <TiledImage href="https://media.nga.gov/iiif/public/objects/1/0/6/3/8/2/106382-primary-0-nativeres.ptif/info.json">
          {/* A  inside an image is in the the image coordinate system */}
          <WindowSelector
            size={{
              width: intervalToggle ? 5000 : 3000,
              height: intervalToggle ? 5000 : 3000
            }}
            onChange={log("window inside image")}
          />
        </TiledImage>
        {/* Outside an image is in the the viewport coordinate system */}
        <WindowSelector
          size={{ width: 0.2, height: 0.2 }}
          onChange={log("window outside image")}
        />
      </DeepZoomArea>

      <p>
        Can also have a simple, non-deep-zoom image format in the deep image
        viewer
      </p>
      <DeepZoomArea style={{ width: 500, height: 500 }}>
        <SimpleImage href="/milkyway.jpg" onClick={log("simple image click")}>
          <WindowSelector
            size={{
              width: intervalToggle ? 500 : 300,
              height: intervalToggle ? 500 : 300
            }}
            onChange={log("simple image window select")}
          />
          <Overlay rectangle={{ x: 1325, y: 150, width: 100, height: 100 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,255,0,0.4)",
                border: "1px solid purple",
                borderRadius: 5
              }}
            />
          </Overlay>
        </SimpleImage>
      </DeepZoomArea>
    </div>
  );
}
