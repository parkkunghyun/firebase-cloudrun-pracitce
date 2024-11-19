import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveCartToFirestore = async (userId, cart) => {
    if (!userId) {
        throw new Error('User ID is required to save the cart.');
    }
    const cartDocRef = doc(db, 'carts', userId);
    await setDoc(cartDocRef, { cart });
  };

export const getCartFromFirestore = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required to save the cart.');
    }
    const cartDocRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(cartDocRef);
    return cartDoc.exists() ? cartDoc.data().cart : [];
  }