/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type PostListQueryVariables = {||};
export type PostListQueryResponse = {|
  +allPosts: $ReadOnlyArray<{|
    +id: number
  |}>
|};
export type PostListQuery = {|
  variables: PostListQueryVariables,
  response: PostListQueryResponse,
|};
*/


/*
query PostListQuery {
  allPosts {
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "allPosts",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PostListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PostListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5e6df24667907c18662da1978013ca4c",
    "id": null,
    "metadata": {},
    "name": "PostListQuery",
    "operationKind": "query",
    "text": "query PostListQuery {\n  allPosts {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ba22d715fbef0d10398ade8ac9a9715a';

module.exports = node;
