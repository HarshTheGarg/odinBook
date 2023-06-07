import React from "react";

import { useDispatch } from "react-redux";
import { changeSectionContent } from "../../redux/features/mainSectionContent/mscSlice";
import { endLoading, startLoading } from "../../redux/features/loader/loaderSlice";

function LeftBar() {
  const dispatch = useDispatch();
  const findFriends = () => {
    dispatch(startLoading);
    dispatch(changeSectionContent("findFriends"));
    dispatch(endLoading);
  };

  return (
    <>
      <aside className="leftBar">
        <ul>
          <li>
            <button onClick={findFriends}>Find Friends</button>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default React.memo(LeftBar);
