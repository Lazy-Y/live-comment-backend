/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostListQueryVariables = {};
export type PostListQueryResponse = {
    readonly allPosts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"PostItem__Post">;
    }>;
};
export type PostListQuery = {
    readonly response: PostListQueryResponse;
    readonly variables: PostListQueryVariables;
};



/*
query PostListQuery {
  allPosts {
    ...PostItem__Post
  }
}

fragment PostItem__Post on Post {
  id
  user {
    id
    userName
  }
  content
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PostListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "allPosts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PostItem__Post"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PostListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "allPosts",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userName",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "297d4589127a3eb612705abe1eb3d308",
    "id": null,
    "metadata": {},
    "name": "PostListQuery",
    "operationKind": "query",
    "text": "query PostListQuery {\n  allPosts {\n    ...PostItem__Post\n  }\n}\n\nfragment PostItem__Post on Post {\n  id\n  user {\n    id\n    userName\n  }\n  content\n}\n"
  }
};
})();
(node as any).hash = '16d0d3b3b6c44de87dce7bf0d5b18559';
export default node;
