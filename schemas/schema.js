const { composeMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')
const course  = require('./../models/courseModel')
const roundScore  = require('./../models/roundscoreModel')

const courseModelTC = composeMongoose(course, {})
const RoundTC = composeMongoose(roundScore, {})

RoundTC.addRelation(
	'course',
	{
	  resolver: () => courseModelTC.mongooseResolvers.findById(),
	  prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
		_id: (source) => source.coursename,
	  },
	  projection: { coursename: true }, // point fields in source object, which should be fetched from DB
	}
  );

schemaComposer.Query.addFields({	
    roundById: RoundTC.mongooseResolvers.findById(),
	roundByIds: RoundTC.mongooseResolvers.findByIds(),
	roundOne: RoundTC.mongooseResolvers.findOne(),
	roundMany: RoundTC.mongooseResolvers.findMany(),
	roundDataLoader: RoundTC.mongooseResolvers.dataLoader(),
	roundDataLoaderMany: RoundTC.mongooseResolvers.dataLoaderMany(),
	roundCount: RoundTC.mongooseResolvers.count(),
	roundConnection: RoundTC.mongooseResolvers.connection(),
	roundPagination: RoundTC.mongooseResolvers.pagination(),

    courseById: courseModelTC.mongooseResolvers.findById(),
	courseByIds: courseModelTC.mongooseResolvers.findByIds(),
	courseOne: courseModelTC.mongooseResolvers.findOne(),
	courseMany: courseModelTC.mongooseResolvers.findMany(),
	courseDataLoader: courseModelTC.mongooseResolvers.dataLoader(),
	courseDataLoaderMany: courseModelTC.mongooseResolvers.dataLoaderMany(),
	courseCount: courseModelTC.mongooseResolvers.count(),
	courseConnection: courseModelTC.mongooseResolvers.connection(),
	coursePagination: courseModelTC.mongooseResolvers.pagination(),

});


schemaComposer.Mutation.addFields({
	roundCreateOne: RoundTC.mongooseResolvers.createOne(),
	roundCreateMany: RoundTC.mongooseResolvers.createMany(),
	roundUpdateById: RoundTC.mongooseResolvers.updateById(),
	roundUpdateOne: RoundTC.mongooseResolvers.updateOne(),
	roundUpdateMany: RoundTC.mongooseResolvers.updateMany(),
	roundRemoveById: RoundTC.mongooseResolvers.removeById(),
	roundRemoveOne: RoundTC.mongooseResolvers.removeOne(),
	roundRemoveMany: RoundTC.mongooseResolvers.removeMany(),

    courseCreateOne: courseModelTC.mongooseResolvers.createOne(),
	courseCreateMany: courseModelTC.mongooseResolvers.createMany(),
	courseUpdateById: courseModelTC.mongooseResolvers.updateById(),
	courseUpdateOne: courseModelTC.mongooseResolvers.updateOne(),
	courseUpdateMany: courseModelTC.mongooseResolvers.updateMany(),
	courseRemoveById: courseModelTC.mongooseResolvers.removeById(),
	courseRemoveOne: courseModelTC.mongooseResolvers.removeOne(),
	courseRemoveMany: courseModelTC.mongooseResolvers.removeMany(),
});
module.exports =  schemaComposer.buildSchema()
