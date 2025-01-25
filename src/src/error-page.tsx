import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div id="error-page" className='text-center justify-center items-center flex flex-col h-full absolute gap-4 w-full'>
      <p className='text-4xl'>Oops!</p>
      <p>We can't find that page.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}