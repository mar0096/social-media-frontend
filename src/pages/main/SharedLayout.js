import { Outlet } from "react-router-dom";
import { Navbar, BigSidebar, RightBar, BottomBar } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useEffect } from "react";
function SharedLayout() {
  const { getAllUsers, user } = useAppContext();
  useEffect(() => {
    // get recommend users
    getAllUsers({
      follower: true,
      request: true,
      me: true,
      store: "recommendUsers",
    });
    // get request users
    if (user.followRequest.length !== 0) {
      getAllUsers({
        idList: user.followRequest,
        store: "requestUsers",
      });
      //get public users

      getAllUsers({
        me: true,
        private: true,
        follower: true,
        store: "publicUsers",
      });
    }
  }, []);
  return (
    <div className="body">
      <nav>
        <Navbar />
      </nav>
      <main>
        <div className="container">
          <BigSidebar />
          <div className="middle">
            <Outlet />
          </div>
          <RightBar />
          <div className="block"></div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
}

export default SharedLayout;
