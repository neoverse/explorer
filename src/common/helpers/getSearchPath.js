export default function getSearchPath(term) {
  return `/search/${encodeURIComponent(term)}`;
}
