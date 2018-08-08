var dev = require('./webpack.dev.config')
var base = require('./webpack.base.config')

var express = require('express')
var app = express();
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
let webpackHotMiddleWare = require('webpack-hot-middleware');

let webpackconfig = Object.assign({}, dev, base); // console.log(webpackconfig);
var compiler = webpack(webpackconfig); // console.log(compiler);

app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackconfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        },
        historyApiFallback: true
    })
);
app.use(webpackHotMiddleWare(compiler));


/*app.get("*", (req, res) => {
    const context = {};
    const _html = renderToString(
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <h1>首页</h1>
                        <Switch>
                            {routes.map((route, i) => <RouteWithSubRoutes key={i} excat={route.excat}   {...route} />)}
                        </Switch>

                    </div>
                </BrowserRouter>
            </Provider>,
        </div>
    );

    res.status(200).send(_html);

});*/

app.listen(9000, () => {
    console.log('服务器启动成功')
})