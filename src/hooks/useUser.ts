import { authService } from "firebase.confg";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        const currentUser = {
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

  return {
    user,
    setUser,
  };
};
