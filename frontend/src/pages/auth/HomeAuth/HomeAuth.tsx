import useUserStore from "../../../stores/userStore";

const HomeAuth = () => {
  const { user } = useUserStore();

  return (
    <div>
      <p>{user!.email}</p>
      <p>{user!.id}</p>
      <p>{user!.name}</p>
    </div>
  );
};

export default HomeAuth;
