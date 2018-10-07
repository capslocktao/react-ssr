import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux'

export const render = (req, store, routes ) => {
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <div>
                    {routes.map(route => (
                        <Route key={route.path} {...route} />
                    ))}
                </div>
            </StaticRouter>
        </Provider>
    ))
    return `
            <html>
                <head>
                  <title>SSR</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                </body>
                <script >
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <script src="/index.js"></script>
            </html>
        `
}