import { gql } from 'graphql-request';


// search_items(
//   query: String
//   searchType: Search!
//   size: Int!
//   exactMatch: Boolean
//   dateRange: SearchDateRangeInput
//   boardId: ID
//   workspaceIds: [Int!]
//   assignee: AssigneeInput
//   status: String
//   boosts: BoostConfigurationInput
//   rerankingStrategy: RerankingStrategy
//   ): SearchItemsGraphQlResultsView
  
//   Search for items using various search strategies.

// X query: String - OK
// X searchType: Search! - OK
// X size: Int! - OK
// X exactMatch: Boolean - maybe false
// SearchDateRangeInput - created/updated before/after?? Should we support this?
// X boardId: ID - make required
// X workspaceIds - DROP as we require boardId
// X assignee:  AssigneInput - teams/items ????
// X status: String ????
// boosts: BoostConfigurationInput - DROP
// rerankingStrategy: RerankingStrategy - DROP

// Lexical?? - Daniel wanted or HYBRID
// Incorporate into ITEMS QUERY to get filters + sort? - But we can resolve items here if not important
// Assigned to me part - do we want it in 1 query? Might be hard! Flow should be list_users_and_teams_tool into our tool


// SEARCH KEY = 
// name contains X or 
// sorting - X
// assigned to X
// created/updated ???


// Step 1: Extend Rob PR with item_ids and filters
// Step 2: SearchKey support for 4 "old" modes + lexical search choice
// Step 3: sorting and column value selection support

export const searchQuery = gql`
  query searchQuery($query: String, $searchType: Search!, $size: Int!, $boardId: ID!, $assignee: AssigneeInput, $status: String, $includeColumns: Boolean! ) {
    search_items(query: $query, search_type: $searchType, size: $size, exactMatch: false, boardId: $boardId, assignee: $assignee, status: $status) {
      results {
        item {
          id
          name
          created_at
          updated_at
          column_values @include(if: $includeColumns) {
            id
            text
            value
          }
        }
      }
    }
  }
`;