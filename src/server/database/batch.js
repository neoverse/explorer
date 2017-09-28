export default async function* batch(query = {}) {
  const batchSize = query.batchSize || 1000;
  const params = { ...query, offset: 0, limit: batchSize };

  while (true) {
    const results = await this.findAll(params);

    if (results.length === 0) {
      break;
    }

    for (const result of results) {
      yield result;
    }

    params.offset += batchSize;
  }
}
