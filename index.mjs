
import { EventBus } from './EventBus.mjs';

const unsubscribe = EventBus.subscribe('evt', e => console.log(e));

EventBus.trigger('evt', { a: 1 });

unsubscribe();

const h = () => console.log('second subscriber');
EventBus.subscribe('evt', h);

EventBus.trigger('evt', { a: 1 });

EventBus.g();

EventBus.unsubscribe('evt', h);

EventBus.g();