'use strict';

import xpath from 'xpath';
import { curry, curryN, map, pairs, memoize, partialRight, flow, first, last, isNull } from 'lodash-fp';

const flow2 = flow(flow, curryN(2));
const flow3 = flow(flow, curryN(3));

const OR  = ' or ';
const AND = ' and ';

const self =
  (tagName) => 'self::' + tagName;

const keyByIdAndSelector =
  (selector, node) =>
    `${node.getAttribute('xml:id')}/${selector}`;

const memoizeByIdAndSelector =
  partialRight(memoize, keyByIdAndSelector);

export const select = memoizeByIdAndSelector(::xpath.select);
export const selectOne = flow2(select, first);

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
    first(getTagWithAttributes('*', { id }, node)));

/** Descendants */

export const descendants = curry(
  (tagName, node) =>
    select(`.//${tagName}`, node));

export const children = curry(
  (tagName, node) =>
    select(`./${tagName}`, node));

export const firstChild = flow2(children, first);

export const lastChild =
  (tagName, node) =>
    flow2(children(tagName), last)(node);

export const firstDescendant = firstChild;
export const lastDescendant  = flow2(descendants, last);

/** Ancestors */

// Ordered by closest to farthest
export const ancestors = curry(
  (tagName, node) =>
    select(`./ancestor::${tagName}`, node).reverse());

export const firstAncestor = flow2(ancestors, first);
export const lastAncestor  = flow2(ancestors, last);

export const parent =
  (node) =>
    selectOne('./..', node);

/** Preceding  */

export const preceding = curry(
  (tagName, node) =>
    select(`./preceding::${tagName}`, node));

export const firstPreceding = flow2(preceding, first);

export const precedingWithAttributes = curry(
  (tagName, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    return selectOne(`./preceding::${tagName}[${attrFilterString}]`, node);
  });

export const firstPrecedingWithAttributes = flow3(precedingWithAttributes, first);

export const precedingSiblings = curry(
  (tagName, node) =>
    select(`./preceding-sibling::${tagName}`, node));

/** Following */

export const following = curry(
  (tagName, node) =>
    select(`./following::${tagName}`, node));

export const firstFollowing = flow2(following, first);

export const followingWithAttributes = curry(
  (tagName, attrFilterObj, node) => {
    let attrFilterString = makeAttrFilterString(attrFilterObj);
    return select(`./following::${tagName}[${attrFilterString}]`, node);
  });

export const firstFollowingWithAttributes = flow3(followingWithAttributes, first);

export const followingSiblings = curry(
  (tagName, node) =>
    select(`./following-sibling::${tagName}`, node));