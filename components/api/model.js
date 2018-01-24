
const knex = require('~/config.js').knex;

var insert_record = (table, body)=>{

  return new Promise((resolve, reject)=>{
    knex.table(table)
    .insert(body)
    .then((fulfilled)=>{
      resolve(fulfilled);
    })
    .catch((err)=>{
      reject(err)
    });
  });
}


var delete_record = (table, title) => {

  return new Promise((resolve, reject)=>{
    knex.table(table)
    .where('title', title)
    .del()
    .then((fulfilled)=>{
      resolve(fulfilled);
    })
    .catch((err)=>{
      reject(err)
    });
  });

}

var update_record = (table, title, data) => {

  return new Promise((resolve, reject)=>{
    knex.table(table)
    .where('title', title)
    .update(data)
    .then((fulfilled)=>{
      resolve(fulfilled);
    })
    .catch((err)=>{
      reject(err)
    });
  });


}

var search_record = (table, title, tags, category, limit, offset)=>{
  var [limit, offset] = [parseInt(limit),parseInt(offset)]

  var withField = (queryBuilder, title, tags, category, limit, offset)=>{
    if(title != undefined){
      queryBuilder.where('title', 'like', '%'+title+'%');
    }
    if(tags != undefined){
      queryBuilder.where('tags', 'like', '%'+tags+'%');
    }
    if(category != undefined){
      queryBuilder.where('category', 'like', '%'+category+'%');
    }
    if (limit != NaN) {
      queryBuilder.limit(limit);
    }
    if (offset != NaN) {
      queryBuilder.offset(offset);
    }
  }

  return new Promise((resolve, reject)=>{
    knex.table(table)
    .select()
    .modify(withField, title, tags, category, limit, offset)
    .then((data)=>{
      resolve(data);
    })
    .catch((err)=>{
      reject(err)
    });
  });
}


module.exports = {
  insert_record,
  delete_record,
  update_record,
  search_record
}
