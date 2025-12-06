import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

const IndexRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.navigate({ to: "/login" });
  }, [router]);

  return null;
};

export default IndexRedirect;
