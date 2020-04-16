/**
 * subscriptions = {
 *   evt1: [callback1, callback2,...],
 *   evt2: [callback1, callback2,...],
 *   ...
 * }
 *
 */

const subscriptions = {};

function subscribe(eventType, callback) {
  if (!subscriptions[eventType]) subscriptions[eventType] = [];

  subscriptions[eventType].push(callback);

  return unsubscribe.bind(null, eventType, callback);
}

function trigger(eventType, payload) {
  if (!subscriptions[eventType]) return;

  subscriptions[eventType].forEach(f => f(payload));
}

function unsubscribe(eventType, callback) {
  subscriptions[eventType] = subscriptions[eventType].filter(
    f => f !== callback
  );

  if (subscriptions[eventType].length === 0) {
    delete subscriptions[eventType];
  }
}

function g() {
  console.log(subscriptions)
}

export const EventBus = {
  subscribe,
  trigger,
  unsubscribe,
  g,
};
