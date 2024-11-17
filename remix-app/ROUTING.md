# Remix routing

## How to create a route with Remix's file based routing

All routes are created under /app/routes folder. And we should name the files accordingly.

## Basic route

You can create a route by creating a file with the name of the route you want. For example, a file named `dashboard.tsx`, that's created under `app/routes` will have an URL as `localhost:5173/dashboard`.

## Nested routes

For creating nested routes you simply add a dot `.` on the file name, prefixed with the parent route. Like, a route for rendering the users of a dashoard should be on `app/routes/dashboard.users.tsx`. This will have an URL like `localhost:5173/dashboard/users`. And then, in your `app/routes/dashboard.tsx` route, you'd have to add an `<Outlet />` component where you want that route to render.

## Dynamic routes

To create a dynamic route (a route that can change depending on a param), you have to append a dolar sign `$` to the file name and name it with the URL param you want. So for creating a route to show an individual user's details you have to have a file named `app/routes/dashboard.users.$userId.tsx`. In this case, we are rendering a route depending on the `userId` param. The URL on the app will be `localhost:5173/dashboard/users/1`, where `1` is the user ID.

## Splat routes

Splat routes are like catch all routes. These routes will be accessed when users go to an unexistent route for example. This will bubble up to the root route, meaning you can have a splat route for every nested routed. You can create that route as `app/routes/dashboard.$.tsx`, with that, if someone tries to access `localhost:5173/dashboard/random-route`, they will get "redirected" to that splat route.

## Folder routes

Routes should be organized by folders for scale. Otherwise the codebase will get difficult to read and understand.

So taking the previous routes as example, to create a dashboard route you could just create a folder under the routes folder, and the file name should be named as `index.tsx`. So, `app/routes/dashboard/index.tsx` would be equivalent to `app/routes/dashboard.tsx`.

> [Important!]
> If you want that route to have nested route children, you should better name the file as `_layout.tsx`. This way Remix will be able to render the route correctly.

To nest a route on the dashboard, like for nesting the users route, you can create a new folder inside the `dashboard` folder, name it as `users` and create a `index.tsx` file. Like `app/routes/dashboard+/users/index.tsx`.

Notice the `+` sign on the dashboard folder now. This is used for when we want a "flat" folder, this is necessary for when we have nested or sibling routes on that folder.

A folder name can also be a dynamic route, so the user's detail route would be on the path `app/routes/dashboard+/users+/$userId/index.tsx`.

> Tip:
>
> If a nested route don't have more nested routes, you can simply created it on the same folder as the parent to avoid having too many nested fodler. Like, `app/routes/dashboard+/users+/$userId.tsx`.
