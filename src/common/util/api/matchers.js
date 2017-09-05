import _ from "lodash";

export function actionTypeMatcher(type) {
  return (action) => _.get(action, "meta.type") === type;
}

export function actionIdMatcher(id) {
  return (action) => _.get(action, "meta.id") === id;
}

export function actionMatcher(type, id) {
  return (action) => actionTypeMatcher(type)(action) && actionIdMatcher(id)(action);
}
