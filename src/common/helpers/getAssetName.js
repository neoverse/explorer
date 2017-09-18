import _ from "lodash";

function getDefaultNameEntry(asset) {
  const lang = _.keys(asset.name)[0];
  return asset.name[lang];
}

export default function getAssetName(asset, lang) {
  const nameEntry = _.find(asset.name, { lang }) || getDefaultNameEntry(asset);
  return nameEntry.name;
}
