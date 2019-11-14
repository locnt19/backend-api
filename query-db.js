// SELECT id, count(*) FROM emloyees GROUP BY type
db.emloyees.aggregate([{
  $group: {
    _id: "$type",
    count: {
      $sum: 1
    }
  }
}])

// SELECT id, name, type FROM emloyees WHERE type = 3
db.emloyees.aggregate([{
  $match: {
    type: {
      $eq: 3
    }
  }
}, {
  $project: {
    _id: "$_id",
    name: "$name",
    type: "$type"
  }
}])


// SELECT * FROM users (format ISODate to Datetime)
db.users.aggregate([{
  $project: {
    _id: "$_id",
    username: "$username",
    permission: "$permission",
    owner: "$owner",
    createdAt: {
      $dateToParts: {
        date: "$createdAt",
        timezone: "+07:00"
      }
    },
    updatedAt: {
      $dateToParts: {
        date: "$updatedAt",
        timezone: "+07:00"
      }
    },
  }
}])