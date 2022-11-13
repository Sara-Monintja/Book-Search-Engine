const { gql } = require('apollo-server-express');
const typeDefs = gql`

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link:
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks : [Book]
    }
    
    type Auth 
    
    
    type Query
    
    type Mutation`