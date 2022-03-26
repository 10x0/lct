import { ShoppingCartIcon } from "@heroicons/react/outline";
import { CheckIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { user } = useSelector((state) => state.authState);
  return (
    <div className="h-5/6 flex">
      <div className="w-1/2 m-4 bg-blue-300 rounded-xl p-4">
        <p className="text-bold text-4xl">New arrivals</p>
      </div>
      <div className="flex flex-col w-1/2 m-4 gap-4">
        <div className="h-1/2 w-full rounded-xl p-4 flex gap-4">
          <div className="h-full w-2/6 bg-white border-2 border-gray-100 rounded-3xl flex flex-col relative">
            <button className="m-2 p-2 rounded-xl font-black bg-gray-200 absolute right-0">
              <HeartIcon className="h-7 fill-red-400" />
            </button>
            <img
              alt=""
              className="h-full rounded-t-3xl object-cover"
              src="https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
            />
            <div className="p-4">
              <div className="flex justify-between pt-2">
                <div>
                  <p className="font-medium">Monstera DK Var (L)</p>
                  <p className="ratings flex">
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-gray-400" />
                    <StarIcon className="h-4 fill-gray-400" />
                  </p>
                  <p className="font-medium">$123</p>
                </div>
                <button className="m-2 p-2 border-gray-100 border-2 rounded-xl font-black  bg-gray-100">
                  <ShoppingCartIcon className="h-7" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-full w-2/6 bg-white border-2 border-gray-100 rounded-3xl flex flex-col relative">
            <button className="m-2 p-2 rounded-xl font-black bg-gray-200 absolute right-0">
              <HeartIcon className="h-7 fill-white" />
            </button>
            <img
              alt=""
              className="h-full rounded-t-3xl object-cover"
              src="https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
            />
            <div className="p-4">
              <div className="flex justify-between pt-2">
                <div>
                  <p className="font-medium">Monstera DK Var (L)</p>
                  <p className="ratings flex">
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-red-400" />
                    <StarIcon className="h-4 fill-gray-400" />
                    <StarIcon className="h-4 fill-gray-400" />
                  </p>
                  <p className="font-medium">$123</p>
                </div>
                <button className="m-2 p-2 border-gray-100 border-2 rounded-xl font-black  bg-gray-100">
                  <CheckIcon className="h-7 fill-green-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow rounded-xl p-4 border-2">
          <p className="text-bold text-4xl">Visit our store</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
