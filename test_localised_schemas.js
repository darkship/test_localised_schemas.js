var baseSchema=new SimpleSchema({
  baseValue:{
    type:String
  }
})

var clientSchema=new SimpleSchema({
  clientValue:{
    type:String,
    optional:true
  }
})

var serverSchema=new SimpleSchema({
  serverValue:{
    type:String,
    optional:true,
    autoValue:function(){
      return "serverValue"
    }
  }
})

var myCollection=new Mongo.Collection("mycollection")

if (Meteor.isClient) {
  myCollection.attachSchema(new SimpleSchema([baseSchema,clientSchema]))


  myCollection.insert(
      {
          baseValue:"baseValue",
          clientValue:"clientValue"
      },{filter:false})
}

if (Meteor.isServer) {
  myCollection.attachSchema(new SimpleSchema([baseSchema,serverSchema]))

    myCollection.allow({
        insert:function()
        {
            return true
        }
    })

}
