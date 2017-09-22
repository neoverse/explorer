/* eslint-disable no-console */

import FetchQueue from "./queues/fetchQueue";
import ProcessQueue from "./queues/processQueue";

export default class Syncer {
  constructor(options = {}) {
    this.processQueue = new ProcessQueue();
    this.fetchQueue = new FetchQueue(this.processQueue.push, {
      ...options,
      canFetch: () => this.processQueue.size() <= 50
    });
  }

  start = async () => {
    this.fetchQueue.start();
    this.processQueue.start();
  }

  stop = () => {
    this.fetchQueue.stop();
    this.processQueue.stop();
  }
}
