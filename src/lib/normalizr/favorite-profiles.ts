import { schema } from "normalizr";

const avatar = new schema.Entity("avatars");
const event = new schema.Entity("events", {
  recent_avatars: [avatar],
});
const profilesSchema = new schema.Entity("profiles", {
  recent_events: [event],
});

export const favoriteListSchema = [profilesSchema];
