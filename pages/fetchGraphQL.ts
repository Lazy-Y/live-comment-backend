// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text: any, variables: any) {
  const body = JSON.stringify({
    query: text,
    variables,
  });

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
