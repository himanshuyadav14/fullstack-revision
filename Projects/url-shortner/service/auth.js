const sessionIdToUserMap = new Map();

const addUserToSession = (sessionId, userId) => {
  sessionIdToUserMap.set(sessionId, userId);
};

const getUserFromSession = (sessionId) => {
  return sessionIdToUserMap.get(sessionId);
};

module.exports = { addUserToSession, getUserFromSession };
