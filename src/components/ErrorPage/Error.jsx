import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="alert alert-danger text-center py-4">
        <div
          className="p-2 bg-primary items-center text-white leading-none d-inline-flex"
          role="alert"
        >
          <span className="rounded-full bg-info text-uppercase px-2 py-1 text-xs font-weight-bold mr-3">
            Error with Server
          </span>
          <span className="font-weight-bold mr-2 text-left flex-grow-1">
            Please refresh your Browser
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </div>
      <button
        className="btn btn-outline-secondary font-weight-bold py-2 px-4 shadow"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
