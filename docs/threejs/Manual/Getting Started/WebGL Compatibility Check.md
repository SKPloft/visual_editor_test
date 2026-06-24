Title: en/webgl-compatibility-check
Source URL: https://threejs.org/manual/en/webgl-compatibility-check.html

Even though this is becoming less and less of a problem, some devices or browsers may still not support WebGL 2. The following method allows you to check if it is supported and display a message to the user if it is not. Import the WebGL support detection module, and run the following before attempting to render anything.

import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

  // Initiate function or other initializations here
  animate();

} else {

  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById( 'container' ).appendChild( warning );

}