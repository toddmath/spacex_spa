const { ApolloServer, gql } = require("apollo-server-lambda")
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInterfaceType,
} = require("graphql")
const axios = require("axios")

const API = `https://api.spacexdata.com/v3`

const typeDefs = gql`
  schema {
    query: Query
  }

  type Diameter {
    meters: Float
    feet: Float
  }

  type Height {
    meters: Int!
    feet: Int!
  }

  type Launch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
    links: Links
  }

  type LaunchSite {
    site_id: String
    site_name: String
    site_name_long: String
  }

  type LatestLaunch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    tentative_max_precision: String
    tbd: Boolean
    launch_site: LaunchSite
    details: String
    rocket: Rocket
    links: Links
  }

  type Links {
    mission_patch: String
    mission_patch_small: String
    presskit: String
    article_link: String
    wikipedia: String
    video_link: String
    flickr_images: [String]
  }

  type Mass {
    kg: Int
    lb: Int
  }

  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
    cost_per_launch: Int
    description: String
    height: Height
    diameter: Diameter
    mass: Mass
  }

  type Query {
    launches: [Launch]
    launch(flight_number: Int): Launch
    rockets: [Rocket]
    rocket(id: Int): Rocket
    latestLaunch: LatestLaunch
  }
`

const Diameter = gql`
  type Diameter {
    meters: Float
    feet: Float
  }
`

const Height = gql`
  type Height {
    meters: Int!
    feet: Int!
  }
`

const Launch = gql`
  type Launch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    launch_site: LaunchSite
    details: String
    rocket: Rocket
    links: LaunchLink
  }
`

/** Launch Type */
const LaunchType = new GraphQLInterfaceType({
  name: "Launch",
  description: "A single launch event",
  fields: () => ({
    flight_number: {
      type: GraphQLInt,
      description: "Flight number used by spacex.",
    },
    mission_name: {
      type: GraphQLString,
      description: "Official mission name.",
    },
    launch_year: {
      type: GraphQLString,
      description: "Year when launched or launches.",
    },
    launch_date_local: {
      type: GraphQLString,
      description: "Local launches or launched year",
    },
    launch_success: {
      type: GraphQLBoolean,
      description: "Whether launch was a success.",
    },
    launch_site: {
      type: LaunchSiteType,
      description: "Site where launch occured.",
    },
    details: {
      type: GraphQLString,
      description: "Short description of launch event.",
    },
    rocket: {
      type: RocketType,
      description: "Details about the rocket used for launch event.",
    },
    links: {
      type: LaunchLinkType,
      description: "Various links to media sources, youtube, reddit, etc.",
    },
  }),
})

/** LaunchSiteType */
const LaunchSiteType = new GraphQLObjectType({
  name: "LaunchSite",
  fields: () => ({
    site_id: { type: GraphQLString },
    site_name: { type: GraphQLString },
    site_name_long: { type: GraphQLString },
  }),
})

/** LatestLaunchOnly */
const LatestLaunchType = new GraphQLObjectType({
  name: "LatestLaunch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    tentative_max_precision: { type: GraphQLString },
    tbd: { type: GraphQLBoolean },
    launch_site: { type: LaunchSiteType },
    details: { type: GraphQLString },
    rocket: { type: RocketType },
    links: { type: LaunchLinkType },
  }),
})

/** LaunchLinkType */
const LaunchLinkType = new GraphQLInterfaceType({
  name: "Links",
  description: "Media links for launches.",
  fields: () => ({
    mission_patch: { type: GraphQLString },
    mission_patch_small: { type: GraphQLString },
    presskit: { type: GraphQLString },
    article_link: { type: GraphQLString },
    wikipedia: { type: GraphQLString },
    video_link: { type: GraphQLString },
    flickr_images: { type: GraphQLList(GraphQLString) },
  }),
})

/** RocketHeightType */
const RocketHeightType = new GraphQLInterfaceType({
  name: "Height",
  description: "Rocket height in meters and feet.",
  fields: () => ({
    meters: { type: GraphQLNonNull(GraphQLInt) },
    feet: { type: GraphQLNonNull(GraphQLInt) },
  }),
})

/** RocketDiameterType */
const RocketDiameterType = new GraphQLInterfaceType({
  name: "Diameter",
  description: "Rocket diameter in meters and feet.",
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat },
  }),
})

/** RocketMassType */
const RocketMassType = new GraphQLInterfaceType({
  name: "Mass",
  description: "Rocket weight in lbs and kg.",
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt },
  }),
})

/** RocketType */
const RocketType = new GraphQLInterfaceType({
  name: "Rocket",
  description: "Spacex Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
    cost_per_launch: { type: GraphQLInt },
    description: { type: GraphQLString },
    height: { type: RocketHeightType },
    diameter: { type: RocketDiameterType },
    mass: { type: RocketMassType },
  }),
})

const resolvers = {
  Query: {
    launches: () => axios.get(`${API}/launches`).then(res => res.data),
    latestLaunch: () => axios.get(`${API}/launches/latest`).then(res => res.data),
    launch: (parent, { flight_number }) => {
      return axios.get(`${API}/launches/${flight_number}`).then(res => res.data)
    },
    rockets: () => axios.get(`${API}/rockets`).then(res => res.data),
    rocket: (parent, { id }) => {
      return axios.get(`${API}/rockets/${id}`).then(res => res.data)
    },
  },
}

/** RootQuery */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      launches: {
        type: new GraphQLList(LaunchType),
        resolve(parent, args) {
          return axios.get(`${API}/launches`).then(res => res.data)
        },
      },
      latestLaunch: {
        type: LatestLaunchType,
        resolve: (parent, args) =>
          axios.get(`${API}/launches/latest`).then(res => res.data),
      },
      launch: {
        type: LaunchType,
        args: {
          flight_number: { type: GraphQLInt },
        },
        resolve(parent, args) {
          return axios
            .get(`${API}/launches/${args.flight_number}`)
            .then(res => res.data)
        },
      },
      rockets: {
        type: new GraphQLList(RocketType),
        resolve(parent, args) {
          return axios.get(`${API}/rockets`).then(res => res.data)
        },
      },
      rocket: {
        type: RocketType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parent, { id }) {
          return axios.get(`${API}/rockets/${id}`).then(res => res.data)
        },
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get(`${API}/launches`).then(res => res.data)
      },
    },
    latestLaunch: {
      type: LatestLaunchType,
      resolve: (parent, args) =>
        axios.get(`${API}/launches/latest`).then(res => res.data),
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`${API}/launches/${args.flight_number}`)
          .then(res => res.data)
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios.get(`${API}/rockets`).then(res => res.data)
      },
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, { id }) {
        return axios.get(`${API}/rockets/${id}`).then(res => res.data)
      },
    },
  },
})

const server = new ApolloServer({
  schema: schema,
})

exports.handler = server.createHandler()

// const express = require("express")
// const graphqlHTTP = require("express-graphql")
// const cors = require("cors")
// const path = require("path")
// const schema = require("./assets/schema")
// const app = express()
// // Allow cross-origin
// app.use(cors())
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// )
// // app.use(express.static('public'))
// app.use(express.static("build"))
// app.get("*", (req, res) => {
//   // res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
//   res.sendFile(path.resolve(__dirname, "build", "index.html"))
// })
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
