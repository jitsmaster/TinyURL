# TinyURL Service

The TinyURL service allows you to shorten long URLs into shorter, more manageable links. This README provides instructions on how to use the TinyURL service effectively.

## Getting Started

Make .NET 8 is installed on the machine running this service.

To use the TinyURL service, follow these steps:

1. Clone or download the TinyURL repository from [GitHub](https://github.com/jitsmaster/TinyURL).
2. Install the required dependencies by running `npm install` in the project "client" directory.
3. Build client side React app by "cd" into "client" directory, and run "npm run build".
4. Go back to project folder and execute "dotnet run"
5. Visit `http://localhost:7231` on your browser;

## Client UI

TinyURL service provides a user interface to add, delete, and list short url entries.

Listing of short urls allows using a paginated approach to display 10 items per page. It also provides the way to filter listing by short url or original url.


## API

TinyURL provided the following REST endpoints:
/TinyURL/add
/TinyURL/remove
/TinyURL/retrieve
/TinyURL/list

To test the REST API, please use the swagger UI: `http://localhost:7231/swagger/index.html`.

Note: Using "retrieve" endpoint to simulate the short url is "clicked" (visisted).

## Architect

Server side: ASP.NET Core on .NET 8
WebAPI controller with singleton injected TinyURL service.
Directly using static index.html at wwwwroot folder as home page.

Client side: React 18 with React Redux 9.
Client side follows "Redux" pattern for global state management.
Also, using Thunk to support async-based state manipulations, with extra reducers.

## Cut-backs that should be in production code
1. Keyboard accessibility feature on the UI.
2. Client-side validations.
3. Using alert to display messages instead of snackbar.
4. CSS fine-tuning.
5. Persistent storage.
