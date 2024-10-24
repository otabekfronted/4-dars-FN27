import React from "react";

function ErrorPage() {
    return (
        <main className="grid min-h-[100vh] place-items-center px-8">
            <div className="text-center">
                <p className="text-9xl font-semibold text-primary">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                    Page Not Found
                </h1>
                <p className="mt-6 text-lg leading-7">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10">
                    <a className="btn btn-secondary" href="/">
                        Go Back Home
                    </a>
                </div>
            </div>
        </main>
    );
}

export default ErrorPage;
