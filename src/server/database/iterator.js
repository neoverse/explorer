export default async function* iterator(query = {}) {
  const rows = await this.findAll(query);

  for (const row of rows) {
    yield row;
  }
}
