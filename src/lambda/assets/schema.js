const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql")
const axios = require("axios")

const API = `https://api.spacexdata.com/v3`

/** Launch Type */
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    launch_site: { type: LaunchSiteType },
    details: { type: GraphQLString },
    rocket: { type: RocketType },
    links: { type: LaunchLinkType },
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

const LaunchLinkType = new GraphQLObjectType({
  name: "Links",
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

const RocketHeightType = new GraphQLObjectType({
  name: "Height",
  fields: () => ({
    meters: { type: GraphQLNonNull(GraphQLInt) },
    feet: { type: GraphQLNonNull(GraphQLInt) },
  }),
})

const RocketDiameterType = new GraphQLObjectType({
  name: "Diameter",
  fields: () => ({
    meters: { type: GraphQLFloat },
    feet: { type: GraphQLFloat },
  }),
})

const RocketMassType = new GraphQLObjectType({
  name: "Mass",
  fields: () => ({
    kg: { type: GraphQLInt },
    lb: { type: GraphQLInt },
  }),
})

const RocketType = new GraphQLObjectType({
  name: "Rocket",
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

module.exports = new GraphQLSchema({
  query: RootQuery,
})
