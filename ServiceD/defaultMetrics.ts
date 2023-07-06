// Default metrics.
import processCpuTotal from "npm:prom-client@14.2.0/lib/metrics/processCpuTotal.js";
// const processCpuTotal = require('./metrics/processCpuTotal');
import processStartTime from "npm:prom-client@14.2.0/lib/metrics/processStartTime.js";
// const processStartTime = require('./metrics/processStartTime');
import osMemoryHeap from "npm:prom-client@14.2.0/lib/metrics/osMemoryHeap.js";
// const osMemoryHeap = require('./metrics/osMemoryHeap');
import processOpenFileDescriptors from "npm:prom-client@14.2.0/lib/metrics/processOpenFileDescriptors.js";
// const processOpenFileDescriptors = require('./metrics/processOpenFileDescriptors');
import processMaxFileDescriptors from "npm:prom-client@14.2.0/lib/metrics/processMaxFileDescriptors.js";
// const processMaxFileDescriptors = require('./metrics/processMaxFileDescriptors');
import eventLoopLag from "npm:prom-client@14.2.0/lib/metrics/eventLoopLag.js";
// const eventLoopLag = require('./metrics/eventLoopLag');
import processHandles from "npm:prom-client@14.2.0/lib/metrics/processHandles.js";
// const processHandles = require('./metrics/processHandles');
import processRequests from "npm:prom-client@14.2.0/lib/metrics/processRequests.js";
// const processRequests = require('./metrics/processRequests');
import heapSizeAndUsed from "npm:prom-client@14.2.0/lib/metrics/heapSizeAndUsed.js";
// const heapSizeAndUsed = require('./metrics/heapSizeAndUsed');
import heapSpacesSizeAndUsed from "npm:prom-client@14.2.0/lib/metrics/heapSpacesSizeAndUsed.js";
// const heapSpacesSizeAndUsed = require('./metrics/heapSpacesSizeAndUsed');
// const version = require('./metrics/version');
import version from "npm:prom-client@14.2.0/lib/metrics/version.js";
// const gc = require('./metrics/gc');
import gc from "npm:prom-client@14.2.0/lib/metrics/gc.js";

const metrics = {
  // processCpuTotal,
  processStartTime,
  osMemoryHeap,
  processOpenFileDescriptors,
  processMaxFileDescriptors,
  // eventLoopLag,
  processHandles,
  processRequests,
  heapSizeAndUsed,
  // heapSpacesSizeAndUsed,
  version,
  // gc,
};

export const metricsList = Object.keys(metrics);

export function collectDefaultMetrics(config: any) {
  if (config !== null && config !== undefined && !(config instanceof Object)) {
    throw new TypeError("config must be null, undefined, or an object");
  }

  config = { eventLoopMonitoringPrecision: 10, ...config };

  for (const metric of Object.values(metrics)) {
    metric(config.register, config);
  }
}
