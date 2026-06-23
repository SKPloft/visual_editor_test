Title: WorkerPool
Source URL: https://threejs.org/docs/pages/WorkerPool.html

# WorkerPool

A simple pool for managing Web Workers.

## Import

WorkerPool is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { WorkerPool } from 'three/addons/utils/WorkerPool.js';
```

## Constructor

### new [WorkerPool](#WorkerPool)( pool : number )

Constructs a new Worker pool.

**pool**

The size of the pool.

Default is `4`.

## Classes

[WorkerPool](WorkerPool.html)

## Properties

### .[pool](#pool) : number

The size of the pool.

Default is `4`.

### .[queue](#queue) : Array.<Object>

A message queue.

### .[workerCreator](#workerCreator) : function

A factory function for creating workers.

### .[workerStatus](#workerStatus) : number

The current worker status.

### .[workers](#workers) : Array.<Worker>

An array of Workers.

### .[workersResolve](#workersResolve) : Array.<function()>

An array with resolve functions for messages.

## Methods

### .[dispose](#dispose)()

Terminates all Workers of this pool. Call this method whenever this Worker pool is no longer used in your app.

### .[postMessage](#postMessage)( msg : Object, transfer : Array.<ArrayBuffer> ) : Promise

Post a message to an idle Worker. If no Worker is available, the message is pushed into a message queue for later processing.

**msg**

The message.

**transfer**

An array with array buffers for data transfer.

**Returns:** A Promise that resolves when the message has been processed.

### .[setWorkerCreator](#setWorkerCreator)( workerCreator : function )

Sets a function that is responsible for creating Workers.

**workerCreator**

The worker creator function.

### .[setWorkerLimit](#setWorkerLimit)( pool : number )

Sets the Worker limit

**pool**

The size of the pool.

## Source

[examples/jsm/utils/WorkerPool.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/WorkerPool.js)