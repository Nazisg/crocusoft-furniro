import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import del from "../../assets/icons/delete.svg";
import {
  deleteItem,
  getAllCartItems,
} from "../../redux/features/addToCartSlice";

export default function CartProducts() {
  const cartItems = useSelector((state) => state.addToCart.items);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userID_Int) {
      dispatch(getAllCartItems(userID_Int));
    }
  }, [userID_Int, dispatch]);

  const handleRemoveFromCart = (productId, colorId) => {
    if (userID_Int) {
      dispatch(
        deleteItem({
          userId: userID_Int,
          productId: productId,
          colorId: colorId,
        })
      ).then(() => {
        dispatch(getAllCartItems(userID_Int));
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-8 ">
      <div className="relative overflow-x-auto w-full">
        <table className="w-full">
          <thead className="w-full bg-[#F9F1E7] h-14">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Subtotal
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((e, idx) => (
              <tr key={idx} className="w-full overflow-x-scroll h-[100px]">
                <td>
                  <div className="flex items-center justify-center w-20 h-20">
                    <img
                      src={e?.cartItems?.[0].productImages?.imageFiles[0]}
                      className="rounded-xl w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="text-[#9F9F9F] text-[16px]">
                  {e?.cartItems?.[0].productTitle}
                </td>
                <td className="text-[#9F9F9F] text-[16px] text-center">
                  {`Rs. ${e?.cartItems?.[0].salePrice.toFixed(2)}`}
                </td>
                <td>
                  <span className="border border-[#9F9F9F] w-6 h-6 py-1 px-3 rounded-md mx-auto flex items-center justify-center select-none">
                    {e?.cartItems?.[0].count}
                  </span>
                </td>
                <td>
                  <span className="w-6 h-6 bg-[#B88E2F] text-[12px] rounded-[6px] py-1 px-3 flex items-center justify-center uppercase text-color-white mx-auto">
                    xl
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      backgroundColor:
                        e?.cartItems?.[0]?.productImages.colorHexCode,
                    }}
                    className="block w-6 h-6 bg-[green] rounded-full mx-auto"
                  ></span>
                </td>
                <td className="text-black font-medium text-base">
                  {`Rs. ${e?.cartItems?.[0].subtotal.toFixed(2)}`}
                </td>
                <td>
                  <img
                    className="w-[1.3rem] cursor-pointer ml-4 "
                    src={del}
                    onClick={() =>
                      handleRemoveFromCart(
                        e.cartItems[0].productId,
                        e.cartItems[0].productImages.id
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
