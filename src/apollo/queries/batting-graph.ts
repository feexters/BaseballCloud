import gql from "graphql-tag";

export const BATTING_GRAPH = gql`
  query BattingGraph($input: FilterGraphInput!) {
    batting_graph(input: $input) {
      graph_rows
    }
  }
`;
