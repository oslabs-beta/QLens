const graphql = require('graphql');
var cloneDeep = require('lodash.clonedeep');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;


const dummyData = 
 {
  users: {
   _id: {
    primaryKey: true,
    type: "Object",
    required: true,
   },
   name: {
    type: "string",
    required: true,
   },
   password: {
    type: "string",
    required: true,
   },
   username: {
    type: "string",
    required: true,
   },
  },
  conversations: {
   _id: {
    primaryKey: true,
    type: "string",
    required: true,
   },
   participants: {
    type: "Array",
    required: true,
   },
   messages: {
    type: "Array",
    required: true,
   },
  },
 }

 const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
 let obj = {}

let fieldsObj = {}
for (const property in dummyData) {
    
    for (const [key, value] of Object.entries(dummyData[property])) {
        fieldsObj[key] = {type: GraphQLString}
      }
      var deep = cloneDeep(fieldsObj);
      console.log(deep === fieldsObj);

      obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
        name: capitalize(property),
        fields: () => (deep)
    })
    console.log('HEREEEEEEEEEEEEEEEEEEEE',fieldsObj, obj)
  fieldsObj = {}
}


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // entry points into graphql queries
    user: {
      type: obj.UsersType,
      // getting one type of book. tell args that id will be passed in and it will be of type ID.
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        // return _.find(books, { id: args.id });
        return _.find({});
      },
    },
    // author: {
    //   type: AuthorType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parent, args) {
    //     return _.find(authors, { id: args.id });
    //   },
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   resolve(parent, args) {
    //     return books;
    //   },
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   resolve(parent, args) {
    //     return authors;
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})