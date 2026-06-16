Title: en/how-to-create-vr-content
Source URL: https://threejs.org/manual/en/how-to-create-vr-content.html

This guide provides a brief overview of the basic components of a web-based VR application made with three.js.

## Workflow

First, you have to include \[link:https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/VRButton.js VRButton.js\] into your project.

import { VRButton } from 'three/addons/webxr/VRButton.js';

\*VRButton.createButton()\* does two important things: It creates a button which indicates VR compatibility. Besides, it initiates a VR session if the user activates the button. The only thing you have to do is to add the following line of code to your app.

document.body.appendChild( VRButton.createButton( renderer ) );

Next, you have to tell your instance of \`WebGLRenderer\` to enable XR rendering.

renderer.xr.enabled = true;

Finally, you have to adjust your animation loop since we can't use our well known \*window.requestAnimationFrame()\* function. For VR projects we use \`renderer.setAnimationLoop()\`. The minimal code looks like this:

renderer.setAnimationLoop( function () {

  renderer.render( scene, camera );

} );

## Next Steps

Have a look at one of the official WebVR examples to see this workflow in action.  
  
\[example:webxr\_xr\_ballshooter WebXR / XR / ballshooter\]  
\[example:webxr\_xr\_cubes WebXR / XR / cubes\]  
\[example:webxr\_xr\_dragging WebXR / XR / dragging\]  
\[example:webxr\_xr\_marchingcubes WebXR / XR / marching cubes\]  
\[example:webxr\_xr\_paint WebXR / XR / paint\]  
\[example:webxr\_vr\_panorama\_depth WebXR / VR / panorama\_depth\]  
\[example:webxr\_vr\_panorama WebXR / VR / panorama\]  
\[example:webxr\_vr\_rollercoaster WebXR / VR / rollercoaster\]  
\[example:webxr\_vr\_sandbox WebXR / VR / sandbox\]  
\[example:webxr\_vr\_video WebXR / VR / video\]