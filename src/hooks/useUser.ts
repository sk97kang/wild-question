import { authService } from "firebase.confg";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "stores/store";

export const useUser = () => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      let currentUser;
      if (user) {
        currentUser = {
          id: user.uid,
          name: user.displayName || "",
          image: user.photoURL || "",
        };
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { user };
};
