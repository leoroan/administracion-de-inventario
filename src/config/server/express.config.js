// express-config.js
import express from 'express';
import session from 'express-session';
import handlebars from "express-handlebars";
import __dirname from "../../utils.js";
import myDataSource from '../db/typeorm.config.js';
import UserEntity from '../../models/user.js';

export default function configureExpress(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.engine("hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "main",
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
    })
  );

  app.set("view engine", "hbs");
  app.set("views", `${__dirname}/views`);

  app.use(express.static(`${__dirname}/public`));

  app.use(session({
    secret: 'mtInventory',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //  en producción cambia esto a true
      maxAge: 1800000
    }
  }));

  app.get('/', (req, res) => {
    res.render("index");
  });

  app.get('/users', async (req, res) => {
    const users = await myDataSource.getRepository(UserEntity).find()
    res.json(users)
  })

  app.get("/users/:id", async function (req, res) {
    const results = await myDataSource.getRepository(UserEntity).findOneBy({
      id: req.params.id,
    })
    return res.send(results)
  })

  app.post("/users", async function (req, res) {
    console.log(req.body);
    const user =  myDataSource.getRepository(UserEntity).create(req.body)
    const results = await myDataSource.getRepository(UserEntity).save(user)
    return res.send(results)
  })

  // app.put("/users/:id", async function (req, res) {
  //   const user = await myDataSource.getRepository(User).findOneBy({
  //     id: req.params.id,
  //   })
  //   myDataSource.getRepository(User).merge(user, req.body)
  //   const results = await myDataSource.getRepository(User).save(user)
  //   return res.send(results)
  // })

  // app.delete("/users/:id", async function (req, res) {
  //   const results = await myDataSource.getRepository(User).delete(req.params.id)
  //   return res.send(results)
  // })

  app.get('*', (req, res) => {
    res.status(404).render("error404");
  });

}
