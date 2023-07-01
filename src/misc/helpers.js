export function getNameInitials(name) {
  const splitName = name?.toUpperCase().split(" ");

  if (splitName?.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }

  return splitName && splitName[0][0];
}

export function transformToArray(snapVal) {
  return snapVal ? Object.keys(snapVal) : [];
}

export function transformArray(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map((roomId) => {
        return { ...snapVal[roomId], id: [roomId] };
      })
    : [];
}

export const getUserUpdates = async (userId, keyToUpdate, value, db) => {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;
  const getMsgs = db
    .ref("/messages")
    .orderByChild("author/uid")
    .equalTo(userId)
    .once("value");

  const getRooms = db
    .ref("/rooms")
    .orderByChild("lastMessage/author/uid")
    .equalTo(userId)
    .once("value");

  const [mSnaps, rSnaps] = await Promise.all([getMsgs, getRooms]);

  mSnaps.forEach((msgSnap) => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  rSnaps.forEach((roomSnap) => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
};
