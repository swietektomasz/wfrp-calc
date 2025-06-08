export const createUniqueId = () =>
  `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}-${Math.random()
    .toString(36)
    .substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`;
