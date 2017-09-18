/* eslint-disable no-console */

import async from "async";
import * as neo from "neo-api";

import Updater from "./updater";
import findBestNode from "./helpers/findBestNode";
import getNextIndex from "./helpers/getNextIndex";

const VERBOSE = 1;
const PRIORITY_DEFAULT = 5;
const PRIORITY_IMMEDIATE = 0;

export default class Syncer {
  constructor({ concurrency = 1, pollInterval = 1000, queueSize = 1000 } = {}) {
    this.client = null;
    this.paused = false;
    this.pollInterval = pollInterval;
    this.queueSize = queueSize;
    this.updater = new Updater();
    this.queue = async.priorityQueue(this._processIndex, concurrency);
    this.queue.drain = async () => { await this._poll(); };
  }

  start = async () => {
    if (!this.client) {
      this.client = await this._createClient();
    }

    if (this.paused) {
      this.paused = false;
      this.queue.resume();
    }

    await this._poll();
  }

  stop = () => {
    this.paused = true;
    this.queue.pause();

    if (this.clock) {
      clearInterval(this.clock);
      delete this.clock;
    }
  }

  _createClient = async () => {
    const node = await findBestNode();
    return neo.node(node.url);
  }

  _poll = async () => {
    await this._compareBlockHeight();
    if (this.queue.length() > 0) return;

    this.clock = setTimeout(this._poll, this.pollInterval);
  }

  _compareBlockHeight = async () => {
    const height = await this._getBlockCount();
    const nextIndex = await getNextIndex();
    const maxIndex = nextIndex + Math.min(height - nextIndex, this.queueSize) - 1;

    if (nextIndex > maxIndex) {
      console.log("Waiting for new blocks...");
    } else {
      console.log(`Enqueueing fetches for blocks ${nextIndex} to ${maxIndex}...`);

      for (let index = nextIndex; index <= maxIndex; index++) {
        this._enqueue({ index, height });
      }

      console.log("Enqueued.");
    }
  }

  _enqueue = ({ index, height }, priority = PRIORITY_DEFAULT) => {
    if (index < height) {
      this.queue.push({ index, height }, priority);
    }
  }

  _retry = ({ index, height }) => {
    this._enqueue({ index, height }, PRIORITY_IMMEDIATE);
  }

  _processIndex = async ({ index, height }, callback) => {
    console.log(`Fetching block #${index}...`);
    const block = await this._getBlockByHeight(index);

    try {
      await this.updater.update(block);
      console.log(`Saved block #${block.index} (${block.hash})`);
    } catch (err) {
      console.error("Error saving block:", err);
      this._retry({ index, height });
    }

    callback();
  }

  _getBlockCount = async () => {
    return this._ensureWorkingClient(() => this.client.getBlockCount());
  }

  _getBlockByHeight = async (index) => {
    return this._ensureWorkingClient(() => this.client.getBlockByHeight(index, VERBOSE));
  }

  _ensureWorkingClient = async (callback) => {
    try {
      return callback();
    } catch (err) {
      this.client = await this._createClient();
      return this._ensureWorkingClient(callback);
    }
  }
}
