const router = require("express").Router();
const service = require("../services/news");


  router.get('/', (req, res, next) => {
    return service
    .getAllNewsUI()
    .then((data) => {
        res.status(200).json({
          news: data,
        })
      })
    .catch((err) => next(err));
  })

  router.get("/", async (req, res, next) => {
    try {
      const data = await service.getAllNews(req.query);
      return res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  });
  
  router.get('/details', (req, res, next) => {
    return service
    .getNewsById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
  })

module.exports = router;