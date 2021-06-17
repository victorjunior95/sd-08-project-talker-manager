module.exports = (talk) => !talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0);
