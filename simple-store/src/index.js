const Koa = require('koa');
const path = require('path');
const dotenv = require('dotenv');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const ip = require('ip');
const serve = require('koa-static');
const send = require('koa-send');
const Router = require('koa-router');
const onerror = require('koa-onerror');

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000;
const YOUR_APP_SECRET = process.env.APP_SECRET;
const YOUR_APP_ID = process.env.APP_ID;

// const DotWallet = require('dotwallet-koa');
const DotWallet = require('../../lib/index.js');
const dotwallet = DotWallet(YOUR_APP_ID, YOUR_APP_SECRET);
app.use(cors());
app.use(bodyParser());
app.use(serve('src'));
const router = new Router();
onerror(app);
/**
 *
 * ============================AUTHENTICATION============================
 *
 */

router.get('/', async (ctx) => {
  await send(ctx, '/index.html', { root: __dirname });
});
router.get('/restricted-page', async (ctx) => {
  await send(ctx, '/restricted-page.html', { root: __dirname });
});

let accessTokenStorage = ''; // These would go to your database in a real app
let refreshTokenStorage = '';

router.get('/auth', async (ctx, next) => {
  const authResponse = await dotwallet.handleAuthResponse(ctx, next, '/restricted-page/', true);
  refreshTokenStorage = authResponse.accessData.refresh_token;
  accessTokenStorage = authResponse.accessData.access_token;
});

const refreshAccessToken = (refreshTokenStorage) => {
  dotwallet.refreshAccess(refreshTokenStorage).then((result) => {
    refreshTokenStorage = result.refresh_token;
    accessTokenStorage = result.access_token;
  });
};

/**
 *
 * ============================PAYMENT============================
 *
 */

router.get('/store-front', async (ctx) => {
  await send(ctx, '/store-front.html', { root: __dirname });
});
router.get('/order-fulfilled', async (ctx) => {
  await send(ctx, '/order-fulfilled.html', { root: __dirname });
});

router.post('/create-order', async (ctx) => {
  const merchant_order_sn = ctx.request.body.merchant_order_sn;
  const order_sn = await dotwallet.handleOrder(ctx.request.body, true);
  setTimeout(async () => {
    const orderStatus = await dotwallet.getOrderStatus(merchant_order_sn, true);
    console.log('==============orderStatus==============\n', orderStatus);
  }, 1000 * 60);
  ctx.body = { order_sn };
});

router.get('/payment-result', (ctx) => {
  // the response from 'notice_uri' will be in the request queries
  console.log('==============payment-result req==============\n', ctx.request.query);
});

/**
 *
 * ============================AUTOMATIC PAYMENTS============================
 *
 */

router.get('/autopayment-store', async (ctx) => {
  await send(ctx, '/autopayment-store.html', { root: __dirname });
});

router.post('/create-autopayment', async (ctx) => {
  const orderResultData = await dotwallet.autopayment(ctx.request.body, true);
  console.log('orderResultData', orderResultData);
  ctx.body = orderResultData;
});

/**
 *
 * ============================SAVE DATA ON CHAIN============================
 *
 */

const savedDataTxns = []; // In real app could store in DB. Save a list of txns to retrieve data

router.post('/save-data', async (ctx) => {
  try {
    const data = ctx.request.body;
    // check if recieve address is dev's own
    console.log('==============data==============\n', data);

    const getHostedData = await dotwallet.getHostedAccount('BSV', true);
    console.log('==============getHostedData==============', getHostedData);

    const getBalanceData = await dotwallet.hostedAccountBalance('BSV', true);
    console.log('==============getBalanceData==============', getBalanceData);

    if (getBalanceData.confirm + getBalanceData.unconfirm < 700) throw 'developer wallet balance too low';

    const saveDataData = await dotwallet.saveData(data, 0, true);
    console.log('==============saveDataData==============', saveDataData);
    savedDataTxns.push({
      ...saveDataData.data,
      timestamp: new Date(),
      tag: 'banana-price',
    }); //in a real app this would go to DB
    ctx.body - saveDataData.data;
  } catch (err) {
    console.log(err.msg, err.data, err.message, err.response);
    console.log('==============err==============\n', err);
    ctx.body = err;
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () =>
  console.log(
    `DotWallet example app listening at ${
      process.env.NODE_ENV === 'production' ? 'production host' : ip.address() + ':' + PORT
    }`,
  ),
);
