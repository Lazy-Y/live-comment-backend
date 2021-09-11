/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostItem__Post = {
    readonly id: number;
    readonly user: {
        readonly id: number;
        readonly userName: string;
    };
    readonly content: string;
    readonly " $refType": "PostItem__Post";
};
export type PostItem__Post$data = PostItem__Post;
export type PostItem__Post$key = {
    readonly " $data"?: PostItem__Post$data;
    readonly " $fragmentRefs": FragmentRefs<"PostItem__Post">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostItem__Post",
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
  "type": "Post",
  "abstractKey": null
};
})();
(node as any).hash = 'd40c7ebe3e4d66abb519f828ae083d91';
export default node;
