import { create } from "zustand";

const useStore = create((set) => ({
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
  addToCart: (product) =>
    set((state) => {
      const newCart = [...state.cart, product];
      return { cart: newCart };
    }),
  removeFromCart: (productID) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.product !== productID);
      return { cart: newCart };
    }),
}));

export default useStore;
