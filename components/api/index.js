var express = require('express');
const url = require('url');
var showdown  = require('showdown')
var model = require('./model');

var router = express.Router();

var err_obj = new Error();

var url_validation = (_url)=>{
  pathname = url.parse(_url).pathname
  if(pathname.slice(1) == 'projects'){
    return "projects_details"
  }else if (pathname.slice(1) == 'trainings') {
    return "trainings_details"
  }
}

var upload_record =  function(req, res, next) {
  table_name = url_validation(req.url);
  let body = req.body;
  let converter = new showdown.Converter({
    tables: true
  });
  html      = converter.makeHtml(body.description);
  body.description = JSON.stringify(html);

  // console.log(body);
  if(!body.title){
    err_obj.code = "Title should not be empty";
    err_obj.code = "TITLE_EMPTY";
    return next(err_obj);
  }
  model.insert_record(table_name, body)
  .then((fulfilled)=>{
    result["message"] = "OK";
    result["data"] = fulfilled;
    res.json(result);
  })
  .catch((err)=>{
      next(err);
  })
}

var delete_record = function(req, res, next) {
  table_name = url_validation(req.url)
  if(!req.query.title){
      err_obj.code = "Title should not be empty";
      err_obj.code = "TITLE_EMPTY";
      return next(err_obj);
  }else{
      let title = req.query.title;
      model.delete_record(table_name, title)
      .then((fulfilled) => {
        result["message"] = "OK";
        result["data"] = fulfilled;
        res.json(result);
      })
      .catch((err)=>{
        next(err);
      })
  }
}

var update_record = function(req, res, next) {
  table_name = url_validation(req.url)
  if(!req.query.title){
      err_obj.code = "Title should not be empty";
      err_obj.code = "TITLE_EMPTY";
      return ext(err_obj);
  }else if (!req.body) {
      result["message"] = "No Data to upload";
      res.status(500).json(result);
  }else {
    let title = req.query.title;
    let body = req.body;
    model.update_record(table_name, title, body)
    .then((fulfilled) => {
      result["message"] = "OK";
      result["data"] = fulfilled;
      res.json(result);
    })
    .catch((err)=>{
      next(err);
    })
  }
}

var get_records = function(req, res, next) {
  table_name = url_validation(req.url)
  let title = req.query.title;
  let tags = req.query.tags;
  let category = req.query.category;
  let limit = req.query.limit;
  let offset = req.query.offset;

  model.search_record(table_name, title, tags, category, limit, offset)
  .then((data)=>{
    result["message"] = "OK";
    result["data"] = data;
    res.json(result);
  })
  .catch((err)=>{
    next(err);
  })
}

var result = {}

router.post('/projects', upload_record);
router.post('/trainings', upload_record);

router.delete('/projects', delete_record);
router.delete('/trainings', delete_record);

router.put('/projects', update_record);
router.put('/trainings', update_record);

router.get('/projects', get_records);
router.get('/trainings', get_records);

router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  if(err.code == 'ER_DUP_ENTRY'){
    res.locals.message = "Duplicate record, Record already exists";
  }else if(err.code == 'TITLE_EMPTY'){
    res.locals.message = "Title should not be empty";
  }else if(err.code){
    res.locals.message = err.code;
  }else {
    res.locals.message = "error";
  }
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:res.locals.message})
  // res.render(err);
});

module.exports = router;
