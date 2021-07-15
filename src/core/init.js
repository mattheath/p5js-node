import p5 from '../core/main';

/**
 * _globalInit
 *
 * TODO: ???
 * if sketch is on window
 * assume "global" mode
 * and instantiate p5 automatically
 * otherwise do nothing
 *
 * @private
 * @return {Undefined}
 */
const _globalInit = () => {
  // Could have been any property defined within the p5 constructor.
  // If that property is already a part of the global object,
  // this code has already run before, likely due to a duplicate import
  if (typeof globalThis._setupDone !== 'undefined') {
    console.warn(
      'p5.js seems to have been imported multiple times. Please remove the duplicate import'
    );
    return;
  }

  if (!globalThis.mocha) {
    // If there is a setup or draw function on the globalThis
    // then instantiate p5 in "global" mode
    if (
      ((globalThis.setup && typeof globalThis.setup === 'function') ||
        (globalThis.draw && typeof globalThis.draw === 'function')) &&
      !p5.instance
    ) {
      new p5();
    }
  }
};

_globalInit()
