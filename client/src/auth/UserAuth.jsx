import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const UserAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  if(user){
    setLoading(false);
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    if (!user) {
        navigate("/login");
    }
  }, [user]);
  return <>{children}</>;
};

export default UserAuth;
