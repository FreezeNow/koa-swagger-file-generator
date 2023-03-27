const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const swaggerConfig = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ['*.js'],
  output: {
    type: 'yaml',
    name: 'swagger',
  }, //Output swagger api file config
};

// 模块
/**
 * 
 * 获取模块列表
 * @route GET /module/list
 * @summary dasdasd
 * @group module - Operations about user
 * @param {string} [pageNo.query.required=1] - now
 * @param {string} pageSize.query.required - 分页大小
 * @returns {string} 200 - 操作成功
 */
router.get('/hi', async (ctx) => {
  ctx.body = 'Hello World';
});

const { swaggerServe, generateSwaggerFile } = require('../index');
const koaSwagger = swaggerServe(app);
generateSwaggerFile(swaggerConfig);
koaSwagger(swaggerConfig);
app.use(router.routes());
app.listen(3000);
