interface Props {
  text: string;
  variables: any;
}

async function fetchGraphQL({ text, variables }: Props) {
  // Fetch data from GitHub's GraphQL API:
  const response = await fetch('https://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
