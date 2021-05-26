import { schema } from "normalizr";

const avatar = new schema.Entity("avatars");
const event = new schema.Entity("events", {
  recent_avatars: [avatar],
});

export const eventsListSchema = [event];