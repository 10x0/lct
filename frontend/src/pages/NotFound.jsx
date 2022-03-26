import svg from "../assets/svgs/error404.svg";

const NotFound = () => {
  return (
    <main className="flex align-middle justify-center mt-6">
      <div>
        <img src={svg} alt="error404" />
        <h2 className="text-center mt-6">Sorry, couldn't find that page.</h2>
      </div>
    </main>
  );
};

export default NotFound;
