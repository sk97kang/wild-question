import { Layout } from "components/Layout";
import { authService, firebaseInstance } from "firebase.confg";
import { useUser } from "hooks/useUser";
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import {
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const LoginPage = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.back();
    }
  }, [user]);

  const googleLogin = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const githubLogin = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <Layout title="Login">
      <div className="w-full max-w-screen-sm flex justify-center items-center mx-auto mt-40">
        <div className="grid gap-y-2 w-full max-w-xs">
          <div>
            <h1 className="text-4xl font-medium mb-4 text-center">
              🎉 환영합니다! 🎉
            </h1>
            <h3 className="text-2xl font-medium mb-8 text-center">
              엉궁해 입니다.
            </h3>
          </div>
          <GoogleLoginButton onClick={googleLogin} />
          <GithubLoginButton onClick={githubLogin} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default LoginPage;
