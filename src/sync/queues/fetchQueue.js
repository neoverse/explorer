/* eslint-disable no-console */

import _ from "lodash";
import async from "async";
import * as neo from "neo-api";

import findBestNode from "../helpers/findBestNode";
import getNextIndex from "../helpers/getNextIndex";

const VERBOSE = 1;
const PRIORITY_DEFAULT = 5;
// const PRIORITY_IMMEDIATE = 0;

export default class FetchQueue {
  constructor(callback, {
    concurrency = 1,
    pollInterval = 1000,
    queueSize = 1000
  } = {}) {
    this.callback = callback;
    this.pollInterval = pollInterval;
    this.queueSize = queueSize;
    this.client = null;
    this.currentIndex = null;
    this.blocks = {};
    this.paused = false;
    this.queue = async.priorityQueue(this._process, concurrency);
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
    await this._compareBlockHeight();  // TODO: drop the _ensureWorkingClient function and retry here
    if (this.queue.length() > 0) return;

    this.clock = setTimeout(this._poll, this.pollInterval);
  }

  _compareBlockHeight = async () => {
    const height = await this._getBlockCount();
    const nextIndex = await getNextIndex();
    const maxIndex = nextIndex + Math.min(height - nextIndex, this.queueSize) - 1;

    this.currentIndex || (this.currentIndex = nextIndex);

    if (_.keys(this.blocks).length >= this.queueSize) {
      console.log("Waiting for blocks to process before fetching...");
    } if (nextIndex > maxIndex) {
      console.log("Waiting for new blocks...");
    } else {
      console.log(`Enqueueing fetches for blocks ${nextIndex} to ${maxIndex}...`);

      for (let index = nextIndex; index <= maxIndex; index++) {
        this._enqueue(index);
      }

      console.log("Enqueued.");
    }
  }

  _enqueue = (index, priority = PRIORITY_DEFAULT) => {
    this.queue.push(index, priority, this._addBlock);
  }

  _addBlock = (block) => {
    this.blocks[block.index] = block;

    while (this.blocks[this.currentIndex]) {
      this.callback(this.blocks[this.currentIndex]);
      delete this.blocks[this.currentIndex];
      this.currentIndex++;
    }
  }

  // _retry = async (index) => {
  //   this._enqueue(index, PRIORITY_IMMEDIATE);
  // }

  _process = async (index, callback) => {
    console.log(`Fetching block #${index}...`);

    // TODO: wrap this in a try/catch and retry by enqueueing
    callback(await this._getBlockByHeight(index));
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
