import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      wishlist: [],
      cart: [],
      setUser: (user) => set({ user }),
      setWishlist: (wishlist) => set({ wishlist }),
      addToWishlist: (product) =>
        set((state) => {
          const newWishlist = [...state.wishlist, product];
          return { wishlist: newWishlist };
        }),
      removeFromWishlist: (productID) =>
        set((state) => {
          const newWishlist = state.wishlist.filter(
            (item) => item._id !== productID
          );
          return { wishlist: newWishlist };
        }),
      setCart: (cart) => set({ cart }),
      addItemToCart: (product, productCount = 1) => {
        return set((state) => {
          let newCart = [];
          if (state.cart.length > 0) {
            const isExistInCart = state.cart.some(
              (item) => item.id === product.id
            );

            if (isExistInCart) {
              const newCart = state.cart.map((item) => {
                if (item.id === product.id) {
                  return { ...item, count: item.count + productCount }; // Return a new updated object
                }
                return item; // Return the original item if the condition is not met
              });
              return { cart: newCart };
            }
          }
          newCart = [...state.cart, product];

          return { cart: newCart };
        });
      },
      removeFromCart: (productID, deleteItem = false) =>
        set((state) => {
          const deletedProduct = state.cart.filter(
            (item) => item.id === productID
          );

          if (deletedProduct[0].count > 1 && !deleteItem) {
            const newCart = state.cart.map((item) => {
              if (item.id === productID) {
                return { ...item, count: item.count - 1 };
              }
              return item;
            });

            return {
              cart: newCart,
            };
          }
          const newCart = state.cart.filter((item) => item.id !== productID);

          return {
            cart: newCart,
          };
        }),
    }),
    {
      name: "store-data", // Key name in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useStore;
