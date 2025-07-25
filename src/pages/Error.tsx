import { isRouteErrorResponse, useRouteError } from "react-router";
import { motion } from "framer-motion";

export function ErrorPage() {
    const error = useRouteError();
    const homePage = <motion.span
        onClick={() => window.location.href = "/"}
        className="text-secondary cursor-pointer"
        whileHover={{ color: "#3b82f6" }}
    >Home Page</motion.span>

    if (isRouteErrorResponse(error)) {
        return (
            <div className="flex justify-center items-center flex-col gap-6 my-32 sm:my-48 py-12 sm:py-18 w-screen bg-background-primary border-t-4 border-b-4 border-background-secondary">
                <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-2 justify-center items-center">
                    <h1 className="text-white text-4xl sm:text-5xl font-semibold h1-shadow">
                        <span className="text-primary">{error.status}</span> {error.statusText}
                    </h1>
                    <img src="/src/assets/error-icon.png" alt="Sad cloud" width={75} />
                </div>
                <div className="flex flex-col gap-2 text-primary-text mt-4 text-center">
                    <p>{error.data}</p>
                    <p>Go back to the {homePage}.</p>
                </div>
            </div>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
                <p>The stack trace is:</p>
                <pre>{error.stack}</pre>
                <p>Go back to the {homePage}.</p>
            </div>
        );
    } else {
        return <div>
            <h1>Unknown Error </h1>
            <p>Go back to the {homePage}.</p>
        </div>;
    }
}

export default ErrorPage;