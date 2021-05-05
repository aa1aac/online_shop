import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query {
    user {
      id
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(ME_QUERY);
  // console.log(loading);
  // console.log(error);
  console.log(data);
  return <div> Hello</div>;
}
