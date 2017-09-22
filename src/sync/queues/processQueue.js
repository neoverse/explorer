/* eslint-disable no-console */

import async from "async";

import Updater from "../updater";

const PRIORITY_DEFAULT = 5;
const PRIORITY_IMMEDIATE = 0;

export default class ProcessQueue {
  constructor() {
    this.queue = async.priorityQueue(this._process);
    this.updater = new Updater();
  }

  start = async () => {
    if (this.paused) {
      this.paused = false;
      this.queue.resume();
    }
  }

  stop = () => {
    this.paused = true;
    this.queue.pause();
  }

  size = () => {
    return this.queue.length();
  }

  push = (block) => {
    this.queue.push(block, PRIORITY_DEFAULT);
  }

  _retry = (block) => {
    this.queue.push(block, PRIORITY_IMMEDIATE);
  }

  _process = async (block, callback) => {
    console.log(`Processing block #${block.index}...`);

    try {
      await this.updater.update(block);
      console.log(`Finished processing block #${block.index}.`);
    } catch (err) {
      console.error(`Error processing block ${block.index}:`, err);
      this._retry(block);
    }

    callback();
  }
}
