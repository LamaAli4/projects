export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-lg bg-secondary-lighter/20 relative">
      <div className="absolute top-lg left-lg">
        <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>

      <h1 className="text-3xl font-bold mb-md text-error-dark">
        Sorry, page not found!
      </h1>

      <p>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </p>

      <img
        src="/assets/image.png"
        alt="404"
        className="w-80 h-auto my-lg rounded-lg shadow-md"
      />

      <a
        href="/"
        className="px-lg py-sm bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark hover:shadow-md transition"
      >
        Go to home
      </a>
    </div>
  );
}
