db.blacklist.createIndex(
  {
    data: 1,
  },
  {
    expireAfterSeconds: 1800,
  }
);
