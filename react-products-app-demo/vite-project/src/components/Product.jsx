import { useLocation } from "react-router-dom";

function Product() {
  const { state } = useLocation();

  return (
    <div className="flex gap-10 p-10">
      <div className="w-2/5 mt-14">
        <img
          src={state?.product?.image}
          alt=""
          className="object-contain h-96 block mx-auto"
        />
      </div>
      <div className="w-3/5">
        <p className="text-xl font-bold">{state?.product?.title}</p>
        <p>{state?.product?.description}</p>
        <p className="text-2xl font-bold text-green-600">
          ${state?.product?.price}
        </p>
      </div>
    </div>
  );
}

export default Product;