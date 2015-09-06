'use strict';

import xpath from 'xpath';
import { curry, map, pairs, memoize, partialRight, flow, first, last, isNull } from 'lodash-fp';

const OR = ' or ';
const AND = ' and ';

const self =
  (tagName) => 'self::' + tagName;

const keyByIdAndSelector =
  (selector, node) =>
    `${node.getAttribute('xml:id')}/${selector}`;

const memoizeByIdAndSelector =
  partialRight(memoize, keyByIdAndSelector);

export const select = memoizeByIdAndSelector(::xpath.select);
export const selectOne = flow(select, first);

const attrFilter =
  ([attrName, attrValue]) =>
    `@${attrName}` + (isNull(attrValue) ? '' : `='${attrValue}'`);

const makeAttrFilterString =
  (attrFilterObj) =>
    map(attrFilter, pairs(attrFilterObj)).join(AND);

export const getTagWithAttributes = curry(
  (tagName, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    let selector = `.//${tagName}[${attrFilterString}]`;
    return select(selector, node);
  });

export const getTagsWithAttributes = curry(
  (tagNames, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    let tagNamesString = tagNames.map(self).join(OR);
    let selector = `.//*[(${tagNamesString}) and (${attrFilterString})]`;
    return select(selector, node);
  });

export const getById = curry(
  (id, node) =>
    getTagWithAttributes('*', { id }, node));

export const parent =
  (node) =>
    selectOne('./..', node);

export const firstNode = curry(
  (tagName, node) =>
    first(select(`./${tagName}`, node)));

export const lastNode = curry(
  (tagName, node) =>
    last(select(`.//${tagName}`, node)));

export const children = curry(
  (tagName, node) =>
    select('./${tagName}', node));

export const firstChild = firstNode;

export const lastChild =
  (tagName, node) =>
    flow(children(tagName), last)(node);

/** Descendants */

export const descendants = curry(
  (tagName, node) =>
    select(`.//${tagName}`, node));

export const descendant = curry(
  (tagName, node) =>
    selectOne(`.//${tagName}`, node));

/** Ancestors */

export const ancestors = curry(
  (tagName, node) =>
    select(`./ancestor::${tagName}`, node));

export const ancestor = curry(
  (tagName, node) =>
    selectOne(`./ancestor::${tagName}`, node));

/** Preceding  */

export const preceding = curry(
  (tagName, node) =>
    select(`./preceding::${tagName}`, node));

export const firstPreceding = curry(
  (tagName, node) =>
    selectOne(`./preceding::${tagName}`, node));

export const firstPrecedingWithAttributes = curry(
  (tagName, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    return selectOne(`./preceding::${tagName}[${attrFilterString}]`, node);
  });

export const precedingSiblings = curry(
  (tagName, node) =>
    select(`./preceding-sibling::${tagName}`, node));

/** Following */

export const following = curry(
  (tagName, node) =>
    select(`./following::${tagName}`, node));

export const firstFollowing = curry(
  (tagName, node) =>
    selectOne(`./following::${tagName}`, node));

export const firstFollowingWithAttributes = curry(
  (tagName, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    return selectOne(`./following::${tagName}[${attrFilterString}]`, node);
  });

export const followingSiblings = curry(
  (tagName, node) =>
    select(`./following-sibling::${tagName}`, node));