/**
 * Implements EventBus pattern.
 *
 * This service allows communication between different components, irrelevant of their hierarchy
 *
 * Usage:
 *
 * // Subscribe to an event
 * EventBus.subscribe('<namespace>.<event_name>', callback);
 *
 * // Trigger an event
 * EventBus.trigger('<namespace>.<event_name>', payload);
 *
 * // Unsubscribe of an event
 * EventBus.unsubscribe('<namespace>.<event_name>', callback);
 */

interface SubscriptionPayload {
  [key: string]: any;
}

type SubscriptionFn = (payload?: SubscriptionPayload) => any;

const subscriptions: { [key: string]: SubscriptionFn[] } = {};

/**
 * Subscribe to an event in the EventBus
 * @param eventType The name of the event
 * @param callback The callback function
 */
function subscribe(eventType: string, callback: SubscriptionFn) {
  if (!subscriptions[eventType]) subscriptions[eventType] = [];

  subscriptions[eventType].push(callback);

  return unsubscribe.bind(null, eventType, callback);
}

/**
 * Trigger an even from the EventBus
 * @param eventType The name of the event to trigger
 * @param payload (optional) The payload object to send
 */
function trigger(eventType: string, payload?: SubscriptionPayload) {
  if (!subscriptions[eventType]) return;

  subscriptions[eventType].forEach(f => f(payload));
}

/**
 * Unsubscribe from the event. Always call this method during cleanup phase.
 * @param eventType The name of the event
 * @param callback The callback function
 */
function unsubscribe(eventType: string, callback: SubscriptionFn) {
  subscriptions[eventType] = subscriptions[eventType].filter(
    f => f !== callback
  );

  if (subscriptions[eventType].length === 0) {
    delete subscriptions[eventType];
  }
}

export const EventBus = {
  subscribe,
  trigger,
  unsubscribe,
};
