export const buildServerSideRedirect = (destination: string, permanent = false) => {
  return {
    redirect: {
      permanent,
      destination,
    },
  };
};
