import fetchGraphQL from "pages/fetchGraphQL";
import { useEffect } from "react";

const TestRelayFetch = () => {
  console.log('render test fetch');

  useEffect(() => {
    console.log('use effect');

    let isMounted = true;
    fetchGraphQL(`
  query PostListQuery{
  allPosts{
    # ...PostItem__Post
    id
  }
    `, {}).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      console.log(response);
      if (!isMounted) {
        return;
      }

    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchGraphQL]);
  return <div>Test Fetch</div>
}
export default TestRelayFetch;